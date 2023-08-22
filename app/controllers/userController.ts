import { Request, Response } from 'express';
import prisma from '../helpers/db.client.ts';

const clubController = {
  // Create a new user profile
  async createUserProfile(req: Request, res: Response) {
    try {
      const { username, email } = req.body;

      const userProfile = await prisma.user.create({
        data: {
          username,
          email,
        },
      });

      res.status(201).json(userProfile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user profile' });
    }
  },
};

export default clubController;
