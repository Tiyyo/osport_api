import {
  vi, describe, afterEach, test, expect,
} from 'vitest';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import authService from '../../service/auth.js';
import UserInputError from '../../helpers/errors/userInput.error.js';
import '../../helpers/env.load.js';
import '../../../build/app/helpers/env.load.js';

const { createUser, login } = authService;

const userPayload = {
  id: 1,
  email: 'john.doe@gmail.com',
  username: 'john',
  password: 'test',
  image_url: null,
  created_at: new Date(),
  updated_at: null,
};

describe('createUser', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('should return true', async () => {
    const mockCreatedUser = {
      email: 'johnny.doe@gmail.com',
      username: 'johnny',
      password: 'test',
    };
    User.create = vi.fn().mockResolvedValue(userPayload);
    expect(await createUser(mockCreatedUser)).toBe(true);
  });
});

describe('Login', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  const mockUser = {
    email: 'john.doe@gmail.com',
    username: 'john',
    password: 'test',
  };

  test('should return an object with an accessToken', async () => {
    const hashedPassword = await bcrypt.hash(mockUser.password, 10);
    User.findOne = vi.fn().mockResolvedValue({
      ...userPayload, password: hashedPassword,
    });
    expect(await login(mockUser))
      .toEqual(expect.objectContaining({ accessToken: expect.any(String) }));
  });
  test('should throw an error if user is not found', async () => {
    User.findOne = vi.fn().mockResolvedValue(null);
    await expect(login(mockUser)).rejects.toThrowError(new UserInputError('Wrong credentials'));
  });
  test('should throw an error if password is wrong', async () => {
    User.findOne = vi.fn().mockResolvedValue(userPayload);
    bcrypt.compare = vi.fn().mockResolvedValue(false);
    await expect(login(mockUser)).rejects.toThrowError(new UserInputError("Password didn't match", 'wrong credentials'));
  });
});
