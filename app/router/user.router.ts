import express, { Router } from 'express';
import userController from '../controllers/user.controller.ts';
import factory from '../middleware/factory.controller.ts';

const router: Router = express.Router();

// All methods listed in the controller
const {
  getUser,
  updateImage,
  deleteUser,
  updateUser,
  getSports,
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

// GET -> /user/sport
router.route('/sport')
  .get(factory(getSports));

export default router;
