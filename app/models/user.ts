import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { AllowedUserUpdate } from '../@types/index.d.ts';
import exclude from '../utils/exclude.fields.ts';
import DatabaseError from '../helpers/errors/database.error.ts';

export default {
  create: async (data: Prisma.UserCreateInput) => {
    try {
      const result = await prisma.user.create({
        data,
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },
  findOne: async (data: Prisma.UserWhereInput) => {
    try {
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
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },
  getUserInfos: async (id: number) => {
    // We find the user with the id provided by the front
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    // We check if the id is in our database
    if (!user) throw new Error('User not found');

    // We exclude all datas that front doesn't need, the image will be added later
    const userFiltered = exclude(
      user,
      [
        'password',
        'email',
        'created_at',
        'updated_at',
      ],
    );

    await prisma.$disconnect();
    return userFiltered;
  },
  deleteUser: async (id: number) => {
    try {
      const result = await prisma.user.delete({
        where: {
          id,
        },
      });
      await prisma.$disconnect();
      return !!result.id;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },
  updateUser: async (id: number, data: AllowedUserUpdate) => {
    try {
      const result = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
          image_url: data.imageUrl,
        },
      });
      await prisma.$disconnect();
      return !!result.id;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },

};
