import express, { Router } from 'express';
import eventController from '../controllers/event.controller.ts';
import factory from '../middleware/factory.controller.ts';
import validateSchema from '../middleware/schemas.validator.ts';
import createEventSchema from '../schemas/event/createEvent.ts';
// import updateEventSchema from '../schemas/event/updateEvent.ts';
// import getCache from '../middleware/cache.ts';
import canals from '../helpers/canals.ts';
import { validateEventSchema } from '../schemas/event/validateEvent.ts';

const router: Router = express.Router();

const {
  createEvent,
  validateEvent,
} = eventController;

router.route('/')
  .post(validateSchema(createEventSchema, canals.body), factory(createEvent));
  // .patch(validateSchema(updateEventSchema, canals.body), factory(update))
  // .get(getCache('events'), factory(getAll));

router.route('/validate')
  .patch(validateSchema(validateEventSchema, canals.body), factory(validateEvent));

router.route('/:id');
  // .get(getCache('event'), factory(getOne))
  // .delete(factory(destroy));

export default router;
