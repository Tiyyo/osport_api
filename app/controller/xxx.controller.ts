import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { cacheOrGetCacheData } from '../helpers/cache.data';
import logger from '../helpers/logger';

const redis = new Redis();

export default {
  async getOne(req: Request, res: Response) { },
};
