const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function simpleTest() {
  try {
    console.log("🔍 Testing SQLite database connection...");

    // Test connection
    await prisma.$connect();
    console.log("✅ Database connection successful");

    // Clean up existing test data
    console.log("🧹 Cleaning up existing test data...");
    await prisma.message.deleteMany({});
    await prisma.chat.deleteMany({});
    await prisma.user.deleteMany({
      where: { email: "simple-test@example.com" },
    });

    // Test write
    console.log("📝 Testing write operation...");
    const user = await prisma.user.create({
      data: {
        email: "simple-test@example.com",
        name: "Simple Test User",
      },
    });
    console.log("✅ User created with ID:", user.id);

    // Test read
    console.log("📖 Testing read operation...");
    const foundUser = await prisma.user.findUnique({
      where: { email: "simple-test@example.com" },
    });
    console.log("✅ User found:", foundUser?.name);

    // Check database file
    const fs = require("fs");
    const stats = fs.statSync("dev.db");
    console.log(`📊 Database file size: ${stats.size} bytes`);

    console.log("🎉 SQLite database is working correctly!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

simpleTest();
