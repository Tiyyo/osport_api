import { Redis } from 'ioredis';
const redis = new Redis();
export default class Cache {
    static DEFAULT_EXPIRATION = 300; // 5 minutes
    static async get(key) {
        const cacheValue = await redis.get(key);
        return cacheValue ? JSON.parse(cacheValue) : null;
    }
    static async set(key, data, expiration = Cache.DEFAULT_EXPIRATION) {
        redis.set(key, JSON.stringify(data), 'EX', expiration);
    }
    static async del(keys) {
        redis.del(keys);
    }
}
