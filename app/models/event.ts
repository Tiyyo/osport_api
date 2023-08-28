import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
import DatabaseError from '../helpers/errors/database.error.ts';

export default {
  create: async (data: Prisma.EventCreateInput) => {
    try {
      const result = await prisma.event.create({
        data,
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'event', error);
    }
  },
  findById: async (id: number) => {
    try {
      const result = await prisma.event.findFirst({ where: { id } });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'event', error);
    }
  },
  findAll: async () => {
    try {
      const result = await prisma.event.findMany();
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'event', error);
    }
  },
  delete: async (id: number) => {
    try {
      const result = await prisma.event.delete({ where: { id } });
      await prisma.$disconnect();
      return !!result.id;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'event', error);
    }
  },
  update: async (id: number, args: any) => {
    try {
      const result = await prisma.event.update({ where: { id }, data: args });
      await prisma.$disconnect();
      return !!result.id;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'event', error);
    }
  },
};
