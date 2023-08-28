import { faker } from '@faker-js/faker';
import prisma from '../app/helpers/db.client.ts';
import logger from '../app/helpers/logger.ts';
import { createUser } from '../app/service/auth.ts';
import Friend from '../app/models/user_on_friend.ts';

// function getRandomInt(min: number, max: number) {
//   return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
// }

async function seed() {
  logger.info('Seeding started');

  await prisma.sport.createMany({
    data: [
      { name: 'Football' },
      { name: 'Basketball' },
    ],
  });

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
      image: {
        create: {
          url: faker.image.urlPicsumPhotos({ width: 128 }),
          title: faker.lorem.sentence(),
        },
      },

    },
  }));

  try {
    await Promise.all(queries);
  } catch (error) {
    console.log(error);
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
    logger.error('Seeding friend failed');
  }

  // await prisma.event.create({
  //   data: {
  //     date: faker.date.future(),
  //     location: faker.location.city(),
  //     duration: 60,
  //     nb_max_participant: 10,
  //     creator_id: admin.id,
  //     sport_id: 1,
  //   },
  // });
  // const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // function randomRating(id: number) {
  //   const dataRating = numbers.map((n) => ({
  //     user_id: id,
  //     sport_id: getRandomInt(1, 3),
  //     rating: getRandomInt(1, 11),
  //     rater_id: n + 1,
  //   }));
  //   return dataRating;
  // }

  // const datas = numbers.map((n) => randomRating(n + 1));

  // await prisma.user_on_sport.createMany({
  //   data: datas.flat(),
  // });

  logger.info('Seeding finished');
}

seed()
  .catch((error) => {
    logger.error(error, 'Seeding failed');
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });

