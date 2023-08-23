import express, { Router } from 'express';
import userController from '../controllers/user.controller.ts';
import factory from '../middleware/factory.controller.ts';

const router: Router = express.Router();

// Routes to do
// GET + PATCH + DELETE -> /user
// GET -> user/target
// PATCH -> user/image
// PATCH -> user/sport

// All methods listed in the controller
const { getUser, updateImage } = userController;

// GET -> user/target
router.route('/target')
  .get(factory(getUser));

// PATCH -> user/image
router.route('/image')
  .patch(factory(updateImage));

export default router;
