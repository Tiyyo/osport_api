import express, { Router } from 'express';
import authController from '../controllers/auth.controllers.ts';
import factory from '../middleware/factory.controller.ts';
import validateToken from '../middleware/validate.token.ts';
import validateSchema from '../middleware/schemas.validator.ts';
import createUserSchema from '../schemas/auth/createUser.ts';
import loginUserSchema from '../schemas/auth/loginUser.ts';
import canals from '../helpers/canals.ts';

const router: Router = express.Router();

// All methods listed in the controller
const {
  register, signin, validate, logout,
} = authController;

// we need to ensure that the data is valid before reaching the controller
// we use the same middleware throughout the app
// canals represent which part of the request we want to validate

router.route('/signup')
  .post(validateSchema(createUserSchema, canals.body), factory(register));

router.route('/signin')
  .post(validateSchema(loginUserSchema, canals.body), factory(signin));

router.route('/user/validate')
  .get(validateToken, factory(validate));

router.route('/logout')
  .post(logout);

export default router;
