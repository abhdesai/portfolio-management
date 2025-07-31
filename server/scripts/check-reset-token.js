require('dotenv').config();
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');
const prisma = require('../utils/database');

async function checkResetToken() {
  try {
    const email = 'desaia@hotmail.com';
    const token = '9nb1iziyn9iqzf2lep5so';
    
    appInfo('Checking reset token for:', email);
    appInfo('Expected token:', token);
    
    const user = await prisma.user.findFirst({ 
      where: { email },
      select: {
        id: true,
        email: true,
        resetToken: true,
        resetTokenExpiry: true,
        username: true
      }
    });
    
    if (!user) {
      appInfo('❌ User not found');
      return;
    }
    
    appInfo('✅ User found:', {
      id: user.id,
      email: user.email,
      username: user.username,
      resetToken: user.resetToken,
      resetTokenExpiry: user.resetTokenExpiry,
      currentTime: new Date()
    });
    
    const tokenMatch = user.resetToken === token;
    const hasExpiry = !!user.resetTokenExpiry;
    const notExpired = user.resetTokenExpiry && user.resetTokenExpiry > new Date();
    
    appInfo('\nToken validation:');
    appInfo('Token match:', tokenMatch);
    appInfo('Has expiry:', hasExpiry);
    appInfo('Not expired:', notExpired);
    
    if (tokenMatch && hasExpiry && notExpired) {
      appInfo('✅ Token is valid!');
    } else {
      appInfo('❌ Token is invalid or expired');
    }
    
  } catch (error) {
    appError('Error:', error);
  } finally {
    // Database will be disconnected by the centralized handler
  }
}

checkResetToken(); 