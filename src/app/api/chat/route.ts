import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { message, chatId, createEmptyChat } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    let chat;
    if (chatId) {
      // Get existing chat
      chat = await prisma.chat.findUnique({
        where: { id: chatId, userId: user.id },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
            // Load more messages for better conversation context
            take: 20, // Increased from 10 to support longer conversations
          },
        },
      });
      if (!chat) {
        return NextResponse.json({ error: "Chat not found" }, { status: 404 });
      }
    } else {
      // Create new chat
      const chatTitle = createEmptyChat
        ? "New Chat"
        : message.substring(0, 50) + (message.length > 50 ? "..." : "");

      chat = await prisma.chat.create({
        data: {
          userId: user.id,
          title: chatTitle,
        },
        include: {
          messages: true,
        },
      });
    }

    // 如果是创建空聊天的请求，直接返回，不发送消息
    if (createEmptyChat) {
      return NextResponse.json({
        chatId: chat.id,
        message: "Chat created successfully",
      });
    }

    // Save user message with placeholder for first message
    const isFirstMessage = !chat.messages || chat.messages.length === 0;
    const messageContent = isFirstMessage
      ? `I need help on a prompt about ${message}`
      : message;

    await prisma.message.create({
      data: {
        chatId: chat.id,
        content: messageContent,
        role: "USER",
      },
    });

    // Update chat title if this is the first real message (not "New Chat")
    if (chat.title === "New Chat" && message !== "New Chat") {
      await prisma.chat.update({
        where: { id: chat.id },
        data: {
          title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
        },
      });
    }

    // Call RunPod LLM API with chat history
    const llmResponse = await callRunPodAPI(message, chat.messages || []);

    // Save assistant response
    await prisma.message.create({
      data: {
        chatId: chat.id,
        content: llmResponse,
        role: "ASSISTANT",
      },
    });

    return NextResponse.json({
      chatId: chat.id,
      message: llmResponse,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Function to call RunPod LLM API
async function callRunPodAPI(
  message: string,
  chatHistory: { content: string; role: string }[]
): Promise<string> {
  try {
    const runpodUrl = process.env.RUNPOD_ENDPOINT_URL;
    const runpodApiKey = process.env.RUNPOD_API_KEY;

    if (!runpodUrl) {
      // Fallback mock response if no RunPod API is configured
      return `You said: "${message}". This is a mock response. Please configure your RunPod API in the environment variables.`;
    }

    // Build conversation history similar to Python InteractiveChat class
    const conversationHistory = [];

    // Add system message first
    conversationHistory.push({
      role: "system",
      content:
        "You are a helpful AI assistant. Provide clear, accurate, and helpful responses.",
    });

    // Check if this is the first message in the conversation
    const isFirstMessage = !chatHistory || chatHistory.length === 0;

    // Add placeholder as first user message if this is a new conversation
    if (isFirstMessage) {
      conversationHistory.push({
        role: "user",
        content: `I need help on a prompt about ${message}`,
      });
    } else {
      // Add chat history in chronological order
      chatHistory.forEach((msg) => {
        conversationHistory.push({
          role: msg.role === "USER" ? "user" : "assistant",
          content: msg.content,
        });
      });

      // Add current user message
      conversationHistory.push({
        role: "user",
        content: message,
      });
    }

    // Use standard OpenAI chat completion format
    const requestBody = {
      messages: conversationHistory,
    };

    console.log(
      "🔍 Sending messages:",
      JSON.stringify(conversationHistory, null, 2)
    );

    // Using direct endpoint URL as provided in .env.local (already includes /generate)
    const response = await fetch(runpodUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": runpodApiKey || "", // Using x-api-key header format with fallback
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error(
        `RunPod API error: ${response.status} ${response.statusText}`
      );
      throw new Error(`RunPod API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("📦 API Response:", JSON.stringify(data, null, 2));

    // Handle different response formats from RunPod
    let assistantResponse = "";

    if (data.choices && data.choices[0] && data.choices[0].message) {
      assistantResponse = data.choices[0].message.content;
    } else if (data.response) {
      assistantResponse = data.response;
    } else if (data.text) {
      assistantResponse = data.text;
    } else {
      console.error("Unexpected RunPod response format:", data);
      return "I received an unexpected response format. Please try again.";
    }

    // Clean up the response (remove any unwanted prefixes or suffixes)
    assistantResponse = assistantResponse
      .replace(/^Assistant:\s*/i, "") // Remove "Assistant:" prefix if present
      .replace(/^AI:\s*/i, "") // Remove "AI:" prefix if present
      .trim();

    console.log("🤖 Final assistant response:", assistantResponse);

    return assistantResponse;
  } catch (error) {
    console.error("RunPod API call failed:", error);
    // Return a fallback response
    return `I'm having trouble connecting to the AI service right now. Please try again later. Error: ${
      error instanceof Error ? error.message : "Unknown error"
    }`;
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    if (chatId) {
      // Get specific chat with ALL messages
      const chat = await prisma.chat.findUnique({
        where: { id: chatId, userId: user.id },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
            // Remove any limit to get ALL messages
          },
        },
      });

      if (!chat) {
        return NextResponse.json({ error: "Chat not found" }, { status: 404 });
      }

      return NextResponse.json(chat);
    } else {
      // Get all chats for user
      const chats = await prisma.chat.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: "desc" },
        include: {
          messages: {
            take: 1,
            orderBy: { createdAt: "asc" },
          },
        },
      });

      return NextResponse.json(chats);
    }
  } catch (error) {
    console.error("Chat GET API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
