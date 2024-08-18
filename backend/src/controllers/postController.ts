import { FastifyRequest, FastifyReply } from 'fastify';
import { createNewPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../services/postService';

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const { title, content, postStatus } = request.body as any;
  const authorId = (request.user as any).userId;
  const post = await createNewPost(title, content, postStatus, authorId);
  reply.code(201).send(post);
}

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
  const posts = await getAllPosts();
  reply.send(posts);
}

export async function getPost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = request.params as { postId: string };
  const post = await getPostById(postId);
  if (!post) {
    reply.code(404).send({ message: 'Post not found' });
    return;
  }
  reply.send(post);
}

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = request.params as { postId: string };
  const { title, content, postStatus } = request.body as any;
  const authorId = (request.user as any).userId;
  const updatedPost = await updatePostById(postId, title, content, postStatus, authorId);
  if (!updatedPost) {
    reply.code(404).send({ message: 'Post not found or you are not authorized to update it' });
    return;
  }
  reply.send(updatedPost);
}

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = request.params as { postId: string };
  const authorId = (request.user as any).userId;
  const deleted = await deletePostById(postId, authorId);
  if (!deleted) {
    reply.code(404).send({ message: 'Post not found or you are not authorized to delete it' });
    return;
  }
  reply.code(204).send();
}