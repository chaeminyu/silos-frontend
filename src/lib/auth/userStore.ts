import crypto from 'crypto';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  accessLevel: 'basic' | 'premium' | 'admin';
  createdAt: string;
}

// Temporary in-memory storage (replace with database in production)
const users = new Map<string, User>();
const sessions = new Map<string, { userId: string; expiresAt: Date }>();

// Hash password using crypto (in production, use bcrypt)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// User management functions
export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const userId = crypto.randomUUID();
  const newUser: User = {
    ...userData,
    id: userId,
    createdAt: new Date().toISOString()
  };
  users.set(userId, newUser);
  return newUser;
}

export function getUserByPhone(phone: string): User | undefined {
  return Array.from(users.values()).find(u => u.phone === phone);
}

export function getUserById(id: string): User | undefined {
  return users.get(id);
}

export function verifyPassword(user: User, password: string): boolean {
  return user.password === hashPassword(password);
}

// Session management
export function createSession(userId: string): string {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry
  
  sessions.set(sessionToken, { userId, expiresAt });
  return sessionToken;
}

export function getSession(token: string): { userId: string; expiresAt: Date } | undefined {
  const session = sessions.get(token);
  if (!session) return undefined;
  
  // Check if session is expired
  if (session.expiresAt < new Date()) {
    sessions.delete(token);
    return undefined;
  }
  
  return session;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

// Initialize with test users (remove in production)
if (process.env.NODE_ENV === 'development') {
  createUser({
    name: '관리자',
    email: 'admin@silos.com',
    phone: '010-0000-0000',
    password: hashPassword('admin123'),
    accessLevel: 'admin'
  });
  
  createUser({
    name: '테스트유저',
    email: 'test@example.com',
    phone: '010-1234-5678',
    password: hashPassword('test123'),
    accessLevel: 'premium'
  });
}