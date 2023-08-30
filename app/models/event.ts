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

    findOne: async ({ eventId }: any) => {
        const result = await prisma.event.findUnique(
            {
                where: {
                    id: eventId,
                },
            },
        );
        await prisma.$disconnect();
        return result;
    },

    validateEvent: async (status: string, eventId: number) => {
        const eventUpdated = await prisma.event.update(
            {
                where: {
                    id: eventId,
                },
                data: {
                    status,
                },
            },
        );
        await prisma.$disconnect();
        return eventUpdated;
    },

};
