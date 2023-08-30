import express, { Router } from 'express';
import ratingController from '../controllers/rating.controller.ts';
import factory from '../middleware/factory.controller.ts';
import validateSchema from '../middleware/schemas.validator.ts';
import createRatingSchema from '../schemas/rating/createRating.ts';
import updateRatingSchema from '../schemas/rating/updateRating.ts';
// import getCache from '../middleware/cache.ts';
import canals from '../helpers/canals.ts';

const router: Router = express.Router();

const {
  rate, updateRating,
} = ratingController;

router.route('/user/sport')
  .post(
    validateSchema(createRatingSchema, canals.body),
    factory(rate),
  )
  .patch(
    validateSchema(updateRatingSchema, canals.body),
    factory(updateRating),
  );

export default router;
