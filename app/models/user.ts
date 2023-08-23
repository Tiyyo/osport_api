import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';

export default {
  create: async (data: Prisma.userCreateInput) => {
    const result = await prisma.user.create({
      data,
    });
    await prisma.$disconnect();
    return result;
  },
  findOne: async (data: Prisma.userWhereInput) => {
    const result = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username },
        ],
      },
    });
    await prisma.$disconnect();
    return result;
  },
};
