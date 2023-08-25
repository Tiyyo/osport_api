import express, { Router } from 'express';
import friendlist from '../controllers/friendlist.controller.ts';
import factory from '../middleware/factory.controller.ts';
import validateSchema from '../middleware/schemas.validator.ts';
import requestSchema from '../schemas/friendship/friendRequest.ts';
import canals from '../helpers/canals.ts';

const router: Router = express.Router();

const {
  getPendingRequestSent,
  getPendingRequestReceived,
  getAcceptedFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} = friendlist;

router.route('/sent/:id')
  .get(factory(getPendingRequestSent));

router.route('/accepted/:id')
  .get(factory(getAcceptedFriends));

router.route('/pending/:id')
  .get(factory(getPendingRequestReceived));

router.route('/send')
  .post(validateSchema(requestSchema, canals.body), factory(sendFriendRequest));

router.route('/accept')
  .patch(validateSchema(requestSchema, canals.body), factory(acceptFriendRequest));

router.route('/reject')
  .patch(validateSchema(requestSchema, canals.body), factory(rejectFriendRequest));

export default router;
