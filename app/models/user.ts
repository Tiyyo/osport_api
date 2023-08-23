import { Prisma, User } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import type { LoginForm, AllowedUserUpdate } from '../@types/index.d.ts';

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
    // We find the user with the id provided by the front
    const user: any = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
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
        'image_id',
        'createdAt',
        'updatedAt',
        'image',
      ],
    );

    // If the user doesn't have an image, we set the url and title to null to be
    // displayed on the json response
    const imageUrl = user.image?.url || null;
    const imageTitle = user.image?.title || null;

    // We construct the response with all datas needed
    const result = {
      ...userFiltered,
      imageUrl,
      imageTitle,
    };

    await prisma.$disconnect();
    return result;
  },

  patchImage: async (id: number, imageUrl: any) => {
    // existingUser check if user already has an image
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    // We check if the id is in our database
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

    // We already checked if the id from user is in our database, so we indicate
    // we are sure that userUpdated is not null (typescript)
    // Now we exclude all datas that front doesn't need, the image will be added later
    const userUpdatedFiltered = exclude(
      userUpdated!,
      [
        'password',
        'email',
        'image_id',
        'createdAt',
        'updatedAt',
        'image',
      ],
    );

    // We construct the response with all datas needed
    const result = {
      ...userUpdatedFiltered,
      imageTitle: userUpdated!.image?.title,
      imageUrl,
    };

    await prisma.$disconnect();
    return result;
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
    return id;
  },

  updateUser: async (id: number, data: AllowedUserUpdate) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    // We check if the id is in our database
    if (!existingUser) throw new Error('User not found');

    await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    const userUpdated = await prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
      },
    });

    // We already checked if the id from user is in our database, so we indicate
    // we are sure that userUpdated is not null (typescript)
    const userFiltered = exclude(
      userUpdated!,
      [
        'password',
        'email',
        'image_id',
        'createdAt',
        'updatedAt',
        'image',
      ],
    );

    // If the user doesn't have an image, we set the url and title to null to be
    // displayed on the json response
    const imageUrl = userUpdated!.image?.url || null;
    const imageTitle = userUpdated!.image?.title || null;

    // We construct the response with all datas needed
    const result = {
      ...userFiltered,
      imageTitle,
      imageUrl,
    };

    await prisma.$disconnect();
    return result;
  },

  getSports: async (id: number) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    // We check if the id is in our database
    if (!existingUser) throw new Error('User not found');

    const sportsMastered = await prisma.user_on_sport.findMany({
      where: {
        user_id: id,
      },
      include: {
        sport: true,
      },
    });

    if (!sportsMastered) throw new Error('The user does not master any sport at this moment');

    const sportsFiltered = sportsMastered.map((sport: any) => {
      const sportFiltred = exclude(
        sport,
        [
          'user_id',
          'sport_id',
          'createdAt',
          'updatedAt',
          'sport',
        ],
      );

      const sportName = sport.sport.name;
      const sportRate = sportFiltred.rate;

      // For every sport the user master, we create an object with the sport
      // name and the rate the user has
      return { sportName, sportRate };
    });

    await prisma.$disconnect();
    return sportsFiltered;
  },
};
