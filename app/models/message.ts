import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import DatabaseError from '../helpers/errors/database.error.ts';

export default {
  create: async (data: Prisma.Event_chat_on_userCreateInput) => {
    try {
      await prisma.event_chat_on_user.create({
        data,
      });
      await prisma.$disconnect();
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  // retrieve an historic
  findMany: async (event_id: number) => {
    try {
      const result = await prisma.event_chat_on_user.findMany({
        where: { event_id },
        orderBy: { createdAt: 'asc' },
        include: {
          user: true,
        },
      });
      await prisma.$disconnect();

      const historic = result.map((message) => ({
        id: message.id,
        event_id: message.event_id,
        message: message.message,
        created_at: message.createdAt,
        updated_at: message.updatedAt,
        user: {
          id: message.user.id,
          username: message.user.username,
          avatar: message.user.image_id,
        },
      }));

      return historic;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  update: async (id: number, message: string) => {
    const today = new Date();
    try {
      await prisma.event_chat_on_user.update({
        where: { id },
        data: { message, updatedAt: today },
      });
      await prisma.$disconnect();
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  destroyOne: async (id: number) => {
    try {
      await prisma.event_chat_on_user.delete({
        where: { id },
      });
      await prisma.$disconnect();
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
  // delete the full historc of a chat event
  destroyMany: async (event_id: number) => {
    try {
      await prisma.event_chat_on_user.deleteMany({
        where: { event_id },
      });
      await prisma.$disconnect();
    } catch (error: any) {
      throw new DatabaseError(error.message, 'message', error);
    }
  },
};
