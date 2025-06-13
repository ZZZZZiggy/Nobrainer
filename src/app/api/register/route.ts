import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Register API called");
    
    // Test Prisma connection first
    try {
      await prisma.$connect();
      console.log("✅ Prisma connected successfully");
    } catch (connError) {
      console.error("❌ Prisma connection failed:", connError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }
    
    const { email, password, name } = await request.json();
    console.log("📝 Request data:", { email, name, hasPassword: !!password });

    if (!email || !password) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log("🔍 Checking for existing user...");
    // Check if user already exists
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      });
    } catch (findError) {
      console.error("❌ Error finding user:", findError);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    if (existingUser) {
      console.log("⚠️ User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log("🔐 Hashing password...");
    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (hashError) {
      console.error("❌ Error hashing password:", hashError);
      return NextResponse.json(
        { error: "Password hashing failed" },
        { status: 500 }
      );
    }

    console.log("👤 Creating user...");
    // Create user
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null,
        },
      });
    } catch (createError) {
      console.error("❌ Error creating user:", createError);
      console.error("Create error details:", {
        name: createError instanceof Error ? createError.name : 'Unknown',
        message: createError instanceof Error ? createError.message : 'Unknown error',
        code: (createError as any)?.code,
        meta: (createError as any)?.meta
      });
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }

    console.log("✅ User created successfully:", user.id);
    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("💥 Registration error:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
