import express, { Router } from 'express';
import friendlist from '../controllers/friendlist.controller.ts';
import factory from '../middleware/factory.controller.ts';
// import validateSchema from '../middleware/schemas.validator.ts';
// import canals from '../helpers/canals.ts';

const router: Router = express.Router();

const {
  getPendingRequestSent,
  getPendingRequestReceived,
  getAcceptedFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} = friendlist;

// we need to ensure that the data is valid before reaching the controller
// we use the same middleware throughout the app
// canals represent which part of the request we want to validate

// TODO add validation
router.route('/sent/:id')
  .get(factory(getPendingRequestSent));

router.route('/accepted/:id')
  .get(factory(getAcceptedFriends));

router.route('/pending/:id')
  .get(factory(getPendingRequestReceived));

router.route('/send')
  .post(factory(sendFriendRequest));

router.route('/accept')
  .post(factory(acceptFriendRequest));

router.route('/reject')
  .post(factory(rejectFriendRequest));

export default router;
