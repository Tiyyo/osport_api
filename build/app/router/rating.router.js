import express from 'express';
import ratingController from '../controllers/rating.controller.js';
import factory from '../middleware/factory.controller.js';
import validateSchema from '../middleware/schemas.validator.js';
import createRatingSchema from '../schemas/rating/createRating.js';
import updateRatingSchema from '../schemas/rating/updateRating.js';
// import getCache from '../middleware/cache.js;
import canals from '../helpers/canals.js';
const router = express.Router();
const { rate, updateRating, } = ratingController;
router.route('/user/sport')
    .post(validateSchema(createRatingSchema, canals.body), factory(rate))
    .patch(validateSchema(updateRatingSchema, canals.body), factory(updateRating));
export default router;
