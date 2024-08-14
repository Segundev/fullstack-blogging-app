import { FastifyInstance } from 'fastify';
import { registerSchema, loginSchema } from '../schemas/auth';
import { register, login } from '../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', { schema: registerSchema}, register);
  fastify.post('/login', { schema: loginSchema }, login);
}