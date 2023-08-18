import { Request, Response } from 'express';
import { cacheOrGetCacheData } from '../helpers/cache.data';
import { Redis } from "ioredis"
import logger from '../helpers/logger';

const redis = new Redis()


export default {
    asyncxxx: async (req: Request, res: Response) => { }
}
