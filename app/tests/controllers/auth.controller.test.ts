import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response } from 'express';
import authService from '../../service/auth.js';
import authControlller from '../../controllers/auth.controllers.js';
import createToken from '../../helpers/token/create.access.js';
import '../../helpers/env.load.js';

const {
  register,
  signin,
  validate,
  logout,
} = authControlller;

const { createUser } = authService;

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
    vi.mock('../../service/auth.js', () => ({ createUser: vi.fn().mockResolvedValue(true) }));

    await register(req, res);
    expect(createUser).toBeCalledWith(user);
  });

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    vi.mock('../../service/auth.js', () => ({ createUser: vi.fn().mockResolvedValue(true) }));

    await register(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User created successfully' }));
  });

  test('should return a status 201', async () => {
    const res = mockResponse();
    const req = mockRequest;
    vi.mock('../../service/auth.js', () => ({ createUser: vi.fn().mockResolvedValue(true) }));

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
      username: 'john',
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
  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    authService.login = vi.fn().mockResolvedValue({ accessToken: token });

    await signin(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining(
      { message: 'User logged in successfully' },
    ));
  });
  test('should return a status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    authService.login = vi.fn().mockResolvedValue({ accessToken: token });

    await signin(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should call authService.login', async () => {
    const res = mockResponse();
    const req = mockRequest;
    authService.login = vi.fn().mockResolvedValue({ accessToken: token });

    await signin(req, res);
    expect(authService.login).toBeCalledWith(mockRequest.body);
  });
  test('should call res.cookie', async () => {
    const res = mockResponse();
    const req = mockRequest;
    authService.login = vi.fn().mockResolvedValue({ accessToken: token });

    await signin(req, res);
    expect(res.cookie).toBeCalledWith('accessToken', token, {
      httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000,
    });
  });
  test('should return a json with an error message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    authService.login = vi.fn().mockRejectedValue(new Error('Bad credentials'));

    await signin(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ error: 'Bad credentials' }));
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
