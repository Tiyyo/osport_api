import { Request, Response } from 'express';
import UserOnEvent from '../models/user_on_event.ts';
import checkParams from '../utils/checkParams.ts';
import Cache from '../service/cache.ts';

export default {
  getParticipants: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const participants = await UserOnEvent.find(id);

    await Cache.set(req.body.cacheKey, participants);

    res.status(200).json({ message: 'Participant retrieved succesfully', data: participants });
  },
  sendInivation: async (req: Request, res: Response) => {
    const { eventId: event_id, userId: user_id } = req.body;

    await UserOnEvent.create(event_id, user_id);

    const keyToDelete = `participants${event_id}`;
    await Cache.del([keyToDelete]);

    res.status(201).json({ message: 'Invitation sent' });
  },
  updateStatus: async (req: Request, res: Response) => {
    const { eventId: event_id, userId: user_id, status } = req.body;

    const keyToDelete = `participants${event_id}`;
    await Cache.del([keyToDelete]);

    await UserOnEvent.update(user_id, event_id, status);

    res.status(204).json({ message: 'status updated' });
  },
};
