import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response, NextFunction } from 'express';
import validateUser from '../../middleware/validate.user.js';
import createToken from '../../helpers/token/create.access.js';

describe('validate user middleware', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  // @ts-ignore
  const next = vi.fn() as NextFunction;

  const token = createToken('8h', { userId: 1 });

  test('should return a status 401 if token is not valid', async () => {
    const mockRequest = {
      body: {},
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.status).toBeCalledWith(401);
  });
  test('should return a status 401 if token is not valid', async () => {
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: 'invalid token',
      },
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.status).toBeCalledWith(401);
  });
  test('should return a json with an error message if token is not valid', async () => {
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: 'invalid token',
      },
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.json).toBeCalledWith({ error: 'Unauthorized user' });
  });
  test('should retrun a json with an if token doesn\'t exist', async () => {
    const mockRequest = {
      body: {},
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.json).toBeCalledWith({ error: 'Unauthorized user' });
  });
  test('should return an error if no userId is provided', async () => {
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: token,
      },
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.json).toBeCalledWith({ error: 'Unauthorized user' });
  });
  test('should return an if userId in token is different from userId in params', async () => {
    // @ts-ignore
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: token,
      },
      params: {
        id: 2,
      },
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.json).toBeCalledWith({ error: 'Unauthorized user' });
  });
  test('should return an json with an error if userId in token is different from userId in body', async () => {
    const mockRequest = {
      body: {
        userId: 2,
      },
      cookies: {
        accessToken: token,
      },
      params: {},
      method: 'PUT',
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.json).toBeCalledWith({ error: 'Unauthorized user' });
  });
  test('should retrun an error if userId in params and method is not GET or DELETE', async () => {
    // @ts-ignore
    const mockRequest = {
      body: {
      },
      cookies: {
        accessToken: token,
      },
      params: {
        id: 2,
      },
      method: 'PUT',
    } as Request;
    const res = mockResponse();
    await validateUser(mockRequest, res, next);
    expect(res.json).toBeCalledWith({ error: 'Unauthorized user' });
  });
  test('should call next if userId in params and method is GET', async () => {
    // @ts-ignore
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: token,
      },
      params: {
        id: 1,
      },
      method: 'GET',
    } as Request;
    await validateUser(mockRequest, mockResponse(), next);
    expect(next).toBeCalled();
  });
  test('should call next if userId in params and method is DELETE', async () => {
    // @ts-ignore
    const mockRequest = {
      body: {},
      cookies: {
        accessToken: token,
      },
      params: {
        id: 1,
      },
      method: 'DELETE',
    } as Request;
    await validateUser(mockRequest, mockResponse(), next);
    expect(next).toBeCalled();
  });
  test('should call next if userId in body and method is PUT', async () => {
    // @ts-ignore
    const mockRequest = {
      body: {
        userId: 1,
      },
      cookies: {
        accessToken: token,
      },
      params: {},
      method: 'PUT',
    } as Request;
    await validateUser(mockRequest, mockResponse(), next);
    expect(next).toBeCalled();
  });
  test('should call next if userId in body and method is PATCH', async () => {
    const mockRequest = {
      body: {
        userId: 1,
      },
      cookies: {
        accessToken: token,
      },
      params: {},
      method: 'PATCH',
    } as Request;
    await validateUser(mockRequest, mockResponse(), next);
    expect(next).toBeCalled();
  });
});
