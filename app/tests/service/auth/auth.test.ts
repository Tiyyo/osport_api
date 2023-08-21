import { describe, test } from 'vitest';
import { createUser, login } from '../../../service/auth/auth.ts';

describe('register', () => {
  test('should return true', () => {
    expect(createUser({ username: 'john', email: 'john.doe@example.com', password: 'test' })).toBe(true);
  });
});
