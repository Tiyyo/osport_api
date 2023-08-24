import { Redis } from 'ioredis';

const redis = new Redis();

const DEFAULT_EXPIRATION = 3600; // 1 hour

const addToCache = (key: string, data: any) => {
  redis.set(key, JSON.stringify(data), 'EX', DEFAULT_EXPIRATION);
};

export default addToCache;
