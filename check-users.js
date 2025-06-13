const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function checkUsers() {
  try {
    console.log("🔍 Checking all users in the database...");

    // Get all users
    const users = await prisma.user.findMany({
      include: {
        chats: {
          include: {
            messages: true,
          },
        },
        accounts: true,
        sessions: true,
      },
    });

    console.log(`📊 Total users found: ${users.length}`);

    if (users.length === 0) {
      console.log("❌ No users found in the database");
    } else {
      users.forEach((user, index) => {
        console.log(`\n👤 User ${index + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Name: ${user.name}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Password: ${user.password ? "Set" : "Not set"}`);
        console.log(`  Created: ${user.createdAt}`);
        console.log(`  Chats: ${user.chats.length}`);
        console.log(`  Accounts: ${user.accounts.length}`);
        console.log(`  Sessions: ${user.sessions.length}`);
      });
    }

    // Check accounts (OAuth)
    const accounts = await prisma.account.findMany();
    console.log(`\n🔗 OAuth accounts: ${accounts.length}`);

    // Check sessions
    const sessions = await prisma.session.findMany();
    console.log(`📱 Active sessions: ${sessions.length}`);

    console.log("\n✅ Database check completed");
  } catch (error) {
    console.error("❌ Error checking database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
