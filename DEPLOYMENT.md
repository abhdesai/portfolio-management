# Portfolio Management - Production Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- PostgreSQL (for local development)

### 1. Clone and Setup
```bash
git clone https://github.com/abhdesai/portfolio-management.git
cd portfolio-management
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```bash
# Database
POSTGRES_PASSWORD=your_secure_password_here
DATABASE_URL=postgresql://portfolio_user:your_secure_password_here@localhost:5432/portfolio_management

# JWT Security
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com

# Frontend
FRONTEND_ORIGIN=http://localhost:6060
```

### 3. Deploy with Docker Compose
```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 📋 Manual Deployment Steps

### Option 1: Docker Compose (Recommended)

1. **Build and start all services:**
   ```bash
   docker-compose up -d --build
   ```

2. **Run database migrations:**
   ```bash
   docker-compose exec server npm run db:migrate
   ```

3. **Seed database (optional):**
   ```bash
   docker-compose exec server npm run db:seed
   ```

### Option 2: Individual Services

#### Server Deployment
```bash
cd server
npm install
npm run db:migrate
npm run start:prod
```

#### Client Deployment
```bash
cd client
npm install
npm run build:prod
# Serve with nginx or any static file server
```

## 🔧 Production Configuration

### Environment Variables

#### Server (.env)
```bash
NODE_ENV=production
PORT=6050
HTTP=true
HTTPS=false
DATABASE_URL=postgresql://username:password@host:5432/database
JWT_SECRET=your-super-secure-jwt-secret-key
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
FRONTEND_ORIGIN=https://yourdomain.com
```

#### Client (.env.production)
```bash
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
```

### Database Setup

1. **PostgreSQL Installation:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   ```

2. **Create Database:**
   ```sql
   CREATE DATABASE portfolio_management;
   CREATE USER portfolio_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE portfolio_management TO portfolio_user;
   ```

3. **Run Migrations:**
   ```bash
   cd server
   npm run db:migrate
   ```

### SSL/HTTPS Setup

1. **Obtain SSL Certificates** (Let's Encrypt recommended)
2. **Configure Nginx:**
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       location / {
           proxy_pass http://localhost:6060;
       }
       
       location /api/ {
           proxy_pass http://localhost:6050;
       }
   }
   ```

## 🐳 Docker Commands

### Useful Commands
```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Update and redeploy
docker-compose up -d --build

# View running containers
docker-compose ps

# Access server shell
docker-compose exec server sh

# Access database
docker-compose exec postgres psql -U portfolio_user -d portfolio_management
```

### Health Checks
```bash
# Check server health
curl http://localhost:6050/

# Check client health
curl http://localhost:6060/health

# Check database health
docker-compose exec postgres pg_isready -U portfolio_user
```

## 🔒 Security Checklist

- [ ] Change default passwords
- [ ] Use strong JWT secret
- [ ] Configure HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up monitoring/logging
- [ ] Regular security updates
- [ ] Database backups
- [ ] Environment variable security

## 📊 Monitoring

### Application URLs
- **Frontend:** http://localhost:6060
- **Backend API:** http://localhost:6050
- **API Documentation:** http://localhost:6050/api-docs
- **Database:** localhost:5432

### Log Locations
- **Server logs:** `./logs/` directory
- **Docker logs:** `docker-compose logs -f`
- **Nginx logs:** `/var/log/nginx/`

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed:**
   ```bash
   docker-compose exec server npm run db:migrate
   ```

2. **Port Already in Use:**
   ```bash
   # Check what's using the port
   lsof -i :6050
   # Kill the process or change ports in docker-compose.yml
   ```

3. **Build Failures:**
   ```bash
   # Clean and rebuild
   docker-compose down
   docker system prune -f
   docker-compose up -d --build
   ```

4. **Permission Issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   chmod +x deploy.sh
   ```

### Performance Optimization

1. **Enable Gzip compression**
2. **Configure caching headers**
3. **Optimize database queries**
4. **Use CDN for static assets**
5. **Enable HTTP/2**

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale server instances
docker-compose up -d --scale server=3

# Use load balancer
# Configure nginx as load balancer
```

### Database Scaling
- Consider read replicas
- Implement connection pooling
- Monitor query performance

## 🔄 Updates and Maintenance

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Database Backups
```bash
# Create backup
docker-compose exec postgres pg_dump -U portfolio_user portfolio_management > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U portfolio_user portfolio_management < backup.sql
```

## 📞 Support

For issues and questions:
- Check logs: `docker-compose logs -f`
- Review this documentation
- Check GitHub issues
- Contact: [your-email@domain.com] 