import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response } from 'express';
import participantController from '../../controllers/participant.controller.js';
import UserOnEvent from '../../models/user_on_event.js';
import Event from '../../models/event.js';
import { generateBalancedTeam } from '../../service/generateTeam.js';
import prisma from '../../helpers/db.client.js';
import Cache from '../../service/cache.js';

const { getParticipants, sendInvitation, updateStatus } = participantController;

describe('getParticipants', () => {
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
    body: { cacheKey: 'participant99' },
  } as Request;

  const participantsPayload = [
    {
      event_id: 99,
      status: 1,
      team: null,
      user: {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        avatar: null,
      },
    },
    {
      event_id: 99,
      status: 1,
      team: null,
      user: {
        id: 2,
        username: 'test2',
        email: 'test2@test.com',
        avatar: null,
      },
    },
    {
      event_id: 99,
      status: 1,
      team: null,
      user: {
        id: 3,
        username: 'test3',
        email: 'test3@test.com',
        avatar: null,
      },
    },
    {
      event_id: 99,
      status: 1,
      team: null,
      user: {
        id: 4,
        username: 'test4',
        email: 'test4@test.com',
        avatar: null,
      },
    },
  ];

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    UserOnEvent.find = vi.fn().mockResolvedValue(participantsPayload);

    await getParticipants(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Participant retrieved succesfully' }));
  });
  test('should return a json with a data', async () => {
    const res = mockResponse();
    const req = mockRequest;
    UserOnEvent.find = vi.fn().mockResolvedValue(participantsPayload);

    await getParticipants(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: participantsPayload }));
  });
  test('should return a status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    UserOnEvent.find = vi.fn().mockResolvedValue(participantsPayload);

    await getParticipants(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should call Cache.set with correct key', async () => {
    const res = mockResponse();
    const req = mockRequest;
    UserOnEvent.find = vi.fn().mockResolvedValue(participantsPayload);

    await getParticipants(req, res);
    expect(Cache.set).toBeCalledWith('participant99', participantsPayload);
  });
});

describe('sendInvitation', () => {
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
      eventId: 99,
      ids: [1, 2, 3],
    },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;

    UserOnEvent.createMany = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await sendInvitation(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Invitation sent' }));
  });
  test('should return a status 201', async () => {
    const res = mockResponse();
    const req = mockRequest;

    UserOnEvent.createMany = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await sendInvitation(req, res);
    expect(res.status).toBeCalledWith(201);
  });
  test('should invalid cache with correct key', async () => {
    const res = mockResponse();
    const req = mockRequest;

    UserOnEvent.createMany = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await sendInvitation(req, res);
    expect(Cache.del).toBeCalledWith(['participant99']);
  });
});

describe('updateStatus', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  test('should return a status 204 if status is rejected', async () => {
    const mockRequest = {
      body: {
        eventId: 99,
        userId: 1,
        status: 'rejected',
      },
    } as Request;

    const res = mockResponse();
    const req = mockRequest;
    UserOnEvent.update = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateStatus(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test('should return an object with a message if status is rejected', async () => {
    const mockRequest = {
      body: {
        eventId: 99,
        userId: 1,
        status: 'rejected',
      },
    } as Request;

    const res = mockResponse();
    const req = mockRequest;
    UserOnEvent.update = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateStatus(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'status updated' }));
  });
  test('should throw an error if event is full', async () => {
    const mockRequest = {
      body: {
        eventId: 99,
        userId: 1,
        status: 'accepted',
      },
    } as Request;

    const res = mockResponse();
    const req = mockRequest;

    UserOnEvent.findConfirmed = vi.fn().mockResolvedValue(4);
    Event.findOne = vi.fn().mockResolvedValue({ nb_max_participant: 4 });
    // Cache.del = vi.fn().mockResolvedValue(true);

    await expect(updateStatus(req, res)).rejects.toThrow('Event is full');
  });
  test('should generate team if it is the last participant before full event', async () => {
    const mockRequest = {
      body: {
        eventId: 99,
        userId: 1,
        status: 'accepted',
      },
    } as Request;

    const res = mockResponse();
    const req = mockRequest;

    UserOnEvent.findConfirmed = vi.fn().mockResolvedValue(3);
    Event.findOne = vi.fn().mockResolvedValue({ nb_max_participant: 4 });
    vi.mock('./../../service/generateTeam.js', () => ({ generateBalancedTeam: vi.fn().mockResolvedValue(true) }));
    prisma.event.update = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateStatus(req, res);
    expect(generateBalancedTeam).toBeCalledWith(99);
    expect(prisma.event.update).toBeCalledWith({
      where: {
        id: 99,
      },
      data: {
        status: 'closed',
      },
    });
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'status updated' }));
  });
  test('should invalidate event and participant cache', async () => {
    const mockRequest = {
      body: {
        eventId: 99,
        userId: 1,
        status: 'accepted',
      },
    } as Request;

    const res = mockResponse();
    const req = mockRequest;

    UserOnEvent.findConfirmed = vi.fn().mockResolvedValue(3);
    Event.findOne = vi.fn().mockResolvedValue({ nb_max_participant: 4 });
    vi.mock('./../../service/generateTeam.js', () => ({ generateBalancedTeam: vi.fn().mockResolvedValue(true) }));
    prisma.event.update = vi.fn().mockResolvedValue(true);
    // Cache.del = vi.fn().mockResolvedValue(true);

    await updateStatus(req, res);
    expect(generateBalancedTeam).toBeCalledWith(99);
    expect(prisma.event.update).toBeCalledWith({
      where: {
        id: 99,
      },
      data: {
        status: 'closed',
      },
    });
    expect(Cache.del).toBeCalledWith(['participant99', 'event99']);
  });
});
