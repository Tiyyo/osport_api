import express, { Router } from 'express';
import userController from '../controllers/user.controller.ts';
import factory from '../middleware/factory.controller.ts';

const router: Router = express.Router();

// All methods listed in the controller
const { getUser } = userController;

router.route('/user')
  .get(factory(getUser));

export default router;
