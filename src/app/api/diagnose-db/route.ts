import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Starting database diagnostic...");
    
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercelRegion: process.env.VERCEL_REGION || "unknown",
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
      directUrl: process.env.DIRECT_URL ? "Set" : "Not set",
    };

    // Test basic connection
    const connectionResult = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log("✅ Basic connection successful");

    // Test table access
    const userCount = await prisma.user.count();
    console.log("✅ Table access successful");

    return NextResponse.json({
      status: "success",
      message: "All database tests passed",
      diagnostics: {
        ...diagnostics,
        connectionTest: { status: "success", data: connectionResult },
        tableTest: { status: "success", userCount },
      },
    });

  } catch (error) {
    console.error("❌ Database diagnostic failed:", error);
    
    return NextResponse.json(
      {
        status: "error",
        message: "Database diagnostic failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
