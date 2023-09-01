import prisma from '../helpers/db.client.js';
import DatabaseError from '../helpers/errors/database.error.js';
export default {
    create: async ({ url, title }) => {
        try {
            const result = await prisma.image.create({
                data: {
                    url,
                    title,
                },
            });
            await prisma.$disconnect();
            return result;
        }
        catch (error) {
            throw new DatabaseError(error.message, 'image', error);
        }
    },
    findOne: async (args) => {
        try {
            const result = await prisma.image.findFirst({
                where: {
                    OR: [
                        { url: args },
                        { title: args },
                    ],
                },
            });
            await prisma.$disconnect();
            return result;
        }
        catch (error) {
            throw new DatabaseError(error.message, 'image', error);
        }
    },
    findByPk: async (id) => {
        try {
            const result = await prisma.image.findFirst({
                where: {
                    id,
                },
            });
            await prisma.$disconnect();
            return result;
        }
        catch (error) {
            throw new DatabaseError(error.message, 'image', error);
        }
    },
    update: async (id, url, title) => {
        try {
            const result = await prisma.image.update({
                where: {
                    id,
                },
                data: {
                    url,
                    title,
                },
            });
            await prisma.$disconnect();
            return result;
        }
        catch (error) {
            throw new DatabaseError(error.message, 'image', error);
        }
    },
};
