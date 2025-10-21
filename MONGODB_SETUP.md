# MongoDB Integration Setup Guide

This guide will help you set up and run the Zenbu e-commerce application with MongoDB backend.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **npm** or **yarn**

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/zenbu

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service (varies by OS)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get your connection string and update `MONGODB_URI` in `.env.local`

### 4. Initialize Database

Run the database initialization script to create sample data:

```bash
npm run init-db
```

This will:
- Create an admin user (email: `info@zenbu.com`, password: `Kamalpuri@Zenbu123`)
- Create sample categories and products
- Set up the database schema

### 5. Start the Application

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

## Database Schema

### Collections

1. **Users** - User accounts and authentication
2. **Products** - Product catalog
3. **Categories** - Product categories
4. **Orders** - Customer orders
5. **Leads** - Contact form submissions

### Key Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Admin Panel**: Protected admin routes with role-based access
- **API Routes**: RESTful API endpoints for all CRUD operations
- **Data Validation**: Mongoose schemas with validation
- **Error Handling**: Comprehensive error handling throughout the application

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create lead

## Default Admin Credentials

- **Email**: `info@zenbu.com`
- **Password**: `Zenbu#kamalpuri@123`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env.local`
   - Verify network connectivity (for Atlas)

2. **Authentication Issues**
   - Ensure JWT_SECRET is set in environment variables
   - Check if the admin user was created during initialization

3. **API Errors**
   - Check browser console for error messages
   - Verify API routes are properly configured
   - Ensure database connection is established

### Development Tips

1. **Database Reset**: Run `npm run init-db` to reset the database with fresh sample data
2. **Logs**: Check the terminal for detailed error messages
3. **Network**: Ensure all required ports are accessible (9002 for Next.js, 27017 for MongoDB)

## Production Deployment

For production deployment:

1. **Environment Variables**: Set secure values for `JWT_SECRET` and `MONGODB_URI`
2. **Database**: Use MongoDB Atlas or a managed MongoDB service
3. **Security**: Implement proper CORS and rate limiting
4. **Monitoring**: Set up logging and monitoring for the application

## Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check that all dependencies are installed correctly
