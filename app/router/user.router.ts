import express, { Router } from 'express';
import userController from '../controllers/user.controller.ts';
import factory from '../middleware/factory.controller.ts';
import upload from '../service/upload.ts';
import validateUser from '../middleware/validate.user.ts';
import updateUserSchema from '../schemas/user/updateUser.ts';
import validateSchema from '../middleware/schemas.validator.ts';
import canals from '../helpers/canals.ts';

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
router.route('/:id')
  .get(factory(getUser))
  .delete(factory(deleteUser));

// PATCH -> /user
router.route('/')
  .patch(validateUser, validateSchema(updateUserSchema, canals.body), factory(updateUser));

// PATCH -> /user/image
router.route('/image')
  .patch(upload.single('image'), factory(updateImage));

// GET -> /user/sport
router.route('/sport/:id')
  .get(factory(getSports));

export default router;
