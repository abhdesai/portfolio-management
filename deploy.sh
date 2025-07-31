#!/bin/bash

# Portfolio Management Deployment Script
set -e

echo "🚀 Starting Portfolio Management deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install it and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Portfolio Management Environment Variables
POSTGRES_PASSWORD=secure_password_change_me
JWT_SECRET=your-super-secure-jwt-secret-key-change-me
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
FRONTEND_ORIGIN=http://localhost:6060
EOF
    echo "⚠️  Please update the .env file with your actual values before deploying!"
fi

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check service health
echo "🏥 Checking service health..."
if docker-compose ps | grep -q "Up"; then
    echo "✅ All services are running!"
else
    echo "❌ Some services failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose exec server npm run db:migrate

# Seed database if needed
read -p "Do you want to seed the database with sample data? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    docker-compose exec server npm run db:seed
fi

echo "🎉 Deployment completed successfully!"
echo "📊 Application URLs:"
echo "   - Frontend: http://localhost:6060"
echo "   - Backend API: http://localhost:6050"
echo "   - API Docs: http://localhost:6050/api-docs"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop services: docker-compose down"
echo "   - Restart services: docker-compose restart"
echo "   - Update and redeploy: ./deploy.sh" 