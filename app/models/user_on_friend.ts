import prisma from '../helpers/db.client.ts';
import type { FriendRequestStatus } from '../@types/index.js';

export default {
  // get all friends of an user
  // pending and accepted
  findByUserId: async (userId: number) => {
    const result = await prisma.user_on_friend.findMany({
      where: {
        asker_id: userId,
        status: 'accepted' || 'pending',
      },
      include: {
        asked: true,
        asker: true,
      },
    });
    await prisma.$disconnect();
    return result;
  },
  // get all pending friend requests of an user
  // this is requests user have to accept or reject
  findByFriendId: async (userId: number) => {
    const result = await prisma.user_on_friend.findMany({
      where: {
        asked_id: userId,
        status: 'pending',
      },
      include: {
        asker: true,
        asked: true,
      },
    });
    await prisma.$disconnect();
  },
  // create a pending friend request on the 2 sides of the relationship
  create: async (askerId: number, askedId: number) => {
    const result = await prisma.user_on_friend.createMany({
      data: [{
        asker_id: askerId,
        asked_id: askedId,
        status: 'pending',
      }, {
        asker_id: askedId,
        asked_id: askerId,
        status: 'pending',
      }],
    });
    await prisma.$disconnect();
    return result;
  },
  // this is not working
  update: async (askerId: number, askedId: number, status: FriendRequestStatus) => {
    const result = await prisma.user_on_friend.update({
      where: {
        asker: askerId,
        asked: askedId,
      },
      data: {
        status,
      },
    });
  },
};
