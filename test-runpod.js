// Test RunPod LLM API connection
// Usage: node test-runpod.js

const testRunPodAPI = async () => {
  try {
    console.log("🧪 Testing RunPod LLM API connection...\n");

    // Test environment variables
    const runpodUrl = process.env.RUNPOD_ENDPOINT_URL;
    const runpodApiKey = process.env.RUNPOD_API_KEY;
    // const modelName = process.env.RUNPOD_MODEL_NAME;

    console.log("📋 Configuration:");
    console.log(
      `   URL: ${runpodUrl ? runpodUrl.substring(0, 30) + "..." : "NOT SET"}`
    );
    console.log(
      `   API Key: ${
        runpodApiKey ? runpodApiKey.substring(0, 10) + "..." : "NOT SET"
      }`
    );
    console.log(`   Model: ${modelName || "NOT SET"}\n`);

    if (!runpodUrl) {
      console.log("❌ RUNPOD_ENDPOINT_URL is not set in environment variables");
      return;
    }

    // Skip health check as this endpoint URL format doesn't support it
    console.log("🔗 Testing basic connectivity...");
    console.log(
      "⚠️  Health check skipped - not available with this endpoint URL format"
    );

    // Test LLM API call
    console.log("\n🤖 Testing LLM API call...");
    const testMessage = "Hello! Please respond with a short greeting.";

    // Format the message as a simple prompt as required by the API
    const requestBody = {
      prompt: testMessage,
    };

    console.log("📤 Sending request:", JSON.stringify(requestBody, null, 2));

    // Using direct endpoint URL as provided in .env.local (already includes /generate)
    const response = await fetch(`${runpodUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": runpodApiKey, // Using x-api-key header format
      },
      body: JSON.stringify(requestBody),
    });

    console.log(
      `📥 Response status: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ API call failed:", errorText);
      return;
    }

    const data = await response.json();
    console.log("📦 Raw response:", JSON.stringify(data, null, 2));

    // Parse response
    let aiResponse = "";
    if (data.choices && data.choices[0] && data.choices[0].message) {
      aiResponse = data.choices[0].message.content;
    } else if (data.response) {
      aiResponse = data.response;
    } else if (data.text) {
      aiResponse = data.text;
    }

    if (aiResponse) {
      console.log("\n✅ SUCCESS! AI Response:");
      console.log(`"${aiResponse}"`);
    } else {
      console.log(
        "\n⚠️  Unexpected response format. Check the response structure above."
      );
    }
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    if (error.code === "ENOTFOUND") {
      console.log(
        "💡 This might be a DNS/connectivity issue. Check your RunPod endpoint URL."
      );
    }
  }
};

// Test via Next.js API (if running)
const testViaNextAPI = async () => {
  try {
    console.log("\n🌐 Testing via Next.js API...");

    const response = await fetch("http://localhost:3000/api/test-runpod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Hello from test script!",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Next.js API test passed:", data);
    } else {
      console.log("❌ Next.js API test failed:", response.status);
    }
  } catch (error) {
    console.log("⚠️  Next.js API not available (server might not be running)");
  }
};

// Load environment variables
require("dotenv").config({ path: ".env.local" });

// Run tests
const runTests = async () => {
  await testRunPodAPI();
  await testViaNextAPI();

  console.log("\n🎯 Test completed!");
  console.log("\n📝 Next steps:");
  console.log("1. If tests pass, your RunPod integration is ready!");
  console.log(
    "2. If tests fail, check your environment variables and RunPod endpoint"
  );
  console.log("3. Start your Next.js server: npm run dev");
  console.log("4. Test the chat interface at http://localhost:3000/chat");
};

runTests();
