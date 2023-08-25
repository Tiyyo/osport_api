import { Request, Response } from 'express';
import UserOnEvent from '../models/user_on_event.ts';
// import checkParams from '../utils/checkParams.ts';

export default {
  getParticipants: async (req: Request, res: Response) => {
    const { id } = req.params;

    // exist in next commit
    // const event_id = checkParams(id);

    // dont need Number in next commits
    const participants = await UserOnEvent.find(Number(id));

    res.status(200).json({ message: 'Participant retrieved succesfully', data: participants });
  },
  sendInivation: async (req: Request, res: Response) => {
    const { event_id, user_id } = req.body;

    await UserOnEvent.create(event_id, user_id);

    res.status(201).json({ message: 'Invitation sent' });
  },
  updateStatus: async (req: Request, res: Response) => {
    const { event_id, user_id, status } = req.body;

    await UserOnEvent.update(user_id, event_id, status);

    res.status(204).json({ message: 'status updated' });
  },
};
