import express, { Router } from 'express';
import authController from '../controllers/auth.controllers.ts';
import factory from '../middleware/factory.controller.ts';
import validateToken from '../middleware/validate.token.ts';

const router: Router = express.Router();

// All methods listed in the controller
const {
  register, signin, validate, logout,
} = authController;

// TODO add validation schema middleware
// we need to ensure that the data is valid before reaching the controller
// we use the same middleware throughout the app

router.route('/signup')
  .post(factory(register));

router.route('/signin')
  .post(factory(signin));

router.route('/user/validate')
  .get(validateToken, factory(validate));

router.route('/logout')
  .post(logout);

export default router;
