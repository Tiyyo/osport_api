import { faker } from '@faker-js/faker';
import prisma from '../app/helpers/db.client.js';
import logger from '../app/helpers/logger.js';
import { createUser } from '../app/service/auth.js';
import Friend from '../app/models/user_on_friend.js';
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
}
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
    if (!admin)
        logger.error('Admin creation account failed');
    // Seed user for testing use
    const usersToCreate = 30;
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
    }
    catch (error) {
        logger.info('Seeding user failed');
        logger.error(error);
    }
    const user = await prisma.user.findMany();
    // @ts-ignore
    const userIds = user.map((u) => u.id);
    if (!admin)
        throw new Error('Can\'t add relation to admin account');
    const arrayOneToFive = [1, 2, 3, 4, 5];
    const friendQueries = arrayOneToFive.map((n) => Friend.create({
        asker_id: admin.id,
        asked_id: userIds[n],
    }));
    const arrayFiveToTen = [6, 7, 8, 9, 10, 11];
    const friendQueries2 = arrayFiveToTen.map((n) => prisma.user_on_friend.create({
        data: {
            asker_id: admin.id,
            asked_id: userIds[n],
            status: 'accepted',
        },
    }));
    const arrayTenToTwenty = [12, 13, 14, 15, 16, 17, 18, 19, 20];
    const friendQueries3 = arrayTenToTwenty.map((n) => prisma.user_on_friend.create({
        data: {
            asked_id: admin.id,
            asker_id: userIds[n],
            status: 'pending',
        },
    }));
    try {
        await Promise.all([...friendQueries, ...friendQueries2, ...friendQueries3]);
    }
    catch (error) {
        logger.error('Seeding friend failed');
    }
    // const testData = {
    //   date: faker.date.future(),
    //   location: faker.location.city(),
    //   duration: 60,
    //   nb_max_participant: 10,
    //   user_id: admin.id,
    //   sport_id: 1,
    // };
    // try {
    //   await prisma.event.create({
    //     data: {
    //       date: testData.date,
    //       location: testData.location,
    //       duration: 60,
    //       nb_max_participant: 10,
    //       creator: {
    //         connect: { id: testData.user_id },
    //       },
    //       sport: {
    //         connect: {
    //           id: 1,
    //         },
    //       },
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    //   console.log('event is failling');
    // }
    // user rate himlsef
    const levels = [2, 5, 8];
    const ownRatingFootballQueries = arrIteration.map((_, index) => ({
        user_id: userIds[index + 1],
        sport_id: 1,
        rating: levels[getRandomInt(0, 3)],
        rater_id: userIds[index + 1],
    }));
    const ownRatingBasketballQueries = arrIteration.map((_, index) => ({
        user_id: userIds[index + 1],
        sport_id: 2,
        rating: levels[getRandomInt(0, 3)],
        rater_id: userIds[index + 1],
    }));
    function allExceptOne(id, index) {
        return index + 1 === id ? index + 2 : index + 1;
    }
    function randomRating(id) {
        const dataRating = arrIteration.map((_, index) => ({
            user_id: id,
            sport_id: getRandomInt(1, 3),
            rating: getRandomInt(1, 11),
            rater_id: allExceptOne(id, index),
        }));
        return dataRating;
    }
    const datas = arrIteration.map((_, index) => randomRating(index + 1));
    const ratingQueries = [...datas.flat(),
        ...ownRatingFootballQueries, ...ownRatingBasketballQueries];
    try {
        await prisma.user_on_sport.createMany({
            data: ratingQueries,
        });
    }
    catch (error) {
        logger.info('Seeding rating failed');
        logger.error(error);
    }
    // create events
    const arrayOneToFiveR = [1, 2, 3, 4, 5];
    const arrayOneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const eventQueries1 = arrayOneToFiveR.map(() => ({
        date: faker.date.past(),
        location: faker.location.city(),
        duration: 60,
        nb_max_participant: 10,
        creator_id: admin.id,
        sport_id: 1,
        status: 'full',
    }));
    function invitForCloseEvent(event_id, status, nbIteration, number = 0) {
        return nbIteration.map((n) => ({
            event_id,
            user_id: userIds[n + number],
            status,
            team: n < 6 ? 1 : 2,
        }));
    }
    function invitForOpenEvent(event_id, status, nbIteration, number = 0) {
        return nbIteration.map((n) => ({
            event_id,
            user_id: userIds[n + number],
            status,
        }));
    }
    const ParticipantR1 = arrayOneToFiveR.map((n) => invitForCloseEvent(n, 'accepted', arrayOneToTen));
    const eventQueries2 = arrayOneToFiveR.map(() => ({
        date: faker.date.past(),
        location: faker.location.city(),
        duration: 60,
        nb_max_participant: 6,
        creator_id: admin.id,
        sport_id: 2,
        status: 'full',
    }));
    const arrayOneToSix = [1, 2, 3, 4, 5, 6];
    const ParticipantR2 = arrayOneToFiveR.map((n) => invitForCloseEvent(n + 5, 'accepted', arrayOneToSix, 10));
    const eventQueries3 = arrayOneToFiveR.map(() => ({
        date: faker.date.past(),
        location: faker.location.city(),
        duration: 90,
        nb_max_participant: 10,
        creator_id: admin.id,
        sport_id: 1,
        status: 'full',
    }));
    const ParticipantR3 = arrayOneToFiveR.map((n) => invitForCloseEvent(n + 10, 'accepted', arrayOneToTen, 5));
    const eventQueries4 = arrayOneToFiveR.map(() => ({
        date: faker.date.future(),
        location: faker.location.city(),
        duration: 60,
        nb_max_participant: 10,
        creator_id: admin.id,
        sport_id: 2,
    }));
    const ParticipantR4 = arrayOneToFiveR.map((n) => invitForOpenEvent(n + 15, 'pending', arrayOneToTen, 15));
    const eventQueries5 = arrayOneToFiveR.map(() => ({
        date: faker.date.future(),
        location: faker.location.city(),
        duration: 60,
        nb_max_participant: 10,
        creator_id: admin.id,
        sport_id: 1,
    }));
    const ParticipantR5 = arrayOneToFiveR.map((n) => invitForOpenEvent(n + 20, 'pending', arrayOneToTen, 18));
    const eventQueries = [
        ...eventQueries1,
        ...eventQueries2,
        ...eventQueries3,
        ...eventQueries4,
        ...eventQueries5,
    ];
    try {
        await prisma.event.createMany({
            data: eventQueries,
        });
    }
    catch (error) {
        logger.info('Seeding event failed');
        logger.error(error);
    }
    const participantQueries = [
        ...ParticipantR1.flat(),
        ...ParticipantR2.flat(),
        ...ParticipantR3.flat(),
        ...ParticipantR4.flat(),
        ...ParticipantR5.flat(),
    ];
    try {
        await prisma.event_on_user.createMany({
            data: participantQueries,
        });
    }
    catch (error) {
        console.log(error);
        logger.info('Seeding event on user failed');
        logger.error(error);
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