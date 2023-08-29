import { Request, Response } from 'express';
import EventModel from '../models/event.ts';

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
    return res.status(201).json({ message: 'Event created : ', event });
  },

  validateEvent: async (req: Request, res: Response) => {
    console.log(req.body);

    const {
      userId,
      eventId,
    } = req.body;

    try {
      // First, find the event based on the event ID
      const existingEvent = await EventModel.findOne({ eventId });

      if (!existingEvent) {
        return res.status(200).json({ message: 'This event doesn\'t exist' });
      }

      // Then, check if the user is the creator of the event
      const creatorId = existingEvent.creator_id;
      // If not, return an error
      if (creatorId !== userId) {
        return res.status(200).json({ message: 'You can not modify an event that does not belong to you' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error while finding event' });
    }

    // If yes, update the event status to 'closed'
    const event = await EventModel.validateEvent('closed', eventId);

    return res.status(200).json({ message: 'Event validated', event });
  },

};
