import { Request, Response } from 'express';
import EventModel from '../models/event.ts';

export default {

    // userId: number,
    //         eventDate: any,
    //         location: string,
    //         duration: number,
    //         nbMaxParticipant: number,
    //         eventStatus: string,
    //         creatorId: number,
    //         sportId: number,

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
            creator: userId,
            date: eventDate,
            location,
            duration,
            nb_max_participant: nbMaxParticipant,
            status: eventStatus,
            sport: sportId,
        });
        return res.status(201).json({ message: 'Event created : ', event });
    },

};
