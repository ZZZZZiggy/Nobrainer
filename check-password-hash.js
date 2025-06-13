// Check if passwords are properly hashed
// Usage: node check-password-hash.js

const { PrismaClient } = require("./src/generated/prisma");
const bcrypt = require("bcryptjs");

const checkPasswordHashing = async () => {
  console.log("🔐 Checking password hashing...\n");

  let prisma;

  try {
    prisma = new PrismaClient();
    await prisma.$connect();

    // Get all users with passwords
    const users = await prisma.user.findMany({
      where: {
        password: {
          not: null,
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
      },
    });

    console.log(`📊 Found ${users.length} users with passwords\n`);

    for (const user of users) {
      console.log(`👤 User: ${user.email}`);
      console.log(`📅 Created: ${user.createdAt}`);

      if (!user.password) {
        console.log("❌ No password found");
        continue;
      }

      // Check if password looks like a hash
      const isHash =
        user.password.length >= 50 && user.password.startsWith("$2");
      console.log(`🔍 Password length: ${user.password.length}`);
      console.log(`🔍 Starts with $2: ${user.password.startsWith("$2")}`);
      console.log(`✅ Appears to be hashed: ${isHash}`);

      if (isHash) {
        console.log("🔒 Password format: bcrypt hash (SECURE)");

        // Test if we can verify a sample password
        try {
          const testPassword = "testpassword123";
          const isValid = await bcrypt.compare(testPassword, user.password);
          if (user.email === "test@example.com") {
            console.log(
              `🧪 Test password verification: ${isValid ? "PASS" : "FAIL"}`
            );
          }
        } catch (error) {
          console.log("⚠️  Could not test password verification");
        }
      } else {
        console.log("❌ Password format: PLAIN TEXT (INSECURE!)");
        console.log(
          "🚨 This is a security issue - passwords should be hashed!"
        );
      }

      console.log("─".repeat(50));
    }

    // Summary
    const hashedUsers = users.filter(
      (u) =>
        u.password && u.password.length >= 50 && u.password.startsWith("$2")
    );
    const plaintextUsers = users.filter(
      (u) =>
        u.password && (u.password.length < 50 || !u.password.startsWith("$2"))
    );

    console.log("\n📋 SUMMARY:");
    console.log(`✅ Users with hashed passwords: ${hashedUsers.length}`);
    console.log(`❌ Users with plain text passwords: ${plaintextUsers.length}`);

    if (plaintextUsers.length > 0) {
      console.log("\n🚨 SECURITY ISSUE DETECTED!");
      console.log(
        "Some users have plain text passwords. This is a security vulnerability."
      );
      console.log(
        "These users should reset their passwords to get properly hashed versions."
      );
    } else {
      console.log("\n🎉 ALL PASSWORDS ARE PROPERLY HASHED!");
      console.log("Your application is secure - all passwords are encrypted.");
    }
  } catch (error) {
    console.error("❌ Error checking passwords:", error);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
};

// Load environment variables
require("dotenv").config({ path: ".env.local" });

checkPasswordHashing();
