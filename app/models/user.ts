import { Prisma, User } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { LoginForm } from '../@types/index.d.ts';

// Exclude field(s) way -> recommanded, faster and more adapted for scalable apps
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

  getUserInfos: async (id: number) => {
    const user: any = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (!user) throw new Error('User not found');

    const userFiltered = exclude(
      user,
      [
        'password',
        'email',
        'image_id',
        'createdAt',
        'updatedAt',
        'image',
      ],
    );

    const imageUrl = user.image?.url || null;

    const result = {
      ...userFiltered,
      imageUrl,
    };

    await prisma.$disconnect();
    return result;
  },

  patchImage: async (id: number, imageUrl: any) => {
    // existingUser check if user already has an image
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) throw new Error('User not found');
      // If the user already has an image, it searchs in image table and updates the url
      if (existingUser.image_id) {
        await prisma.image.update({
          where: {
            id: existingUser.image_id,
          },
          data: {
            url: imageUrl,
          },
        });

      // If not, it create a new row in image table and use the id generated to put it in user table
      } else {
        const newImage = await prisma.image.create({
          data: {
            title: `avatar-${existingUser.username}`,
            url: imageUrl,
          },
        });

        await prisma.user.update({
          where: {
            id,
          },
          data: {
            image_id: newImage.id,
          },
        });
      }

    const userUpdated = await prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
      },
    });

    if (!userUpdated) throw new Error('User not found');

    const userUpdatedFiltered = exclude(
      userUpdated,
      [
        'password',
        'email',
        'image_id',
        'createdAt',
        'updatedAt',
        'image',
      ],
    );

    const result = {
      ...userUpdatedFiltered,
      imageTitle: userUpdated.image?.title,
      imageUrl,
    };

    await prisma.$disconnect();
    return result;
  },

  deleteUser: async (id: number) => {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    return user;
  },

  updateUser: async (id: number, data: Prisma.UserUpdateInput) => {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    await prisma.$disconnect();
    return user;
  },
};
