import { Request, Response } from 'express';
import EventModel from '../models/event.ts';
import UserOnEvent from '../models/user_on_event.ts';

export default {

  createEvent: async (req: Request, res: Response) => {
    const {
      userId,
      eventDate,
      location,
      duration,
      nbMaxParticipant,
      eventStatus,
      sportId,
    } = req.body;

    const event = await EventModel.createEvent({
      creator: {
        connect: {
          id: userId,
        },
      },
      date: eventDate,
      location,
      duration,
      nb_max_participant: nbMaxParticipant,
      status: eventStatus,
      sport: {
        connect: {
          id: sportId,
        },
      },
    });

    await UserOnEvent.create(event.id, userId);
    await UserOnEvent.update(userId, event.id, 'accepted');

    res.status(201).json({ message: 'Event created ', data: event });
  },
};
