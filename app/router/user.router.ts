import express, { Router } from 'express';
import userController from '../controllers/user.controller.js';
import factory from '../middleware/factory.controller.js';
import upload from '../service/upload.js';
import validateUser from '../middleware/validate.user.js';
import updateUserSchema from '../schemas/user/updateUser.js';
import validateSchema from '../middleware/schemas.validator.js';
import canals from '../helpers/canals.js';

const router: Router = express.Router();

// All methods listed in the controller
const {
  getUser,
  updateImage,
  deleteUser,
  updateUser,
} = userController;

// GET -> /user
router.route('/:id')
  .get(factory(getUser))
  .delete(validateUser, factory(deleteUser));

// PATCH -> /user
router.route('/')
  .patch(validateUser, validateSchema(updateUserSchema, canals.body), factory(updateUser));

// PATCH -> /user/image
router.route('/image')
  .patch(upload.single('image'), factory(updateImage));

export default router;
