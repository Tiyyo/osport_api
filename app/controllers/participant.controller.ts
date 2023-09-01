import { Request, Response } from 'express';
import UserOnEvent from '../models/user_on_event.js';
import Event from '../models/event.js';
import checkParams from '../utils/checkParams.js';
import Cache from '../service/cache.js';
import { generateBalancedTeam } from '../service/generateTeam.js';
import UserInputError from '../helpers/errors/userInput.error.js';

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
    await Cache.del([keyToDelete, `event${event_id}`]);

    if (status === 'rejected') {
      await UserOnEvent.update(user_id, event_id, status);
      return res.status(204).json({ message: 'status updated' });
    }

    const participants = await UserOnEvent.findConfirmed(event_id);

    const event = await Event.findOne(event_id);

    if (event?.nb_max_participant === participants) {
      // TODO update event status to open -> full
      throw new UserInputError('Event is full');
    }

    await UserOnEvent.update(user_id, event_id, status);

    if (event?.nb_max_participant === participants + 1) {
      await generateBalancedTeam(event_id);
    }

    return res.status(204).json({ message: 'status updated' });
  },
};
