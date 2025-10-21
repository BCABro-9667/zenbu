import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export interface EnvUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export function validateEnvUser(email: string, password: string): EnvUser | null {
  const adminEmail = process.env.ADMIN_EMAIL || 'info@zenbu.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Zenbu#kamalpuri@123';
  
  if (email === adminEmail && password === adminPassword) {
    return {
      id: 'admin-1',
      email: adminEmail,
      name: 'Admin User',
      isAdmin: true,
    };
  }
  
  return null;
}

export function generateEnvToken(user: EnvUser): string {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      isAdmin: user.isAdmin 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyEnvToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}
