import { FastifyInstance } from 'fastify';
import { createPostSchema, updatePostSchema, getPostSchema, deletePostSchema } from '../schemas/post';
import { createPost, getPosts, getPost, updatePost, deletePost } from '../controllers/postController';
import { authenticate } from '../utils/auth';

export async function postRoutes(fastify: FastifyInstance) {
  // Create a new post (authenticated)
  fastify.post('/', { schema: createPostSchema, preHandler: authenticate }, createPost);

  // Get all posts (public)
  fastify.get('/', getPosts);

  // Get a specific post (public)
  fastify.get('/:postId', { schema: getPostSchema }, getPost);

  // Update a post (authenticated)
  fastify.put('/:postId', { schema: updatePostSchema, preHandler: authenticate }, updatePost);

  // Delete a post (authenticated)
  fastify.delete('/:postId', { schema: deletePostSchema, preHandler: authenticate }, deletePost);
}