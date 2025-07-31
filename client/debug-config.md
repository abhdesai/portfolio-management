# Client-Side Debug Configuration

## Environment Variables

Create a `.env` file in the client directory with the following variables:

```bash
# Client-side Debug Configuration
# Set to 'verbose' to enable debug logging, 'none' to disable

# Application-level debug logging (user actions, business logic)
REACT_APP_CLIENT_DEBUG=none

# Technical-level debug logging (API calls, network requests, errors)
REACT_APP_CLIENT_TECH_DEBUG=none

# Other client environment variables
REACT_APP_API_URL=http://localhost:6050
```

## Debug Levels

### REACT_APP_CLIENT_DEBUG
- **Purpose**: Application-level debugging (user flows, business logic)
- **Usage**: `clientDebug('User logged in:', userId)`
- **Values**: `verbose` or `none`

### REACT_APP_CLIENT_TECH_DEBUG
- **Purpose**: Technical-level debugging (API calls, network requests, errors)
- **Usage**: `clientTechDebug('API request:', requestData)`
- **Values**: `verbose` or `none`

## Usage Examples

```typescript
import { 
  clientDebug, 
  clientTechDebug, 
  clientError, 
  clientInfo,
  clientStartup 
} from './utils/debug';

// Application-level logging
clientDebug('User clicked login button');
clientInfo('User profile updated successfully');

// Technical-level logging
clientTechDebug('Making API request to /auth/login');
clientTechError('API request failed:', error);

// Startup logging
clientStartup('Application initialized');
```

## Benefits

1. **Clean Production Logs** - No debug noise in production
2. **Detailed Development Logs** - Full visibility when needed
3. **Organized Logging** - APP vs TECH separation
4. **Timestamps** - All logs include precise timing
5. **Error Context** - Stack traces when debug is enabled
6. **Performance** - No logging overhead when disabled 