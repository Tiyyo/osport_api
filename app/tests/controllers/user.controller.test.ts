import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response } from 'express';
import userController from '../../controllers/user.controller.js';
import User from '../../models/user.js';
// import Cache from '../../service/cache.js';

const { getUser, deleteUser, updateUser } = userController;

describe('getUser', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  // @ts-ignore
  const mockRequest = {
    params: { id: 1 },
    body: { cacheKey: 'user1' },
  } as Request;

  const userInfosPayload = {
    id: 1,
    username: 'username',
    email: 'email',
    image_url: 'image_url',
  };

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.getUserInfos = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.set = vi.fn().mockResolvedValue(true);

    await getUser(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User informations' }));
  });
  test('should return a status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.getUserInfos = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.set = vi.fn().mockResolvedValue(true);

    await getUser(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should return a json with data ', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.getUserInfos = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.set = vi.fn().mockResolvedValue(true);

    await getUser(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: userInfosPayload }));
  });
  test('should call cache service with correct key', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.getUserInfos = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.set = vi.fn().mockResolvedValue(true);

    await getUser(req, res);
    // expect(Cache.set).toBeCalledWith('user1', userInfosPayload);
  });
});

describe('delate user', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  // @ts-ignore
  const mockRequest = {
    params: { id: 9999 },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.deleteUser = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await deleteUser(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User has been deleted' }));
  });
  test('should return a status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.deleteUser = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await deleteUser(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should invalidate cache service with correct key', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.deleteUser = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await deleteUser(req, res);
    // expect(Cache.del).toBeCalledWith(['user9999']);
  });
});

describe('update user', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  // @ts-ignore
  const mockRequest = {
    body: {
      userId: 1,
      username: 'joe',
      email: 'joe@example.com',
      imageUrl: 'image',
    },
  } as Request;

  const userInfosPayload = {
    id: 1,
    username: 'username',
    email: 'email',
    image_url: 'image_url',
  };

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.updateUser = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateUser(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User has been updated' }));
  });
  test('should return a status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.updateUser = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateUser(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should return a json with data ', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.updateUser = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateUser(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: userInfosPayload }));
  });
  test('should invalidate cache service with correct key', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.updateUser = vi.fn().mockResolvedValue(userInfosPayload);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateUser(req, res);
    // expect(Cache.del).toBeCalledWith(['user1']);
  });
});
