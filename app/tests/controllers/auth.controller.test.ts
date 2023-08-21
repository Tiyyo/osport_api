import { describe, vi } from 'vitest';
import authControlller from '../../controllers/auth.controller';
import { createUser, login } from '../../service/auth/auth';
import { method } from './some-path.js';

vi.mock('../../service/auth/auth/createUser', () => ({
  method: vi.fn(),
}));

const {
  register, login, validate, logout,
} = authControlller;

const user = {
  username: 'john',
  email: 'john.doe@gmail.com',
  password: 'test',
};

describe('register', () => {
  test('should return true', () => {
    expect(register(user)).toBe(true);
  });
});
