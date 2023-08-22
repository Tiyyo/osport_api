import prisma from '../helpers/db.client.ts';
import type { FriendRequestStatus } from '../@types/index.js';
import DatabaseError from '../helpers/errors/database.error.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';

export default {
  // get all friends of an user
  // pending and accepted
  findByUserId: async (userId: number) => {
    try {
      const result = await prisma.user_on_friend.findMany({
        where: {
          asker_id: userId,
          status: { in: ['pending', 'accepted'] },
        },
        include: {
          asked: true,
        },
      });
      await prisma.$disconnect();
      if (result.length === 0) throw new NotFoundError('No friends found');
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
  // fidn pending request
  findRequest: async (userId: number, userToAdd: number) => {
    try {
      const result = await prisma.user_on_friend.findFirst({
        where: {
          asked_id: userId,
          asker_id: userToAdd,
          status: 'pending',
        },
        include: {
          asker: true,
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
  // create a pending friend request fro only 1 sides of the relationship
  create: async ({ askerId, askedId }: Record<string, number>) => {
    const result = await prisma.user_on_friend.create({
      data: {
        asker_id: askerId,
        asked_id: askedId,
        status: 'pending',
      },
    });
    await prisma.$disconnect();
    return result;
  },
  // update the status of the friend request
  update: async (askerId: number, askedId: number, status: FriendRequestStatus) => {
    const firstQuery = prisma.user_on_friend.update({
      where: {
        asked_id_asker_id: {
          asker_id: askerId,
          asked_id: askedId,
        },
      },
      data: {
        status,
      },
    });
    const secondeQuery = prisma.user_on_friend.update({
      where: {
        asked_id_asker_id: {
          asker_id: askedId,
          asked_id: askerId,
        },
      },
      data: {
        status,
      },
    });
    try {
      const result = await prisma.$transaction([firstQuery, secondeQuery]);
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_friend', error);
    }
  },
};
