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
            take: 50, // Increased to support longer conversations
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

    if (createEmptyChat) {
      return NextResponse.json({
        chatId: chat.id,
        message: "Chat created successfully",
      });
    }

    // Save user message (direct user input, no modification)
    await prisma.message.create({
      data: {
        chatId: chat.id,
        content: message,
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

    // Call OpenAI API with chat history
    const llmResponse = await callOpenAIAPI(message, chat.messages || []);

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

// Function to call OpenAI API
async function callOpenAIAPI(
  message: string,
  chatHistory: { content: string; role: string }[]
): Promise<string> {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    console.log(
      "🔍 API Key check:",
      openaiApiKey ? `${openaiApiKey.substring(0, 10)}...` : "NOT FOUND"
    );

    if (!openaiApiKey) {
      // Fallback mock response if no OpenAI API is configured
      return `You said: "${message}". This is a mock response. Please configure your OpenAI API key in the environment variables.`;
    }

    // Get system prompt from environment or use default
    const systemPrompt = process.env.SYSTEM_PROMPT;
    console.log("System Prompt length:", process.env.SYSTEM_PROMPT?.length);
    // Build conversation history
    const conversationHistory = [];

    // Add system message first
    conversationHistory.push({
      role: "system",
      content: systemPrompt,
    });

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

    // OpenAI API request body
    const requestBody = {
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo", // 可配置模型
      messages: conversationHistory,
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || "15000"),
    };

    console.log(
      "🔍 Sending messages:",
      JSON.stringify(conversationHistory, null, 2)
    );

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `OpenAI API error: ${response.status} ${response.statusText}`,
        errorText
      );
      throw new Error(
        `OpenAI API error: ${response.status} - ${response.statusText}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("📦 API Response:", JSON.stringify(data, null, 2));

    // Extract response from OpenAI format
    let assistantResponse = "";

    if (data.choices && data.choices[0] && data.choices[0].message) {
      assistantResponse = data.choices[0].message.content;
    } else {
      console.error("Unexpected OpenAI response format:", data);
      return "I received an unexpected response format. Please try again.";
    }

    // Clean up the response
    assistantResponse = assistantResponse.trim();

    console.log("🤖 Final assistant response:", assistantResponse);

    return assistantResponse;
  } catch (error) {
    console.error("OpenAI API call failed:", error);
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
