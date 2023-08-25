import prisma from '../helpers/db.client.ts';
import DatabaseError from '../helpers/errors/database.error.ts';

export default {
  find: async (event_id?: number, user_id?: number) => {
    try {
      const userOnEvent = await prisma.event_on_user.findMany({
        where: {
          user_id,
          event_id,
        },
        include: { user: true },
      });
      await prisma.$disconnect();

      const data = userOnEvent.map((user) => ({
        event_id: user.event_id,
        status: user.status,
        team: user.team,
        created_at: user.createdAt,
        user: {
          id: user.user.id,
          username: user.user.username,
          email: user.user.email,
          avatar: user.user.image_url,
        },
      }));
      return data;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_event', error);
    }
  },
  createMany: async (event_id: number, userIds: number[]) => {
    try {
      const result = await prisma.event_on_user.createMany({
        data: userIds.map((id) => ({
          user_id: id,
          event_id,
          status: 'pending',
        })),
      });
      await prisma.$disconnect();
      return !!result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_event', error);
    }
  },
  create: async (event_id: number, user_id: number) => {
    const result = await prisma.event_on_user.create({
      data: {
        event_id,
        user_id,
      },
    });
    await prisma.$disconnect();
    return !!result;
  },
  update: async (user_id: number, event_id: number, status: string, team?: number) => {
    try {
      const result = await prisma.event_on_user.update({
        where: {
          event_id_user_id: { user_id, event_id },
        },
        data: { status, team },
      });
      await prisma.$disconnect();
      return !!result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_event', error);
    }
  },
};
