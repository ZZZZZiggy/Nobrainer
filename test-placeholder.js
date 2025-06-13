// Test the placeholder functionality
const testPlaceholderConversation = async () => {
  try {
    console.log("🧪 Testing placeholder conversation functionality...");

    // Test 1: Create a new conversation (should include placeholder)
    console.log("\n1. Testing first message with placeholder:");
    const firstResponse = await fetch("http://localhost:3002/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: "next-auth.session-token=your-session-token", // Replace with actual session token
      },
      body: JSON.stringify({
        message: "How to write a good essay?",
      }),
    });

    if (firstResponse.ok) {
      const firstData = await firstResponse.json();
      console.log("✅ First message sent successfully");
      console.log("📦 Response:", firstData);

      const chatId = firstData.chatId;

      // Test 2: Get the chat to verify the saved message format
      console.log("\n2. Retrieving chat to verify message format:");
      const getResponse = await fetch(
        `http://localhost:3002/api/chat?chatId=${chatId}`,
        {
          headers: {
            Cookie: "next-auth.session-token=your-session-token", // Replace with actual session token
          },
        }
      );

      if (getResponse.ok) {
        const chatData = await getResponse.json();
        console.log("✅ Chat retrieved successfully");
        console.log(
          "📋 Messages:",
          chatData.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          }))
        );

        // Test 3: Send a follow-up message (should NOT include placeholder)
        console.log("\n3. Testing follow-up message (no placeholder):");
        const followupResponse = await fetch("http://localhost:3002/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: "next-auth.session-token=your-session-token", // Replace with actual session token
          },
          body: JSON.stringify({
            message: "Can you give me specific tips?",
            chatId: chatId,
          }),
        });

        if (followupResponse.ok) {
          const followupData = await followupResponse.json();
          console.log("✅ Follow-up message sent successfully");
          console.log("📦 Response:", followupData);

          // Test 4: Get the updated chat
          console.log("\n4. Retrieving updated chat:");
          const updatedResponse = await fetch(
            `http://localhost:3002/api/chat?chatId=${chatId}`,
            {
              headers: {
                Cookie: "next-auth.session-token=your-session-token", // Replace with actual session token
              },
            }
          );

          if (updatedResponse.ok) {
            const updatedChatData = await updatedResponse.json();
            console.log("✅ Updated chat retrieved successfully");
            console.log(
              "📋 All Messages:",
              updatedChatData.messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              }))
            );
          }
        }
      }
    } else {
      console.error("❌ Failed to send first message");
      console.error("Status:", firstResponse.status);
      const errorText = await firstResponse.text();
      console.error("Error:", errorText);
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Note: This test requires a valid session token
console.log("⚠️  This test requires authentication. Please:");
console.log("1. Start the Next.js server: npm run dev");
console.log("2. Log in through the browser");
console.log("3. Get your session token from browser cookies");
console.log("4. Replace the Cookie header in this test file");
console.log("5. Then run: node test-placeholder.js");

testPlaceholderConversation();
