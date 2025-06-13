import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Testing database connection...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database connection successful:", result);
    
    // Test table access
    const userCount = await prisma.user.count();
    console.log("📊 User count:", userCount);
    
    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      userCount,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}