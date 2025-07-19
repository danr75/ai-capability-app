const { prisma } = require('../src/lib/prisma');
const bcrypt = require('bcryptjs');

async function checkUser() {
  try {
    const email = 'test@example.com';
    const password = 'password123';

    console.log('Checking for user:', email);
    
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('User not found in database');
      return;
    }

    console.log('User found:', {
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.password
    });

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Incorrect password');
      // Hash a new password for testing
      const newHash = await bcrypt.hash(password, 12);
      console.log('New password hash:', newHash);
    }

  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();
