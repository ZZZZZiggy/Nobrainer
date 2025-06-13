// Script to ensure database is properly set up
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("=== Database Setup Script ===");

try {
  console.log("1. Checking environment variables...");

  // Check if .env.local exists and contains DATABASE_URL
  const envLocalPath = path.join(__dirname, ".env.local");
  if (!fs.existsSync(envLocalPath)) {
    console.error(
      "ERROR: .env.local file not found. Please create it with DATABASE_URL."
    );
    process.exit(1);
  }

  const envLocalContent = fs.readFileSync(envLocalPath, "utf-8");
  if (!envLocalContent.includes("DATABASE_URL=")) {
    console.error("ERROR: DATABASE_URL not found in .env.local");
    process.exit(1);
  }

  console.log("✓ Environment variables look good");

  console.log("2. Generating Prisma client...");
  execSync("npx prisma generate", { stdio: "inherit" });
  console.log("✓ Prisma client generated");

  console.log("3. Pushing schema to database...");
  execSync("npx prisma db push", { stdio: "inherit" });
  console.log("✓ Database schema updated");

  console.log("4. Checking database connection...");
  try {
    execSync("npx prisma db pull", { stdio: "inherit" });
    console.log("✓ Database connection successful");
  } catch (e) {
    console.error(
      "ERROR: Could not connect to database. Please check your DATABASE_URL."
    );
    console.error(e);
    process.exit(1);
  }

  console.log("\n=== Setup complete! ===");
  console.log("You can now run the application with: npm run dev");
} catch (error) {
  console.error("An error occurred during setup:");
  console.error(error);
  process.exit(1);
}
