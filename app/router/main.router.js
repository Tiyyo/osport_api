import express from 'express';
import { errorHandler } from '../middleware/error.handler';
const router = express.Router();
// router.use('/xxx', xxxrouter);
// router.use('/yyy', yyyrouter);
router.use((_req, _res, next) => {
    // throw error 404
});
router.use(errorHandler);
export default router;
