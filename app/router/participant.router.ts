import express, { Router } from 'express';
import participantController from '../controllers/participant.controller.ts';
import factory from '../middleware/factory.controller.ts';
import validateSchema from '../middleware/schemas.validator.ts';
import canals from '../helpers/canals.ts';
import invitationParticipantSchema from '../schemas/participant/invitationParticipant.ts';
import updateParticipantSchema from '../schemas/participant/updateParticipant.ts';
// import getCache from '../middleware/cache.ts';

const router: Router = express.Router();

const {
  getParticipants, sendInivation, updateStatus,
} = participantController;

router.route('/:id')
  .get(
    // getCache('participant'),
    factory(getParticipants),
  );

router.route('/')
  .post(validateSchema(invitationParticipantSchema, canals.body), factory(sendInivation))
  .patch(validateSchema(updateParticipantSchema, canals.body), factory(updateStatus));

export default router;

