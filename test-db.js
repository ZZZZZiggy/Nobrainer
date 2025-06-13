const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log("Testing database connection and write functionality...");

    // Test 1: Create a user
    console.log("\n1. Creating a test user...");
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        password: "hashed_password_here",
      },
    });
    console.log("✅ User created:", user);

    // Test 2: Create a chat for the user
    console.log("\n2. Creating a test chat...");
    const chat = await prisma.chat.create({
      data: {
        userId: user.id,
        title: "Test Chat",
      },
    });
    console.log("✅ Chat created:", chat);

    // Test 3: Create messages in the chat
    console.log("\n3. Creating test messages...");
    const userMessage = await prisma.message.create({
      data: {
        chatId: chat.id,
        content: "Hello, this is a test message from user",
        role: "USER",
      },
    });
    console.log("✅ User message created:", userMessage);

    const assistantMessage = await prisma.message.create({
      data: {
        chatId: chat.id,
        content: "Hello! This is a test response from assistant",
        role: "ASSISTANT",
      },
    });
    console.log("✅ Assistant message created:", assistantMessage);

    // Test 4: Query data with relations
    console.log("\n4. Querying data with relations...");
    const chatWithMessages = await prisma.chat.findUnique({
      where: { id: chat.id },
      include: {
        messages: true,
        user: true,
      },
    });
    console.log(
      "✅ Chat with messages and user:",
      JSON.stringify(chatWithMessages, null, 2)
    );

    // Test 5: Update data
    console.log("\n5. Testing update functionality...");
    const updatedChat = await prisma.chat.update({
      where: { id: chat.id },
      data: { title: "Updated Test Chat" },
    });
    console.log("✅ Chat updated:", updatedChat);

    // Test 6: Count records
    console.log("\n6. Counting records...");
    const userCount = await prisma.user.count();
    const chatCount = await prisma.chat.count();
    const messageCount = await prisma.message.count();
    console.log(
      `✅ Database contains: ${userCount} users, ${chatCount} chats, ${messageCount} messages`
    );

    console.log("\n🎉 All database tests passed! SQLite is working correctly.");
  } catch (error) {
    console.error("❌ Database test failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
