import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, loginUser } from '../services/authService';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { fullname, username, email, password } = request.body as any;
  const user = await registerUser(fullname, username, email, password);
  reply.code(201).send(user);
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as any;
  const token = await loginUser(email, password);
  reply.code(200).send({ token });
}