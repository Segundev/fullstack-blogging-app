import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  request.log.error(error);

  if (error.validation) {
    reply.status(400).send({ message: 'Validation error', details: error.validation });
    return;
  }

  if (error.statusCode) {
    reply.status(error.statusCode).send({ message: error.message });
    return;
  }

  reply.status(500).send({ message: 'Internal Server Error' });
}