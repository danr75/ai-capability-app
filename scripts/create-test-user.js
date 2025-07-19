const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Initialize Prisma with your database URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ai_capability_app?schema=public'
    }
  }
});

async function createTestUser() {
  try {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Update existing user with known password
      await prisma.user.update({
        where: { email },
        data: { 
          password: hashedPassword,
          name: 'Test User'
        }
      });
      console.log('Updated existing test user with new password');
    } else {
      // Create new user
      await prisma.user.create({
        data: {
          email,
          name: 'Test User',
          password: hashedPassword
        }
      });
      console.log('Created new test user');
    }

    console.log('Test user credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
