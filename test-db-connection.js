const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();

  try {
    console.log('Testing database connection...');
    console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@'));

    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query successful:', result);

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);

    if (error.code === 'P1001') {
      console.log('\n🔍 Troubleshooting tips:');
      console.log('1. Check if your Supabase project is active (not paused)');
      console.log('2. Verify the database URL in your .env file');
      console.log('3. Check if your IP is allowed in Supabase');
      console.log('4. Ensure the database password is correct');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
