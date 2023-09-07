import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response, NextFunction } from 'express';
import validateToken from '../../middleware/validate.token.js';
import createToken from '../../helpers/token/create.access.js';

describe('validate token middleware', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // @ts-ignore
  const next = vi.fn() as NextFunction;
  test('should throw an error if token is not valid', async () => {
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: 'invalid token',
      },
    } as Request;
    validateToken(mockRequest, {} as Response, next);
    expect(next).toBeCalledWith(expect.any(Error));
  });
  test('should call next if token is valid', async () => {
    const token = createToken('8h', { userId: 1 });
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: token,
      },
    } as Request;
    validateToken(mockRequest, {} as Response, next);
    expect(next).toBeCalled();
  });
  test('should have a decoded property in request body', async () => {
    const token = createToken('8h', { userId: 1 });
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: token,
      },
    } as Request;
    validateToken(mockRequest, {} as Response, next);
    expect(mockRequest.body.decoded[0]).toEqual({ userId: 1 });
  });
});
