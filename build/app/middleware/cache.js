import logger from '../helpers/logger.js';
import Cache from '../service/cache.js';
export default (key) => async (req, res, next) => {
    if (!key)
        next();
    let paramsKey = key;
    if (req.params.id)
        paramsKey = key + req.params.id;
    try {
        const cacheValue = await Cache.get(paramsKey);
        if (req.method === 'GET' && cacheValue) {
            return res.status(200).json(cacheValue);
        }
        req.body.cacheKey = paramsKey;
        return next();
    }
    catch (error) {
        logger.error(error);
        return next();
    }
};
