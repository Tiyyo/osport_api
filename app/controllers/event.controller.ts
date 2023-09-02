import { Request, Response } from 'express';
import EventModel from '../models/event.js';
import UserOnEvent from '../models/user_on_event.js';
import findWinnerTeam from '../utils/findWinner.js';
import checkParams from '../utils/checkParams.js';
// import UserOnEvent from '../models/user_on_event.ts';

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
    await UserOnEvent.createMany(event.id, userId);
    await UserOnEvent.update(userId, event.id, 'accepted');
    return res.status(201).json({ message: 'Event created ', data: event });
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

    return res.status(200).json({ message: 'Event validated', data: event });
  },

  updateEvent: async (req: Request, res: Response) => {
    const {
      userId,
      eventId,
      ...data
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
    // const event = await EventModel.validateEvent('closed', eventId);

    const eventUpdated = await EventModel.updateEvent(eventId, data);

    return res.status(200).json({ message: 'Event updated', data: eventUpdated });
  },

  getEvents: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const events = await EventModel.getEvents(id);

    return res.status(200).json({ message: 'Events found', data: events });
  },

  getEventDetails: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const event = await EventModel.findOne({ eventId: id });

    return res.status(200).json({ message: 'Event found', data: event });
  },

  resultsEvent: async (req: Request, res: Response) => {
    const {
      userId,
      eventId,
      ...data
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

      if (existingEvent.status === 'finished') {
        return res.status(200).json({ message: 'You can not modify an event that is already finished' });
      }

      // Set status to finished so creator cannot save differents results later
      data.eventStatus = 'finished';

      // Determine the winnerTeam based on the scores
      data.winnerTeam = findWinnerTeam(data.scoreTeam1, data.scoreTeam2);
    } catch (error) {
      return res.status(500).json({ error: 'Error while finding event' });
    }

    const eventUpdated = await EventModel.updateEvent(eventId, data);

    return res.status(200).json({ message: 'Result of the event has been saved', data: eventUpdated });
  },
};
