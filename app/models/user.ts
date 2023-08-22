import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { LoginForm } from '../@types/index.d.ts';

// Exclude keys from user
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
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
    const result = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const userTargetExclude = exclude(result, ['id', 'password', 'createdAt', 'updatedAt']);
    await prisma.$disconnect();
    return userTargetExclude;
  },
};
