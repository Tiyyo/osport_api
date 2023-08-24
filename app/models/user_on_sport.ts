import prisma from '../helpers/db.client.ts';
import exclude from '../utils/exclude.fields.ts';

export default {

    getSports: async (id: number) => {
        const existingUser = await prisma.user.findFirst({
          where: {
            id,
          },
        });

        // We check if the id is in our database
        if (!existingUser) throw new Error('User not found');

        const sportsMastered = await prisma.user_on_sport.findMany({
          where: {
            user_id: id,
          },
          include: {
            sport: true,
          },
        });

        if (!sportsMastered) throw new Error('The user does not master any sport at this moment');

        const sportsFiltered = sportsMastered.map((sport: any) => {
          const sportFiltred = exclude(
            sport,
            [
              'user_id',
              'sport_id',
              'createdAt',
              'updatedAt',
              'sport',
            ],
          );

          const sportName = sport.sport.name;
          const sportRate = sportFiltred.rate;

          // For every sport the user master, we create an object with the sport
          // name and the rate the user has
          return { sportName, sportRate };
        });

        await prisma.$disconnect();
        return sportsFiltered;
    },

};
