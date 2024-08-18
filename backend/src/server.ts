import Fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';

import { authRoutes } from './routes/auth';
import { postRoutes } from './routes/posts';
import { errorHandler } from './utils/errorHandler';

export const buildServer = (): FastifyInstance => {
  const server = Fastify({
    logger: true,
  });

  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Blog Platform API',
        description: 'API for a blog platform',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    },
  });

  server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  });

  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  });

  server.register(fastifyCors, {
    origin: true,
  });

  server.setErrorHandler(errorHandler);

  server.register(authRoutes, { prefix: '/api/auth' });
  server.register(postRoutes, { prefix: '/api/posts' });

  return server;
};

const start = async () => {
  const server = buildServer();
  try {
    await server.ready();
    server.swagger();
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();