// Client-side debug utility
// Controls logging based on environment variables

const CLIENT_DEBUG = (process.env.REACT_APP_CLIENT_DEBUG || 'none').toLowerCase();
const CLIENT_TECH_DEBUG = (process.env.REACT_APP_CLIENT_TECH_DEBUG || 'none').toLowerCase();

// Helper function to check if debug is enabled
const isClientDebugEnabled = () => CLIENT_DEBUG === 'verbose';
const isClientTechDebugEnabled = () => CLIENT_TECH_DEBUG === 'verbose';

function clientDebug(...args: any[]) {
  if (isClientDebugEnabled()) {
    const timestamp = new Date().toISOString();
    console.log(`[CLIENT] [${timestamp}]`, ...args);
  }
}

function clientTechDebug(...args: any[]) {
  if (isClientTechDebugEnabled()) {
    const timestamp = new Date().toISOString();
    console.log(`[CLIENT TECH] [${timestamp}]`, ...args);
  }
}

// Error logging - always logged but with debug context
function clientError(...args: any[]) {
  const timestamp = new Date().toISOString();
  console.error(`[CLIENT ERROR] [${timestamp}]`, ...args);
  if (isClientDebugEnabled()) {
    console.error(`[CLIENT DEBUG] Stack trace:`, new Error().stack);
  }
}

function clientTechError(...args: any[]) {
  const timestamp = new Date().toISOString();
  console.error(`[CLIENT TECH ERROR] [${timestamp}]`, ...args);
  if (isClientTechDebugEnabled()) {
    console.error(`[CLIENT TECH DEBUG] Stack trace:`, new Error().stack);
  }
}

// Warning logging
function clientWarn(...args: any[]) {
  if (isClientDebugEnabled()) {
    const timestamp = new Date().toISOString();
    console.warn(`[CLIENT WARN] [${timestamp}]`, ...args);
  }
}

function clientTechWarn(...args: any[]) {
  if (isClientTechDebugEnabled()) {
    const timestamp = new Date().toISOString();
    console.warn(`[CLIENT TECH WARN] [${timestamp}]`, ...args);
  }
}

// Info logging
function clientInfo(...args: any[]) {
  if (isClientDebugEnabled()) {
    const timestamp = new Date().toISOString();
    console.log(`[CLIENT INFO] [${timestamp}]`, ...args);
  }
}

function clientTechInfo(...args: any[]) {
  if (isClientTechDebugEnabled()) {
    const timestamp = new Date().toISOString();
    console.log(`[CLIENT TECH INFO] [${timestamp}]`, ...args);
  }
}

// Startup logging - always shown but controlled
function clientStartup(...args: any[]) {
  if (isClientDebugEnabled() || isClientTechDebugEnabled()) {
    const timestamp = new Date().toISOString();
    console.log(`[CLIENT STARTUP] [${timestamp}]`, ...args);
  }
}

export { 
  clientDebug, 
  clientTechDebug, 
  clientError, 
  clientTechError, 
  clientWarn, 
  clientTechWarn, 
  clientInfo, 
  clientTechInfo,
  clientStartup,
  isClientDebugEnabled,
  isClientTechDebugEnabled
}; 