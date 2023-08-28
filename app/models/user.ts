import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { AllowedUserUpdate } from '../@types/index.d.ts';
import exclude from '../utils/exclude.fields.ts';
import DatabaseError from '../helpers/errors/database.error.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';

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
      if (!result) throw new NotFoundError('User not found');
      return result;
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(error.message, 'user', error);
    }
  },
  findById: async (id: number) => {
    try {
      const result = await prisma.user.findUnique({
        where: { id },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user', error);
    }
  },

  getUserInfos: async (id: number) => {
    // We find the user with the id provided by the front
    const user: any = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        image: {
          select: {
            url: true,
            title: true,
          },
        },
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
        'image_url',
        'createdAt',
        'updatedAt',
      ],
    );

    await prisma.$disconnect();
    return userFiltered;
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
  deleteUser: async (id: number) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    // We check if the id is in our database
    if (!existingUser) throw new Error('User not found');

    await prisma.user.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    return true;
  },
};
