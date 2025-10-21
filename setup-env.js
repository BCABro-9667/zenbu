const fs = require('fs');
const path = require('path');

const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/zenbu

# JWT Secret for authentication (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:9002

# Admin Credentials (for reference)
# Email: info@zenbu.com
# Password: Zenbu#kamalpuri@123
`;

const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('📧 Admin Email: info@zenbu.com');
  console.log('🔑 Admin Password: Zenbu#kamalpuri@123');
  console.log('🚀 Run "npm run init-db" to set up the database');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
}
