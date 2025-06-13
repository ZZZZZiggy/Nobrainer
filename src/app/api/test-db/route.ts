import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Testing database connection...");
    
    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    
    // Test simple query
    const userCount = await prisma.user.count();
    console.log("📊 User count:", userCount);
    
    // Test environment variables
    const dbUrl = process.env.DATABASE_URL;
    console.log("🔗 Database URL configured:", !!dbUrl);
    console.log("🔗 Database URL starts with:", dbUrl?.substring(0, 20) + "...");
    
    return NextResponse.json({
      status: "Database connection successful",
      userCount,
      hasDbUrl: !!dbUrl,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("💥 Database connection error:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json(
      { 
        error: "Database connection failed",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
