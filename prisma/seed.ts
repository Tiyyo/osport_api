import { faker } from '@faker-js/faker';
import prisma from '../app/helpers/db.client.ts';
import logger from '../app/helpers/logger.ts';
import { createUser } from '../app/service/auth.ts';
import Friend from '../app/models/user_on_friend.ts';

async function seed() {
  logger.info('Seeding started');

  // DO NOT USE THIS IN PRODUCTION
  const testAccount = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin',
  };

  await createUser(testAccount);

  const admin = await prisma.user.findFirst({
    where: { username: testAccount.username },
  });

  if (!admin) logger.error('Admin creation account failed');

  // Seed user for testing use

  const usersToCreate = 10;

  const arrIteration = new Array(usersToCreate).fill(1);

  const queries = arrIteration.map(() => prisma.user.create({
    data: {
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  }));

  try {
    await Promise.all(queries);
  } catch (error) {
    logger.error('Seeding user failed');
    logger.error(error);
  }

  const user = await prisma.user.findMany();

  const userIds = user.map((u) => u.id);

  if (!admin) throw new Error('Can\t add relation to admin account');

  const friendQueries = arrIteration.map((_, index) => Friend.create({
    asker_id: admin.id,
    asked_id: userIds[index + 1],
  }));

  try {
    await Promise.all(friendQueries);
  } catch (error) {
    console.log(error);
    logger.error('Seeding friend failed');
  }
  logger.info('Seeding finished');
}

seed()
  .catch((error) => {
    logger.error(error, 'Seeding failed');
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });
