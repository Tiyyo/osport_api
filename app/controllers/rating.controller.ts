import { Request, Response } from 'express';
import UserOnSport from '../models/user_on_sport.ts';
import associateStringToNumber from '../utils/associate.ts';

export default {
  rate: async (req: Request, res: Response) => {
    const { user_id, sport_id, rating: stringRating } = req.body;

    const rating = associateStringToNumber(stringRating);

    await UserOnSport.addOwnSport(user_id, sport_id, rating);

    res.status(201).json({ message: 'Sport rated' });
  },
  updateRating: async (req: Request, res: Response) => {
    const {
      user_id, sport_id, rating, rater_id,
    } = req.body;

    await UserOnSport.updateSportRating({
      user_id, sport_id, rating, rater_id,
    });

    res.status(200).json({ message: 'Rating updated' });
  },
};
