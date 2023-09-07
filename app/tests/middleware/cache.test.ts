import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response, NextFunction } from 'express';
import cacheFactory from '../../middleware/cache.js';
import Cache from '../../service/cache.js';

describe('cache middleware', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockRequest = {
    params: {},
    method: 'GET',
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  // @ts-ignore
  const next = vi.fn() as NextFunction;
  test.skip('should call next if no key is provided', async () => {
    await cacheFactory('')(mockRequest as Request, mockResponse(), next);
    expect(next).toBeCalled();
  });
  test.skip('should call cache service with key if no params id', async () => {
    const mockRequest2 = {
      params: {},
      method: 'GET',
    };
    Cache.get = vi.fn().mockResolvedValue(true);
    await cacheFactory('key')(mockRequest2 as Request, mockResponse(), next);
    expect(Cache.get).toBeCalledWith('key');
  });
  test.skip('should call cache service with key + params id if params id exist', async () => {
    const mockRequest3 = {
      params: { id: 1 },
      method: 'GET',
    };
    Cache.get = vi.fn().mockResolvedValue(true);
    // @ts-ignore
    await cacheFactory('key')(mockRequest3 as Request, mockResponse(), next);
    expect(Cache.get).toBeCalledWith('key1');
  });
  test.skip('should call next if method is not GET', async () => {
    const mockRequest4 = {
      params: { id: 1 },
      method: 'POST',
    };
    Cache.get = vi.fn().mockResolvedValue(true);
    // @ts-ignore
    await cacheFactory('key')(mockRequest4 as Request, mockResponse(), next);
    expect(next).toBeCalled();
  });
  test.skip('should call next if cache service throw an error', async () => {
    const mockRequest5 = {
      params: { id: 1 },
      method: 'GET',
    };
    Cache.get = vi.fn().mockRejectedValue(new Error('error'));
    // @ts-ignore
    await cacheFactory('key')(mockRequest5 as Request, mockResponse(), next);
    expect(next).toBeCalled();
  });
  test.skip('should call res.status with 200 if cache value exist', async () => {
    const mockRequest6 = {
      params: { id: 1 },
      method: 'GET',
    };
    const cachePayload = [{ userId: 1 }, { userId: 2 }];
    Cache.get = vi.fn().mockResolvedValue(cachePayload);
    const res = mockResponse();
    // @ts-ignore
    await cacheFactory('key')(mockRequest6 as Request, res, next);
    expect(res.status).toBeCalledWith(200);
  });
  test.skip('should call res.json with cache value if cache value exist', async () => {
    const mockRequest7 = {
      params: { id: 1 },
      method: 'GET',
    };
    const cachePayload = [{ userId: 1 }, { userId: 2 }];
    Cache.get = vi.fn().mockResolvedValue(cachePayload);
    const res = mockResponse();
    // @ts-ignore
    await cacheFactory('key')(mockRequest7 as Request, res, next);
    expect(res.json).toBeCalledWith({ message: 'cached data', data: cachePayload });
  });
});
