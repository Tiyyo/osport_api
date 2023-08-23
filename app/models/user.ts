import { Prisma, User } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { LoginForm } from '../@types/index.d.ts';

// Exclude field(s) way
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
    const result = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!result) throw new Error('User not found');

    const userTargetExclude = exclude(result, ['id', 'password', 'createdAt', 'updatedAt']);
    await prisma.$disconnect();
    return userTargetExclude;
  },

  patchImage: async (id: number, imageUrl: any) => {
    // existingUser check if user already has an image
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { image_id: true, username: true },
    });
    // exinstinUser will return { image_id: 2 } if yes and { image_id: null } if not

    if (existingUser) {
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
    }

    const userWithUpdatedImage = await prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        username: true,
        image: {
          select: { url: true },
        },
      },
    });

    await prisma.$disconnect();
    return userWithUpdatedImage;
  },
};
