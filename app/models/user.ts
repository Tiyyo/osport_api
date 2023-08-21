import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { LoginForm } from '../@types/index.js';

export default {
	create: async (data: Prisma.userCreateInput) => {
		const result = await prisma.user.create({
			data,
		});
		await prisma.$disconnect();
		return result;
	},
	findOne: async (data: LoginForm) => {
		const result = await prisma.user.findFirst({
			where: {
				OR: [
					{ email: data.emailOrUsername },
					{ username: data.emailOrUsername },
				],
			},
		});
		await prisma.$disconnect();
		return result;
	},
};
