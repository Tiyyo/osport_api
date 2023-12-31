import { vi } from 'vitest';

export default {
  create: vi.fn(),
  findOne: vi.fn(),
  getUserInfos: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
};
