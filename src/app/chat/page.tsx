"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  memo,
} from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import "../scrollbar.css"; // 导入自定义滚动条样式

interface Message {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT";
  createdAt: string;
}

interface Chat {
  id: string;
  title?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

function ChatPageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Functions to store and retrieve last viewed chat ID
  const saveLastViewedChat = (chatId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastViewedChatId", chatId);
    }
  };

  const getLastViewedChat = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lastViewedChatId");
    }
    return null;
  };

  // Get initial prompt from URL params
  const initialPrompt = searchParams.get("prompt");
  // Get chatId from URL params
  const urlChatId = searchParams.get("chatId");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  const loadChat = useCallback(async (chatId: string) => {
    try {
      // Use cache-busting query parameter and fetch options to prevent browser caching
      const response = await fetch(
        `/api/chat?chatId=${chatId}&t=${Date.now()}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      if (response.ok) {
        const chatData = await response.json();
        setCurrentChat(chatData);

        // Save the last viewed chat ID to localStorage
        saveLastViewedChat(chatId);
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  }, []);

  const loadChats = useCallback(async () => {
    try {
      const response = await fetch("/api/chat", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (response.ok) {
        const chatsData = await response.json();
        setChats(chatsData);

        // Only load a chat if no chat is currently loaded
        if (chatsData.length > 0 && !currentChat) {
          // Priority 1: URL chatId parameter
          if (
            urlChatId &&
            chatsData.some((chat: Chat) => chat.id === urlChatId)
          ) {
            await loadChat(urlChatId);
            // Clear the URL parameter after loading
            router.replace("/chat", undefined);
          } else {
            // Priority 2: Last viewed chat ID from localStorage
            const lastViewedChatId = getLastViewedChat();
            if (
              lastViewedChatId &&
              chatsData.some((chat: Chat) => chat.id === lastViewedChatId)
            ) {
              await loadChat(lastViewedChatId);
            } else {
              // Priority 3: Load the first chat in the list
              await loadChat(chatsData[0].id);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  }, [loadChat]);

  // Load chats on mount
  useEffect(() => {
    if (session) {
      loadChats();
    }
  }, [session, loadChats]);

  // Handle initial prompt from URL
  useEffect(() => {
    if (initialPrompt && session && !currentChat) {
      setMessage(initialPrompt);
      // Clear the URL parameter
      router.replace("/chat", undefined);
    }
  }, [initialPrompt, session, currentChat, router]);

  // Handle chatId from URL - for direct navigation to specific chat
  useEffect(() => {
    if (urlChatId && session && chats.length > 0) {
      // Check if the chat exists in the loaded chats
      const chatExists = chats.some((chat: Chat) => chat.id === urlChatId);
      if (chatExists && (!currentChat || currentChat.id !== urlChatId)) {
        loadChat(urlChatId);
        // Clear the URL parameter after loading
        router.replace("/chat", undefined);
      }
    }
  }, [urlChatId, session, chats, currentChat, loadChat, router]);

  // Scroll to bottom when messages change - DISABLED
  // useEffect(() => {
  //   scrollToBottom();
  // }, [currentChat?.messages]);

  // Function to refresh current chat without updating localStorage - optimized with useCallback
  const refreshCurrentChat = useCallback(async (chatId: string) => {
    try {
      const response = await fetch(
        `/api/chat?chatId=${chatId}&t=${Date.now()}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      if (response.ok) {
        const chatData = await response.json();
        setCurrentChat(chatData);
      }
    } catch (error) {
      console.error("Error refreshing chat:", error);
    }
  }, []);

  // Refresh current chat periodically to ensure all messages are loaded - OPTIMIZED
  useEffect(() => {
    if (!currentChat) return;

    // Set up a refresh interval for the current chat - increased interval for better performance
    const refreshInterval = setInterval(() => {
      if (currentChat && !isLoading) {
        // Don't save to localStorage on periodic refreshes
        refreshCurrentChat(currentChat.id);
      }
    }, 10000); // Refresh every 10 seconds instead of 3 for better performance

    return () => clearInterval(refreshInterval);
  }, [currentChat?.id, isLoading, refreshCurrentChat]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setIsLoading(true);

    try {
      // Optimistically update UI with user message
      if (currentChat) {
        const optimisticUserMsg = {
          id: `temp-${Date.now()}`,
          content: userMessage,
          role: "USER" as const,
          createdAt: new Date().toISOString(),
        };

        setCurrentChat({
          ...currentChat,
          messages: [...currentChat.messages, optimisticUserMsg],
        });
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          message: userMessage,
          chatId: currentChat?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Optimized: reduce API calls for better performance
        if (!currentChat || currentChat.id !== data.chatId) {
          // New chat created
          await loadChats();
          await loadChat(data.chatId);
        } else {
          // Existing chat - only reload current chat, skip chat list reload for better performance
          await loadChat(currentChat.id);
        }
      } else {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = async () => {
    try {
      // 创建新的空白聊天
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "New Chat", // 一个临时消息，创建聊天后会被替换
          createEmptyChat: true, // 添加标志，表示只创建聊天而不发送消息
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await loadChats(); // 重新加载聊天列表

        // 如果已创建新聊天，则加载它
        if (data.chatId) {
          await loadChat(data.chatId);
        } else {
          setCurrentChat(null);
        }
      } else {
        console.error("Error creating new chat");
        // 如果API调用失败，也清除当前聊天
        setCurrentChat(null);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
      setCurrentChat(null);
    }

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }, []);

  const handleLogout = async () => {
    // Sign out without redirect, then navigate to login manually
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div className="h-screen bg-black text-gray-200 flex relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-black border-r border-gray-700 z-20 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-6 gap-3">
            <div className="relative flex-1 min-w-0">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 text-white cursor-pointer select-none w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xl font-semibold">
                  {session.user?.name || session.user?.email}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {profileDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full rounded-md shadow-lg bg-black border border-gray-500 z-30">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 rounded-md mx-2 my-1 cursor-pointer w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={createNewChat}
              className="text-gray-400 hover:text-white text-xl border border-gray-500 rounded-md px-2 py-1 flex-shrink-0 ml-2"
              title="New Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          <div className="text-gray-400 text-sm mb-2">Chat History</div>
          <ul className="space-y-2 flex-1 overflow-y-auto scrollbar-custom">
            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  onClick={() => loadChat(chat.id)}
                  className={`block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                    currentChat?.id === chat.id ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  {chat.title ||
                    chat.messages[0]?.content?.substring(0, 30) + "..." ||
                    "New Chat"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-80" : "ml-0"
        }`}
      >
        {/* Header - fixed at the top */}
        <header className="bg-black bg-opacity-80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-700 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                // Refresh current chat when toggling sidebar
                if (currentChat) {
                  loadChat(currentChat.id);
                }
              }}
              className="text-gray-400 hover:text-white text-xl border border-gray-500 rounded-md px-1 py-0.5"
              title="Toggle Sidebar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 3H4.5C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 7.5H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 12H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 16.5H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {!sidebarOpen && (
              <button
                onClick={createNewChat}
                className="text-gray-400 hover:text-white text-xl border border-gray-500 rounded-md px-2 py-1 flex-shrink-0 ml-2"
                title="New Chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            )}

            <div className="flex items-center space-x-1 border border-gray-500 rounded-md px-1.5 py-0.5">
              <span className="text-gray-300 text-sm">Beta</span>
            </div>
          </div>
        </header>

        {/* Messages - add padding to prevent content from being hidden under fixed elements */}
        <main className="flex-1 flex flex-col p-4 pb-24 overflow-y-auto scrollbar-custom">
          <div className="w-full max-w-2xl mx-auto flex flex-col space-y-4">
            {currentChat?.messages.map((msg) => (
              <MessageComponent
                key={msg.id}
                msg={msg}
                copyToClipboard={copyToClipboard}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-800 text-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Message Input - fixed at the bottom */}
        <div className="w-full flex justify-center p-4 sticky bottom-0 bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 p-4 flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 text-gray-400 hover:border-white hover:text-white hover:bg-gray-700 transition duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>

            <div className="flex-1 flex items-center">
              <div className="flex items-center w-full">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="I need prompt about..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
                  rows={1}
                />
              </div>
            </div>

            <button
              onClick={sendMessage}
              disabled={!message.trim() || isLoading}
              className="bg-gray-600 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-gray-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optimized Message Component with React.memo to prevent unnecessary re-renders
const MessageComponent = memo(
  ({
    msg,
    copyToClipboard,
  }: {
    msg: Message;
    copyToClipboard: (text: string) => void;
  }) => {
    return (
      <div
        className={`flex ${
          msg.role === "USER" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            msg.role === "USER"
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-200"
          }`}
        >
          {msg.role === "ASSISTANT" && (
            <div className="flex items-start gap-2">
              <span className="text-xl">🤖</span>
              <div className="flex-1">
                <div className="text-sm">{msg.content}</div>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => copyToClipboard(msg.content)}
                    className="p-1 text-gray-500 hover:text-white border border-gray-600 rounded text-xs"
                    title="Copy"
                  >
                    📋
                  </button>
                  <button
                    className="p-1 text-gray-500 hover:text-white border border-gray-600 rounded text-xs"
                    title="Like"
                  >
                    👍
                  </button>
                  <button
                    className="p-1 text-gray-500 hover:text-white border border-gray-600 rounded text-xs"
                    title="Dislike"
                  >
                    👎
                  </button>
                </div>
              </div>
            </div>
          )}
          {msg.role === "USER" && <div className="text-sm">{msg.content}</div>}
        </div>
      </div>
    );
  }
);

MessageComponent.displayName = "MessageComponent";

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  );
}
