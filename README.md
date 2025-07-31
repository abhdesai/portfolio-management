# Portfolio Management System

A full-stack web application for managing investment portfolios with user authentication, email verification, and portfolio tracking capabilities.

## Features

### Authentication & User Management
- ✅ User registration with email verification
- ✅ Secure login/logout functionality
- ✅ Forgot password with email reset
- ✅ Change password for authenticated users
- ✅ User profile management with avatar upload
- ✅ Admin user management interface
- ✅ Email notifications for all user actions

### Security Features
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Email verification required for login
- ✅ Secure password reset flow
- ✅ User enumeration protection
- ✅ Input validation and sanitization

### User Interface
- ✅ Modern React frontend with Material-UI
- ✅ Responsive design for all screen sizes
- ✅ Real-time form validation
- ✅ Address autocomplete using OpenStreetMap
- ✅ Notification system for user feedback
- ✅ Auto-logout after 20 minutes of inactivity

## Tech Stack

### Backend
- **Node.js** with Express.js
- **Prisma** ORM with SQLite database
- **JWT** for authentication
- **Nodemailer** for email sending
- **Swagger** for API documentation
- **bcrypt** for password hashing

### Frontend
- **React** with TypeScript
- **Material-UI** for components
- **React Router** for navigation
- **Context API** for state management

## Project Structure

```
Cursor Portfolio Management/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── auth.routes.js      # Authentication routes
│   ├── user.routes.js      # User management routes
│   ├── index.js           # Main server file
│   ├── prisma/            # Database schema
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for production deployment)

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (create `.env` file):
   ```env
   JWT_SECRET=your_jwt_secret_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=http://localhost:6060
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the server:
   ```bash
   npm start
   ```
   The backend will run on http://localhost:6050

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:6060

## API Documentation

Once the backend is running, you can access the Swagger API documentation at:
http://localhost:6050/api-docs

## Key Features Implemented

### Authentication Flow
1. **Registration**: Users register with email verification
2. **Email Verification**: Required before login
3. **Login**: JWT-based authentication
4. **Password Reset**: Secure forgot password flow
5. **Change Password**: For authenticated users

### User Management
- Profile updates with avatar upload
- Address autocomplete
- Admin interface for user management
- Email verification status tracking

### Security Measures
- Password reset tokens expire after 1 hour
- Only the most recent password reset token is valid
- User enumeration protection in forgot password
- Input validation on all forms
- Secure email sending with confirmation

## Development Status

### Completed Features
- ✅ User authentication system
- ✅ Email verification
- ✅ Password reset functionality
- ✅ User profile management
- ✅ Admin user management
- ✅ Change password feature
- ✅ Address autocomplete
- ✅ Email notifications
- ✅ Security enhancements

### Next Phase
- 🔄 Portfolio management features
- 🔄 Investment tracking
- 🔄 Performance analytics
- 🔄 Portfolio visualization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Production Deployment

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive instructions.

### Quick Production Start
```bash
# Clone the repository
git clone https://github.com/abhdesai/portfolio-management.git
cd portfolio-management

# Deploy with Docker Compose
chmod +x deploy.sh
./deploy.sh
```

### Production Features
- ✅ Docker containerization
- ✅ PostgreSQL database
- ✅ Nginx reverse proxy
- ✅ SSL/HTTPS support
- ✅ Health checks
- ✅ Environment configuration
- ✅ Database migrations
- ✅ Security hardening
- ✅ Performance optimization

## License

This project is licensed under the MIT License. 