import { Redis } from 'ioredis';
import logger from './logger.ts';

const redis = new Redis();
const DEFAULT_EXPIRATION = 3600;

// utility function to cache data
// function has changed from Promise to async
// need to be test before any use

async function cacheOrGetCacheData(key: string, callback: any) {
  const cacheValue = await redis.get(key).catch((error) => {
    logger.error(error);
    throw new Error(error);
  });
  logger.info('cacheOrGetCacheData is called', cacheValue);

  if (cacheValue) return (JSON.parse(cacheValue));

  logger.info('cache value is empty');

  const data = await callback();

  redis.set(key, JSON.stringify(data), 'EX', DEFAULT_EXPIRATION);

  return data;
}

export default cacheOrGetCacheData;
