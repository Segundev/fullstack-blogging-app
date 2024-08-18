import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';

const prisma = new PrismaClient();

export async function registerUser(fullname: string, username: string, email: string, password: string) {
  const existingUser = await prisma.author.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.author.create({
    data: {
      fullname,
      username,
      email,
      password: hashedPassword,
    },
    select: {
      authorId: true,
      fullname: true,
      username: true,
      email: true,
    },
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.author.findUnique({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.authorId);

  return token;
}