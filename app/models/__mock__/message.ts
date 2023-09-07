import { vi } from 'vitest';

export default {
  create: vi.fn(),
  findOne: vi.fn(),
  findMany: vi.fn(),
  update: vi.fn(),
  destroyOne: vi.fn(),
  destroyMany: vi.fn(),
};
