import express, { Router } from 'express';
import messageController from '../controllers/message.controller.ts';
import factory from '../middleware/factory.controller.ts';
import validateSchema from '../middleware/schemas.validator.ts';
import createMessage from '../schemas/message/createMessage.ts';
import updateMessage from '../schemas/message/updateMessage.ts';
import canals from '../helpers/canals.ts';

const router: Router = express.Router();

const {
  getHistoric, create, update, destroyOne, destroyMany,
} = messageController;

// we need to ensure that the data is valid before reaching the controller
// we use the same middleware throughout the app
// canals represent which part of the request we want to validate

router.route('/chat')
  .patch(validateSchema(updateMessage, canals.body), factory(update))
  .post(validateSchema(createMessage, canals.body), factory(create));

router.route('/chat/:id')
  .delete(factory(destroyOne));

router.route('/chat/event/:id')
  .get(factory(getHistoric))
  .delete(factory(destroyMany));

export default router;
