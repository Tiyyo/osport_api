import { Request, Response } from 'express';
import Friends from '../models/user_on_friend.ts';

export default {
  // get all friends of a user with pending or accepted status
  getFriends: async (req: Request, res: Response) => {
    // get the user id from the request
    // get the friends of the user
    // return the friends
    const userId = req.params.id; // this is a string

    const friends = await Friends.getFriends(Number(userId));

    res.status(200).json({ message: 'Friends retrieved successfully', friends });
  },
  // send a friend request to a user
  sendFriendRequest: async (req: Request, res: Response) => {
    // askerId is the user who sends the request so userId
    const data = {
      askerId: req.body.userId,
      askedId: req.body.askedId,
    };

    const friendRequest = await Friends.createMany(data);

    res.status(201).json({ message: 'Friend request sent successfully', friendRequest });
  },
  // accept a friend request
  acceptFriendRequest: async (req: Request, res: Response) => {
    const data = {
      askerId: req.body.userId,
      askedId: req.body.askedId,
      status: 'accepted',
    };

    const updateFriendRequest = await Friends.update(data);

    res.status(204).json({ message: 'Friend request accepted successfully', updateFriendRequest });
  },
  // reject a friend request
  rejectFriendRequest: async (req: Request, res: Response) => {
    const data = {
      askerId: req.body.userId,
      askedId: req.body.askedId,
      status: 'rejected',
    };

    const updateFriendRequest = await Friends.update(data);

    res.status(204).json({ message: 'Friend request rejected successfully', updateFriendRequest });
  },
};
