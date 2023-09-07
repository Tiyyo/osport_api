import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response } from 'express';
import authService from '../../service/auth.js';
import authControlller from '../../controllers/auth.controllers.js';
import createToken from '../../helpers/token/create.access.js';
import auth from '../../service/auth.js';

const {
  register,
  signin,
  validate,
  logout,
} = authControlller;

const user = {
  username: 'john',
  email: 'john.doe@gmail.com',
  password: 'test',
};

describe('register', () => {
  afterEach(async () => {
    vi.restoreAllMocks();
  });

  // we need to mock the createUser function
  // we need this line
  vi.mock('../../service/auth');

  const mockCreateUser = vi.spyOn(authService, 'createUser');

  // but not these one no idea why
  // const cb = vi.fn();
  // createUser.mockReturnValue(true);

  const mockRequest = {
    body: user,
  } as Request;

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  test('should call createUser', async () => {
    const res = mockResponse();
    const req = mockRequest;
    authService.createUser = vi.fn().mockReturnValue(true);

    await register(req, res);
    expect(authService.createUser).toBeCalled();
  });

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await register(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User created successfully' }));
  });

  test('should return a status 201', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await register(req, res);
    expect(res.status).toBeCalledWith(201);
  });
});

describe('signin', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const token = createToken('8h', { userId: 1 });

  vi.mock('../../service/auth');
  const cb = vi.fn();
  cb.mockReturnValue({ accessToken: token });

  const mockRequest = {
    body: {
      emailOrUsername: 'john',
      password: 'test',
    },
  } as Request;

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.cookie = vi.fn().mockReturnValue(res);
    return res;
  };
  test.skip('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await signin(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining(
      { message: 'User logged in successfully' },
    ));
  });
});

describe('validate', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  vi.mock('../../service/auth');

  const mockRequest = {
    body: {
      decoded: [{ userId: 1 }],
    },
  } as Request;

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await validate(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User is logged in' }));
  });
  test('should return json with userInfos', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await validate(req, res);

    expect(res.json).toBeCalledWith(expect.objectContaining({ userInfos: { userId: 1 } }));
  });
  test('should return a status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await validate(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});

describe('logout', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.clearCookie = vi.fn().mockReturnValue(res);
    return res;
  };

  const mockRequest = {} as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await logout(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User logged out successfully' }));
  });
  test('should return a status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await logout(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should clear the cookie', async () => {
    const res = mockResponse();
    const req = mockRequest;

    await logout(req, res);
    expect(res.clearCookie).toBeCalledWith('accessToken');
  });
});
