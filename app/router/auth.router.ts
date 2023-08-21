import express, { Router } from 'express';
import authController from '../controllers/auth.controllers.ts';
import factory from '../middleware/factory.controller.ts';
import validateToken from '../middleware/validate.token.ts';

const router: Router = express.Router();

const {
	register, signin, validate, logout,
} = authController;

// TODO add validation middleware

router.route('/signup')
	.post(factory(register));

router.route('/signin')
	.post(factory(signin));

router.route('user/validate')
	.get(validateToken, factory(validate));

router.route('/logout')
	.post(logout);

export default router;
