# Portfolio Management Server

A Node.js/Express server for the Portfolio Management application with comprehensive API endpoints, authentication, and real-time data integration.

## 🏗️ Architecture

### Core Files
- **`index.js`** - Simple entry point
- **`config.js`** - Server configuration and environment validation
- **`middleware.js`** - All middleware setup (CORS, rate limiting, metrics, etc.)
- **`app.js`** - Express app setup with routes and endpoints
- **`server.js`** - Server creation, startup, and process management

### Directory Structure
```
server/
├── index.js              # Entry point
├── config.js             # Server configuration
├── middleware.js          # Middleware setup
├── app.js                # Express app
├── server.js             # Server startup
├── routes/               # API route handlers
│   ├── auth.routes.js    # Authentication
│   ├── user.routes.js    # User management
│   ├── portfolio.routes.js # Portfolio operations
│   ├── ticker.routes.js  # Stock ticker data
│   ├── stock.routes.js   # Stock operations
│   ├── admin.routes.js   # Admin functions
│   ├── address.routes.js # Address search
│   └── swagger.js        # API documentation
├── utils/                # Utility modules
│   ├── debug.js          # Winston logging
│   ├── metrics.js        # Prometheus metrics
│   └── email.js          # Email service
├── scripts/              # Utility scripts
├── uploads/              # File uploads
├── logs/                 # Application logs
└── prisma/               # Database schema
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file with:
```env
# Server Configuration
HTTP=true
HTTPS=false
PORT=6050

# Database
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET=your-secret-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Debug
APP_DEBUG=none
TECH_DEBUG=none
```

### Database Setup
```bash
npx prisma migrate dev
npx prisma generate
```

### Start Server
```bash
# HTTP
npm start

# HTTPS
npm run start:https

# Development
npm run dev
```

## 🔧 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Password reset functionality
- Email verification

### Portfolio Management
- Create and manage portfolios
- Import portfolio data from Excel
- Real-time portfolio tracking
- Dividend calculations

### Stock Data Integration
- Yahoo Finance API integration
- Real-time stock prices
- Historical chart data
- Company information

### Monitoring & Logging
- Winston logging with file output
- Prometheus metrics
- Request/response monitoring
- Error tracking

### Security
- Rate limiting
- CORS configuration
- Input sanitization
- File upload validation

## 📊 API Documentation

Access Swagger documentation at:
- **HTTP**: `http://localhost:6050/api-docs`
- **HTTPS**: `https://localhost:6051/api-docs`

## 📈 Metrics

Prometheus metrics available at:
- **HTTP**: `http://localhost:6050/metrics`
- **HTTPS**: `https://localhost:6051/metrics`

## 🔍 Debugging

### Log Levels
- `APP_DEBUG=verbose` - Application debug logs
- `TECH_DEBUG=verbose` - Technical debug logs

### Log Files
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs

## 🛠️ Development

### Adding New Routes
1. Create route file in `routes/`
2. Add Swagger documentation
3. Import and mount in `app.js`

### Adding New Middleware
1. Add to `middleware.js`
2. Include in `setupMiddleware()` function

### Database Changes
1. Update Prisma schema
2. Run `npx prisma migrate dev`
3. Update affected routes

## 📝 Scripts

See `scripts/README.md` for available utility scripts.

## 🔒 Security Notes

- All passwords are hashed with bcrypt
- JWT tokens expire after 24 hours
- Rate limiting prevents abuse
- File uploads are validated and sanitized
- CORS is configured for specific origins

## 🚨 Error Handling

- Comprehensive error middleware
- Structured error responses
- Detailed logging for debugging
- Graceful server shutdown

## 📦 Dependencies

Key dependencies:
- **Express** - Web framework
- **Prisma** - Database ORM
- **Winston** - Logging
- **Prometheus** - Metrics
- **Multer** - File uploads
- **Yahoo Finance** - Stock data
- **JWT** - Authentication
- **bcrypt** - Password hashing 