import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/signup').post();
router.route('/signin').post();
router.route('user/validate').get();
router.route('/logout').post();

export default router;
