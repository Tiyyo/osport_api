import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response } from 'express';
import messageController from '../../controllers/message.controller.js';
import Message from '../../models/message.js';
import Cache from '../../service/cache.js';

const {
  getHistoric, create, update, destroyOne, destroyMany,
} = messageController;

describe('getHistoric', () => {
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
    params: { id: 99 },
    body: { cacheKey: 'chat99' },
  } as Request;

  const historicPayload = [
    {
      id: 1,
      event_id: 99,
      message: 'test',
      created_at: '2021-08-02T14:00:00.000Z',
      updated_at: '2021-08-02T14:00:00.000Z',
      user: {
        id: 1,
        username: 'test',
        avatar: null,
      },
    },
    {
      id: 1,
      event_id: 99,
      message: 'hello',
      created_at: '2021-08-03T14:00:00.000Z',
      updated_at: '2021-08-02T14:00:00.000Z',
      user: {
        id: 1,
        username: 'john',
        avatar: null,
      },
    },
  ];

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.findMany = vi.fn().mockResolvedValue(historicPayload);
    Cache.set = vi.fn().mockResolvedValue(true);

    await getHistoric(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Historic retrieved successfully' }));
  });
  test('should return a json with a data and status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.findMany = vi.fn().mockResolvedValue(historicPayload);

    await getHistoric(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: historicPayload }));
    expect(Message.findMany).toBeCalledWith(99);
    expect(res.status).toBeCalledWith(200);
  });
  test('should call cache service with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.findMany = vi.fn().mockResolvedValue(historicPayload);
    Cache.set = vi.fn().mockResolvedValue(true);

    await getHistoric(req, res);
    expect(Cache.set).toBeCalledWith('chat99', historicPayload);
  });
});

describe('create', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  const mockRequest = {
    body: {
      event_id: 99,
      user_id: 1,
      message: 'test',
    },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.create = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await create(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Message created successfully' }));
    expect(Message.create).toBeCalledWith({ event: 99, user: 1, message: 'test' });
  });
  test('should return a status 201', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.create = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await create(req, res);
    expect(res.status).toBeCalledWith(201);
  });
  test('should invalidate cache with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.create = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await create(req, res);
    expect(Cache.del).toBeCalledWith(['chat99']);
  });
});

describe('update', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  const mockRequest = {
    body: {
      id: 1,
      eventId: 99,
      message: 'test',
    },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.update = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await update(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Message updated successfully' }));
    expect(Message.update).toBeCalledWith(1, 'test');
  });
  test('should return a status 204', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.update = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await update(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test('should invalidate cache with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.update = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await update(req, res);
    expect(Cache.del).toBeCalledWith(['chat99']);
  });
});

describe('destroyOne', () => {
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
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.findOne = vi.fn().mockResolvedValue(true);
    Message.destroyOne = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await destroyOne(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Message deleted successfully' }));
    expect(Message.destroyOne).toBeCalledWith(1);
    expect(Message.findOne).toBeCalledWith(1);
  });
  test('should return a status 204', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.findOne = vi.fn().mockResolvedValue(true);
    Message.destroyOne = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await destroyOne(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test('should invalidate cache with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.findOne = vi.fn().mockResolvedValue({ event_id: 17 });
    Message.destroyOne = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await destroyOne(req, res);
    expect(Cache.del).toBeCalledWith(['chat17']);
  });
});

describe('destroyMany', () => {
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
    params: { id: 99 },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.destroyMany = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await destroyMany(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Historic deleted successfully' }));
    expect(Message.destroyMany).toBeCalledWith(99);
  });
  test('should return a status 204', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.destroyMany = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await destroyMany(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test('should invalidate cache with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Message.destroyMany = vi.fn().mockResolvedValue(true);
    Cache.del = vi.fn().mockResolvedValue(true);

    await destroyMany(req, res);
    expect(Cache.del).toBeCalledWith(['chat99']);
  });
});
