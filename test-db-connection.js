// Test database connection and user creation
// Usage: node test-db-connection.js

const { PrismaClient } = require("./src/generated/prisma");

const testDatabaseConnection = async () => {
  console.log("🔍 Testing database connection...\n");

  let prisma;

  try {
    // Initialize Prisma client
    console.log("📦 Initializing Prisma client...");
    prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });

    // Test basic connection
    console.log("🔗 Testing basic connection...");
    await prisma.$connect();
    console.log("✅ Database connection successful!\n");

    // Test User model access
    console.log("👥 Testing User model access...");
    const userCount = await prisma.user.count();
    console.log(`✅ Current user count: ${userCount}\n`);

    // Test creating a user (if not exists)
    console.log("🧪 Testing user creation...");
    const testEmail = "test@example.com";

    // Check if test user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (existingUser) {
      console.log("ℹ️  Test user already exists");
    } else {
      // Create test user
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash("testpassword123", 12);

      const newUser = await prisma.user.create({
        data: {
          email: testEmail,
          password: hashedPassword,
          name: "Test User",
        },
      });

      console.log(`✅ Test user created with ID: ${newUser.id}`);
    }

    // Test other models
    console.log("\n📊 Testing other models...");
    const chatCount = await prisma.chat.count();
    const messageCount = await prisma.message.count();
    const sessionCount = await prisma.session.count();

    console.log(`✅ Chats: ${chatCount}`);
    console.log(`✅ Messages: ${messageCount}`);
    console.log(`✅ Sessions: ${sessionCount}`);

    console.log("\n🎉 All database tests passed!");
  } catch (error) {
    console.error("❌ Database test failed:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.code) {
      console.error("Error code:", error.code);
    }

    if (error.meta) {
      console.error("Error meta:", error.meta);
    }

    // Common error solutions
    console.log("\n💡 Possible solutions:");
    console.log("1. Check DATABASE_URL in .env.local");
    console.log("2. Verify database password is correct");
    console.log("3. Ensure Supabase project is active");
    console.log("4. Check network connectivity");
    console.log(
      "5. Verify database tables exist (run: npx prisma migrate dev)"
    );
  } finally {
    if (prisma) {
      await prisma.$disconnect();
      console.log("\n🔌 Database disconnected");
    }
  }
};

// Load environment variables
require("dotenv").config({ path: ".env.local" });

console.log("🌍 Environment check:");
console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? "Set" : "NOT SET"}`);
console.log(
  `NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? "Set" : "NOT SET"}`
);
console.log("");

testDatabaseConnection();
