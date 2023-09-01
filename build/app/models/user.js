import prisma from '../helpers/db.client.js';
import exclude from '../utils/exclude.fields.js';
import DatabaseError from '../helpers/errors/database.error.js';
import NotFoundError from '../helpers/errors/notFound.error.js';
export default {
    // @ts-ignore
    create: async (data) => {
        try {
            const result = await prisma.user.create({
                data,
            });
            await prisma.$disconnect();
            return result;
        }
        catch (error) {
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    // @ts-ignore
    findOne: async (data) => {
        try {
            const result = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: data.email },
                        { username: data.username },
                    ],
                },
            });
            await prisma.$disconnect();
            if (!result)
                throw new NotFoundError('User not found');
            return result;
        }
        catch (error) {
            if (error instanceof NotFoundError)
                throw error;
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    getUserInfos: async (id) => {
        // We find the user with the id provided by the front
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });
            // We check if the id is in our database
            if (!user)
                throw new NotFoundError('User not found');
            // We exclude all datas that front doesn't need, the image will be added later
            const userFiltered = exclude(user, [
                'password',
                'created_at',
                'updated_at',
            ]);
            await prisma.$disconnect();
            return userFiltered;
        }
        catch (error) {
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    updateUser: async (id, data) => {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        try {
            const result = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: {
                    username: data.username || user?.username,
                    email: data.email || user?.email,
                    image_url: data.imageUrl || user?.image_url,
                },
            });
            await prisma.$disconnect();
            return {
                id: result.id,
                username: result.username,
                email: result.email,
                image_url: result.image_url,
                created_at: result.created_at,
            };
        }
        catch (error) {
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    deleteUser: async (id) => {
        const existingUser = await prisma.user.findFirst({
            where: {
                id,
            },
        });
        // We check if the id is in our database
        if (!existingUser)
            throw new Error('User not found');
        await prisma.user.delete({
            where: {
                id,
            },
        });
        await prisma.$disconnect();
        return true;
    },
};
