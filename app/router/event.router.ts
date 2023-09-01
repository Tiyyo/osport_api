import express, { Router } from 'express';
import eventController from '../controllers/event.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import createEventSchema from '../schemas/event/createEvent.js';
import { updateEventSchema } from '../schemas/event/updateEvent.js';
// import getCache from '../middleware/cache.ts';
import canals from '../helpers/canals.js';
import { validateEventSchema } from '../schemas/event/validateEvent.js';
import getEventsSchema from '../schemas/event/getEvents.js';

const router = express.Router();

const {
  createEvent,
  validateEvent,
  updateEvent,
  getEvents,
  getEventDetails,
  resultsEvent,
} = eventController;

router.route('/')
  .post(validateSchema(createEventSchema, canals.body), factory(createEvent))
  .patch(validateSchema(updateEventSchema, canals.body), factory(updateEvent));
// .get(getCache('events'), factory(getAll));

router.route('/details/:id')
  .get(validateSchema(getEventsSchema, canals.body), factory(getEventDetails));

router.route('/validate')
  .patch(validateSchema(validateEventSchema, canals.body), factory(validateEvent));

router.route('/results')
  .patch(validateSchema(updateEventSchema, canals.body), factory(resultsEvent));

router.route('/:id')
  .get(validateSchema(getEventsSchema, canals.body), factory(getEvents));
// .get(getCache('event'), factory(getOne))
// .delete(factory(destroy));

export default router;
