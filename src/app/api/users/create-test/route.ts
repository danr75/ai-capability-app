import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    // Check if test user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "test@example.com" }
    })

    if (existingUser) {
      return NextResponse.json({ 
        message: "Test user already exists",
        user: { id: existingUser.id, email: existingUser.email, name: existingUser.name }
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("password", 12)

    // Create test user
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        password: hashedPassword,
      }
    })

    return NextResponse.json({ 
      message: "Test user created successfully",
      user: { id: user.id, email: user.email, name: user.name }
    })
  } catch (error) {
    console.error("Error creating test user:", error)
    return NextResponse.json(
      { error: "Failed to create test user" },
      { status: 500 }
    )
  }
}
