import { Request, Response } from 'express';
import Friends from '../models/user_on_friend.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';
import checkParams from '../utils/checkParams.ts';

export default {
  getPendingRequestSent: async (req: Request, res: Response) => {
    const userId = checkParams(req.params.id);
    const status = 'pending';

    const friends = await Friends.find(Number(userId), status);

    res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },
  getAcceptedFriends: async (req: Request, res: Response) => {
    const userId = checkParams(req.params.id);
    const status = 'accepted';

    const friends = await Friends.find(Number(userId), status);

    res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },
  getPendingRequestReceived: async (req: Request, res: Response) => {
    const userId = checkParams(req.params.id);

    const friends = await Friends.findManyRequest(userId);

    res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },
  sendFriendRequest: async (req: Request, res: Response) => {
    const data = {
      asker_id: Number(req.body.userId),
      asked_id: Number(req.body.friendId),
    };

    await Friends.create(data);

    res.status(201).json({ message: 'Friend request sent successfully' });
  },
  acceptFriendRequest: async (req: Request, res: Response) => {
    const { userId, friendId } = req.body;

    try {
      await Friends.findRequest(Number(friendId), Number(userId));
    } catch (error) {
      if (error instanceof NotFoundError) return res.status(200).json({ message: 'No pending friend request found' });
    }

    const updateStatus = 'accepted';
    await Friends
      .update(Number(userId), Number(friendId), updateStatus);

    return res.status(204).json({ message: 'Friend request accepted successfully' });
  },
  rejectFriendRequest: async (req: Request, res: Response) => {
    const { userId, friendId } = req.body;

    try {
      await Friends.findRequest(Number(friendId), Number(userId));
    } catch (error) {
      if (error instanceof NotFoundError) return res.status(200).json({ message: 'No pending friend request found' });
    }

    const updateStatus = 'rejected';

    await Friends.update(Number(userId), Number(friendId), updateStatus);

    return res.status(204).json({ message: 'Friend request rejected successfully' });
  },
};
