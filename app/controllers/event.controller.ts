import { Request, Response } from 'express';
import Event from '../models/event.ts';
import Participant from '../models/user_on_event.ts';
import checkParams from '../utils/checkParams.ts';
import Cache from '../service/cache.ts';

export default {
  create: async (req: Request, res: Response) => {
    const {
      date, location, duration, nb_team, nb_max_participant, sport_id, user_id,
    } = req.body;

    await Event.create({
      date,
      location,
      duration,
      nb_team,
      nb_max_participant,
      sport_id,
      user_id,
    });

    await Cache.del(['events']);

    await Participant.create(user_id, sport_id);
    await Participant.update(user_id, sport_id, 'accepted');

    res.status(201).json({ message: 'Event created' });
  },
  update: async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    const event = await Event.findById(id);

    if (event?.creator_id !== id) {
      return res.status(200).json({ message: 'Not authorized' });
    }

    await Event.update(id, data);

    await Cache.del(['events', `event${id}`]);

    return res.status(200).json({ message: 'Event has been updated' });
  },
  destroy: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const event = await Event.findById(id);

    if (event?.creator_id !== id) {
      return res.status(200).json({ message: 'Not authorized' });
    }

    await Event.delete(id);

    await Cache.del(['events', `event${id}`]);

    return res.status(200).json({ message: 'Event has been deleted' });
  },
  getOne: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);
    const { cacheKey } = req.body;

    const event = await Event.findById(id);

    await Cache.set(cacheKey, event);

    return res.status(200).json({ message: 'Event found', data: event });
  },
  getAll: async (req: Request, res: Response) => {
    const { cacheKey } = req.body;
    const events = await Event.findAll();

    await Cache.set(cacheKey, events);

    return res.status(200).json({ message: 'Events found', data: events });
  },
};
