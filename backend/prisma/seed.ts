import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create authors
  const author1 = await prisma.author.create({
    data: {
      fullname: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10),
      bio: 'Tech enthusiast and blogger',
      avatarUrl: 'https://example.com/avatar1.jpg',
    },
  });

  

  const author2 = await prisma.author.create({
    data: {
      fullname: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      password: await bcrypt.hash('password456', 10),
      bio: 'Travel blogger and photographer',
      avatarUrl: 'https://example.com/avatar2.jpg',
    },
  });

  // Create posts
  await prisma.post.create({
    data: {
      title: 'Getting Started with Node.js',
      content: 'Node.js is a powerful JavaScript runtime built on Chrome\'s V8 JavaScript engine...',
      postStatus: 'PUBLISHED',
      pubishedAt: new Date(),
      authorId: author1.authorId,
    },
  });

  await prisma.post.create({
    data: {
      title: 'My Trip to Paris',
      content: 'Paris, the City of Light, is one of the most beautiful cities in the world...',
      postStatus: 'PUBLISHED',
      pubishedAt: new Date(),
      authorId: author2.authorId,
    },
  });

  await prisma.post.create({
    data: {
      title: 'The Future of AI',
      content: 'Artificial Intelligence is rapidly evolving and shaping our future...',
      postStatus: 'DRAFT',
      pubishedAt: null,
      authorId: author1.authorId,
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });