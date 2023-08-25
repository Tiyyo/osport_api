import express, { Router } from 'express';
import participantController from '../controllers/participant.controller.ts';
import factory from '../middleware/factory.controller.ts';
// import validateSchema from '../middleware/schemas.validator.ts';
// import canals from '../helpers/canals.ts';

const router: Router = express.Router();

// All methods listed in the controller
const {
  getParticipants, sendInivation, updateStatus,
} = participantController;

// we need to ensure that the data is valid before reaching the controller
// we use the same middleware throughout the app
// canals represent which part of the request we want to validate

// get all participants for an event
router.route('/:id')
  .get(factory(getParticipants));

// sent invivation to user
router.route('/')
  .post(factory(sendInivation))
  // accept or decline invitation
  .patch(factory(updateStatus));

export default router;
