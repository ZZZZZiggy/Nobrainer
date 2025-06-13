import { NextRequest, NextResponse } from "next/server";

// Test endpoint for RunPod API without authentication
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Call RunPod API directly
    const response = await callRunPodAPI(message);

    return NextResponse.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Test RunPod API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

async function callRunPodAPI(message: string): Promise<string> {
  const runpodUrl = process.env.RUNPOD_ENDPOINT_URL;
  const runpodApiKey = process.env.RUNPOD_API_KEY;

  if (!runpodUrl) {
    throw new Error("RUNPOD_ENDPOINT_URL is not configured");
  }

  // Format the message as a simple prompt as required by the API
  const requestBody = {
    prompt: message,
  };

  // Using direct endpoint URL as provided in .env.local (already includes /generate)
  const response = await fetch(`${runpodUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": runpodApiKey || "", // Using x-api-key header format
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`RunPod API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  // Handle different response formats
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  } else if (data.response) {
    return data.response;
  } else if (data.text) {
    return data.text;
  } else {
    throw new Error("Unexpected response format from RunPod API");
  }
}
