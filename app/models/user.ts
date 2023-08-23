import { Prisma, User } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { LoginForm } from '../@types/index.d.ts';

// Exclude field(s) from user
function exclude(user: User, keys: string[]) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

export default {

  create: async (data: Prisma.UserCreateInput) => {
    const result = await prisma.user.create({
      data,
    });
    await prisma.$disconnect();
    return result;
  },

  connect: async (data: LoginForm) => {
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

  findOne: async (username: string) => {
    const result: any = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const userTargetExclude = exclude(result, ['id', 'password', 'createdAt', 'updatedAt']);
    await prisma.$disconnect();
    return userTargetExclude;
  },

  patchImage: async (id: number, imageUrl: any) => {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        image_id: imageUrl,
      },
    });

    await prisma.$disconnect();
    return result;
  },
};
