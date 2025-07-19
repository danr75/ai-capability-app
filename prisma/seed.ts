import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const testEmail = 'test@example.com';
  const testPassword = 'password123';
  
  // Check if test user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: testEmail },
  });

  if (!existingUser) {
    const hashedPassword = await hash(testPassword, 12);
    
    await prisma.user.create({
      data: {
        email: testEmail,
        name: 'Test User',
        password: hashedPassword,
      },
    });
    
    console.log('Test user created successfully!');
    console.log(`Email: ${testEmail}`);
    console.log('Password: password123');
  } else {
    console.log('Test user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
