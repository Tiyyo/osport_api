import { faker } from '@faker-js/faker';
import prisma from '../app/helpers/db.client.ts';
import logger from '../app/helpers/logger.ts';

async function seed() {
	logger.info('Seeding started');

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
		logger.error('Seeding failed');
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
