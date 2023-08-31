import prisma from '../helpers/db.client.ts';
import DatabaseError from '../helpers/errors/database.error.ts';
import UserInputError from '../helpers/errors/userInput.error.ts';

type SportLevel = {
  name: string,
  gb_rating: number | null,
  user_id?: number,
};

export default {

  addOwnSport: async (user_id: number, sport_id: number, rating: number) => {
    try {
      const isExist = await prisma.user_on_sport.findFirst({
        where: {
          user_id,
          sport_id,
          rater_id: user_id,
        },
      });

      if (isExist) throw new UserInputError('Sport already rated');

      const result = await prisma.user_on_sport.create({
        data: {
          user_id,
          sport_id,
          rating,
          rater_id: user_id,
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      if (error instanceof UserInputError) throw error;
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },
  updateSportRating: async (data: {
    user_id: number,
    sport_id: number,
    rating: number,
    rater_id: number,
  }) => {
    try {
      const result = await prisma.user_on_sport.update({
        where: {
          user_id: data.user_id,
          sport_id: data.sport_id,
        },
        data: {
          rating: data.rating,
          rater_id: data.rater_id,
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },
  getRatings: async (user_id: number) => {
    // (user_id , sport_id)
    try {
      const resultFoot: any = await prisma.$queryRaw`
    SELECT sport.name ,
             (SUM(level.rating) + (SELECT rating
                                   FROM (SELECT
                                          ratee.rating,
                                          ratee.sport_id,
                                          ratee.user_id
                                          FROM "User_on_sport" AS ratee
                                          WHERE ratee.user_id = ratee.rater_id ) AS own_rating
                                  WHERE own_rating.user_id = ${user_id} AND own_rating.sport_id = 1 ) * 5 )
            /( COUNT(level.rating) + 5) AS gb_rating
    FROM "User_on_sport" as level
    INNER JOIN "Sport" AS sport ON level.sport_id = sport.id
    WHERE level.sport_id = 1 AND level.user_id = ${user_id} AND level.user_id <> level.rater_id
    GROUP BY sport.name`;

      const foot: SportLevel = resultFoot[0];

      const resultBasket: any = await prisma.$queryRaw`
    SELECT sport.name ,
             (SUM(level.rating) + (SELECT rating
                                   FROM (SELECT
                                          ratee.rating,
                                          ratee.sport_id,
                                          ratee.user_id
                                          FROM "User_on_sport" AS ratee
                                          WHERE ratee.user_id = ratee.rater_id ) AS own_rating
                                  WHERE own_rating.user_id = ${user_id} AND own_rating.sport_id = 2 ) * 5 )
            /( COUNT(level.rating) + 5) AS gb_rating
    FROM "User_on_sport" as level
    INNER JOIN "Sport" AS sport ON level.sport_id = sport.id
    WHERE level.sport_id = 2 AND level.user_id = ${user_id} AND level.user_id <> level.rater_id
    GROUP BY sport.name`;

      const basket: SportLevel = resultBasket[0];

      const sports: SportLevel[] = [
        { name: foot?.name ?? 'Football', gb_rating: foot ? Number(foot.gb_rating) : null },
        { name: basket?.name ?? 'Basketball', gb_rating: basket ? Number(basket.gb_rating) : null },
      ];

      await prisma.$disconnect();
      return sports;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },
  getRating: async (user_id: number, sport_id: number) => {
    try {
      const sportLevelResult: any = await prisma.$queryRaw`
  SELECT sport.name ,
           (SUM(level.rating) + (SELECT rating
                                 FROM (SELECT
                                        ratee.rating,
                                        ratee.sport_id,
                                        ratee.user_id
                                        FROM "User_on_sport" AS ratee
                                        WHERE ratee.user_id = ratee.rater_id ) AS own_rating
                                WHERE own_rating.user_id = ${user_id} AND own_rating.sport_id = ${sport_id} ) * 5 )
          /( COUNT(level.rating) + 5) AS gb_rating
  FROM "User_on_sport" as level
  INNER JOIN "Sport" AS sport ON level.sport_id = sport.id
  WHERE level.sport_id = ${sport_id} AND level.user_id = ${user_id} AND level.user_id <> level.rater_id
  GROUP BY sport.name`;

      const result: SportLevel = sportLevelResult[0];

      if (!result.name) throw new Error('Sport not found');

      const sport = { name: result.name ?? '', gb_rating: result ? Number(result.gb_rating) : null, user_id };

      await prisma.$disconnect();
      return sport;
    } catch (error: any) {
      throw new DatabaseError(error.message, 'user_on_sport', error);
    }
  },
  getStartRating: async (user_id: number) => {
    const result: any = await prisma.$queryRaw`
      SELECT
        level.rating,
        sport.name
      FROM "User_on_sport" AS level
      INNER JOIN "Sport" AS sport ON level.sport_id = sport.id
      WHERE level.rater_id = level.user_id AND level.user_id = ${user_id}
          `;
    await prisma.$disconnect();
    if (!result) return null;

    const data = Object.fromEntries(result.map((item: any) => [item.name, item.rating]));
    return data;
  },
};
