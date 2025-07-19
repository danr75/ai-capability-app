const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function verifyUser() {
  try {
    const email = 'test@example.com';
    const password = 'password123';
    
    console.log('Verifying user:', email);
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('User found in database');
    console.log('User details:', {
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.password
    });

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Is password valid?', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Password is incorrect. Updating with new hash...');
      const newHash = await bcrypt.hash(password, 12);
      await prisma.user.update({
        where: { email },
        data: { password: newHash }
      });
      console.log('Password has been updated');
    }

  } catch (error) {
    console.error('Error verifying user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyUser();
