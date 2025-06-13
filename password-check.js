// Check password hashing specifically
const { PrismaClient } = require("./src/generated/prisma");
require("dotenv").config({ path: ".env.local" });

async function checkPasswordHashing() {
  const prisma = new PrismaClient();

  try {
    console.log("🔐 Checking password hashing for all users...\n");

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    for (const user of users) {
      console.log(`👤 User: ${user.email}`);

      if (!user.password) {
        console.log("❌ No password set");
      } else {
        const password = user.password;
        console.log(`📏 Password length: ${password.length}`);
        console.log(`🔍 First 10 characters: ${password.substring(0, 10)}`);

        // Check if it's a bcrypt hash
        const isBcryptHash =
          password.startsWith("$2a$") ||
          password.startsWith("$2b$") ||
          password.startsWith("$2y$");
        const hasCorrectLength = password.length === 60; // bcrypt hashes are 60 chars

        console.log(`✅ Is bcrypt hash: ${isBcryptHash}`);
        console.log(`✅ Correct length: ${hasCorrectLength}`);
        console.log(
          `✅ Overall assessment: ${
            isBcryptHash && hasCorrectLength
              ? "SECURE (HASHED)"
              : "INSECURE (NOT HASHED)"
          }`
        );
      }
      console.log("─".repeat(50));
    }
  } catch (error) {
    console.error("Error checking passwords:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPasswordHashing();
