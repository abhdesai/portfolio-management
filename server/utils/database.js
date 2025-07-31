const { PrismaClient } = require('@prisma/client');
const { techInfo, techError } = require('./debug');

// Create a single Prisma client instance
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

// Log queries in development
if (process.env.NODE_ENV !== 'production') {
  prisma.$on('query', (e) => {
    techInfo('Query: ' + e.query);
    techInfo('Params: ' + e.params);
    techInfo('Duration: ' + e.duration + 'ms');
  });
}

// Graceful shutdown
const gracefulShutdown = async () => {
  techInfo('🔄 Disconnecting from database...');
  await prisma.$disconnect();
  techInfo('✅ Database disconnected');
  process.exit(0);
};

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  techError('Uncaught Exception:', error);
  await prisma.$disconnect();
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', async (reason, promise) => {
  techError('Unhandled Rejection at:', promise, 'reason:', reason);
  await prisma.$disconnect();
  process.exit(1);
});

module.exports = prisma; 