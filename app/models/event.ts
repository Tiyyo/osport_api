import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
// import exclude from '../utils/exclude.fields.ts';

export default {

  createEvent: async (data: Prisma.EventCreateInput) => {
    const result = await prisma.event.create(
      {
        data,
      },
    );
    await prisma.$disconnect();
    return result;
  },
};
