import { Prisma } from '@prisma/client';
import prisma from '../helpers/db.client.ts';
// import exclude from '../utils/exclude.fields.ts';

interface AllowedEventUpdate {
    date?: string;
    location?: string;
    duration?: number;
    nbMaxParticipant?: number;
    sportId?: number;
}

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

    updateEvent: async (eventId: number, data: AllowedEventUpdate) => {
        // We can't use directly sport connect in the prisma.event.update
        // because prisma schema of sport force to have an id
        const eventData: any = {
            date: data.date,
            location: data.location,
            duration: data.duration,
            nb_max_participant: data.nbMaxParticipant,
        };

        // If we don't have a sport in the data provided, we don't insert the
        // sport to update in the prisma event update
        if (data.sportId !== undefined) {
            eventData.sport = {
                connect: {
                    id: data.sportId,
                },
            };
        }

        const eventUpdated = await prisma.event.update(
            {
                where: {
                    id: eventId,
                },
                data: eventData,
            },
        );
        await prisma.$disconnect();
        return eventUpdated;
    },

};
