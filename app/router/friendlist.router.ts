import express, { Router } from 'express';
// import factory from '../middleware/factory.controller.ts';
// import validateSchema from '../middleware/schemas.validator.ts';
// import canals from '../helpers/canals.ts';

const router: Router = express.Router();

// we need to ensure that the data is valid before reaching the controller
// we use the same middleware throughout the app
// canals represent which part of the request we want to validate

router.route('/user_friends/:id')
  .get();

router.route('/user_friends/send')
  .post();

router.route('/user_friends/accept')
  .post();

router.route('/user_friends/reject')
  .post();

export default router;
