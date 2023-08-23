import express, { Router } from 'express';
import userController from '../controllers/user.controller.ts';
import factory from '../middleware/factory.controller.ts';

const router: Router = express.Router();

// Routes to do
// GET + PATCH + DELETE -> /user
// PATCH -> user/image
// PATCH -> user/sport

// All methods listed in the controller
const {
  getUser,
  updateImage,
  deleteUser,
  updateUser,
} = userController;

// GET -> /user
router.route('/')
  .get(factory(getUser));

// PATCH -> /user
router.route('/')
  .patch(factory(updateUser));

// DELETE -> /user
router.route('/')
  .delete(factory(deleteUser));

// PATCH -> /user/image
router.route('/image')
  .patch(factory(updateImage));

export default router;
