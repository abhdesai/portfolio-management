require('dotenv').config();
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');
const prisma = require('../utils/database');

async function updateExistingUsers() {
  try {
    appInfo('Updating existing users to mark emails as verified...');
    
    // Update all users to have verified emails
    const result = await prisma.user.updateMany({
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpiry: null
      }
    });
    
    appInfo(`Updated ${result.count} users to have verified emails.`);
    appInfo('All existing users have been marked as verified!');
  } catch (error) {
    appError('Error updating users:', error);
  } finally {
    // Database will be disconnected by the centralized handler
  }
}

updateExistingUsers(); 