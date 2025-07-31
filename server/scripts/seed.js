const bcrypt = require('bcryptjs');
const { appDebug, techDebug } = require('../utils/debug');
const prisma = require('../utils/database');

async function main() {
  appDebug('🌱 Starting database seed...');

  // Create sample users
  const sampleUsers = [
    {
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      phone: '+1-555-123-4567',
      street: '123 Admin Street',
      city: 'Tech City',
      state: 'TC',
      zipCode: '12345',
      country: 'United States',
      password: 'admin123',
      role: 'admin'
    },
    {
      username: 'john_doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-987-6543',
      street: '456 Main Street',
      city: 'Finance City',
      state: 'FC',
      zipCode: '67890',
      country: 'United States',
      password: 'password123',
      role: 'user'
    },
    {
      username: 'jane_smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-456-7890',
      street: '789 Oak Avenue',
      city: 'Investment Town',
      state: 'IT',
      zipCode: '11111',
      country: 'United States',
      password: 'password123',
      role: 'user'
    },
    {
      username: 'mike_wilson',
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'mike.wilson@example.com',
      phone: '+1-555-321-0987',
      street: '321 Pine Road',
      city: 'Trading City',
      state: 'TC',
      zipCode: '22222',
      country: 'United States',
      password: 'password123',
      role: 'user'
    },
    {
      username: 'sarah_jones',
      firstName: 'Sarah',
      lastName: 'Jones',
      email: 'sarah.jones@example.com',
      phone: '+1-555-654-3210',
      street: '654 Elm Street',
      city: 'Portfolio City',
      state: 'PC',
      zipCode: '33333',
      country: 'United States',
      password: 'password123',
      role: 'user'
    }
  ];

  for (const userData of sampleUsers) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { username: userData.username }
      });

      if (existingUser) {
        appDebug(`⚠️  User ${userData.username} already exists, skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          street: userData.street,
          city: userData.city,
          state: userData.state,
          zipCode: userData.zipCode,
          country: userData.country,
          password: hashedPassword,
          role: userData.role,
          emailVerified: true // Seed users are pre-verified
        }
      });

      appDebug(`✅ Created user: ${user.username} (${user.role})`);
    } catch (error) {
      techDebug(`❌ Error creating user ${userData.username}:`, error.message);
    }
  }

  appDebug('🎉 Database seeding completed!');
  appDebug('\n📋 Sample Users Created:');
  appDebug('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  appDebug('👑 Admin User:');
  appDebug('   Username: admin');
  appDebug('   Password: admin123');
  appDebug('   Email: admin@example.com');
  appDebug('');
  appDebug('👤 Regular Users:');
  appDebug('   Username: john_doe     Password: password123');
  appDebug('   Username: jane_smith   Password: password123');
  appDebug('   Username: mike_wilson  Password: password123');
  appDebug('   Username: sarah_jones  Password: password123');
  appDebug('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  appDebug('\n🌐 You can now login at: http://localhost:6060');
  appDebug('📚 API docs available at: http://localhost:6050/api-docs');
}

main()
  .catch((e) => {
    techDebug('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 