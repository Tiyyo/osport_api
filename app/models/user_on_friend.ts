import prisma from '../helpers/db.client.ts';

export default {
  // get all friends of an user
  findByUserId: async (userId: number) => {
    const result = await prisma.user_on_friend.findMany({
      where: {
        userId,
      },
      include: {
        friend: true,
      },
    });
    await prisma.$disconnect();
    return result;
  },
};
