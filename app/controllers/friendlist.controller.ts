import { Request, Response } from 'express';
import Friends from '../models/user_on_friend.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';

export default {
  // get all friends of a user with pending or accepted status
  getPendingRequestSent: async (req: Request, res: Response) => {
    // get the user id from the request
    // get the friends of the user
    // return the friends
    const userId = req.params.id; // this is a string
    const status = 'pending';

    const friends = await Friends.find(Number(userId), status);

    res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },
  getAcceptedFriends: async (req: Request, res: Response) => {
    // get the user id from the request
    // get the friends of the user
    // return the friends
    //  ask frontend for an array of students
    const userId = req.params.id; // this is a string
    const status = 'accepted';

    const friends = await Friends.find(Number(userId), status);

    res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },
  getPendingRequestReceived: async (req: Request, res: Response) => {
    // get the user id from the request
    // return the friends request to accept or reject
    const userId = req.params.id; // this is a string

    const friends = await Friends.findManyRequest(Number(userId));

    res.status(200).json({ message: 'Friends retrieved successfully', data: friends });
  },
  // send a friend request to a user
  sendFriendRequest: async (req: Request, res: Response) => {
    // askerId is the user who sends the request so userId
    // userid
    // userIdToAddFriend
    const data = {
      askerId: Number(req.body.userId),
      askedId: Number(req.body.askedId),
    };

    await Friends.create(data);

    res.status(201).json({ message: 'Friend request sent successfully' });
  },
  // accept a friend request
  acceptFriendRequest: async (req: Request, res: Response) => {
    const { userId, userToAddId } = req.body;

    // before updating the friend we need to check if there is a pending request
    // if there is no pending request we can't accept the friend request

    const isPendingRequestExist = await Friends.findRequest(Number(userId), Number(userToAddId));

    if (!isPendingRequestExist) throw new NotFoundError('No pending friend request found');

    const updateStatus = 'accepted';
    await Friends
      .update(Number(userId), Number(userToAddId), updateStatus);

    res.status(204).json({ message: 'Friend request accepted successfully' });
  },
  // reject a friend request
  rejectFriendRequest: async (req: Request, res: Response) => {
    const { userId, userToAddId } = req.body;

    const isPendingRequestExist = await Friends.findRequest(Number(userId), Number(userToAddId));

    if (!isPendingRequestExist) throw new NotFoundError('No pending friend request found');

    const updateStatus = 'rejected';

    await Friends.update(Number(userId), Number(userToAddId), updateStatus);

    res.status(204).json({ message: 'Friend request rejected successfully' });
  },
};
