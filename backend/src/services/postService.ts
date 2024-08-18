import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNewPost(title: string, content: string, postStatus: Status, authorId: string) {
  return prisma.post.create({
    data: {
      title,
      content,
      postStatus,
      authorId,
      pubishedAt: postStatus === Status.PUBLISHED ? new Date() : null,
    },
  });
}

export async function getAllPosts() {
  return prisma.post.findMany({
    where: { postStatus: Status.PUBLISHED },
    include: { author: { select: { fullname: true, username: true } } },
  });
}

export async function getPostById(postId: string) {
  return prisma.post.findUnique({
    where: { postId },
    include: { author: { select: { fullname: true, username: true } } },
  });
}

export async function updatePostById(postId: string, title: string, content: string, postStatus: Status, authorId: string) {
  const post = await prisma.post.findUnique({ where: { postId } });
  if (!post || post.authorId !== authorId) {
    return null;
  }

  return prisma.post.update({
    where: { postId },
    data: {
      title,
      content,
      postStatus,
      pubishedAt: postStatus === Status.PUBLISHED && post.postStatus !== Status.PUBLISHED ? new Date() : post.pubishedAt,
    },
  });
}

export async function deletePostById(postId: string, authorId: string) {
  const post = await prisma.post.findUnique({ where: { postId } });
  if (!post || post.authorId !== authorId) {
    return null;
  }

  await prisma.post.delete({ where: { postId } });
  return true;
}