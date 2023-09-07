import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response } from 'express';
import friendlistController from '../../controllers/friendlist.controller.js';
import Friends from '../../models/user_on_friend.js';
import User from '../../models/user.js';
import NotFoundError from '../../helpers/errors/notFound.error.js';

const {
  getPendingRequestSent,
  getAcceptedFriends,
  getPendingRequestReceived,
  addFriend,
  acceptFriendRequest,
  rejectFriendRequest,
} = friendlistController;

describe('getPendingRequestSent', () => {
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

  const friendsPayload = [
    {
      asker_id: 99,
      status: 'pending',
      created_at: '19/07/2022',
      updated_at: '19/07/2022',
      friend: {
        id: 1,
        email: 'test@test.com',
        username: 'joe',
        avatar: null,
      },

    }, {
      asker_id: 99,
      status: 'pending',
      created_at: '19/07/2022',
      updated_at: '19/07/2022',
      friend: {
        id: 2,
        email: 'test2@test.com',
        username: 'john',
        avatar: null,
      },
    }];
  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.find = vi.fn().mockResolvedValue(friendsPayload);

    await getPendingRequestSent(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Friends retrieved successfully' }));
  });
  test('should return a json with a data and status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.find = vi.fn().mockResolvedValue(friendsPayload);

    await getPendingRequestSent(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: friendsPayload }));
    expect(res.status).toBeCalledWith(200);
  });
  test('should call find method with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.find = vi.fn().mockResolvedValue(friendsPayload);

    await getPendingRequestSent(req, res);
    expect(Friends.find).toBeCalledWith(99, 'pending');
  });
});

describe('getAcceptedFriends', () => {
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

  const friendsPayload = [
    {
      asker_id: 99,
      status: 'accepted',
      created_at: '19/07/2022',
      updated_at: '19/07/2022',
      friend: {
        id: 1,
        email: 'test@test.com',
        username: 'joe',
        avatar: null,
      },

    }, {
      asker_id: 99,
      status: 'accepted',
      created_at: '19/07/2022',
      updated_at: '19/07/2022',
      friend: {
        id: 2,
        email: 'test2@test.com',
        username: 'john',
        avatar: null,
      },
    }];
  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.find = vi.fn().mockResolvedValue(friendsPayload);

    await getAcceptedFriends(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Friends retrieved successfully' }));
  });
  test('should return a json with a data and status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.find = vi.fn().mockResolvedValue(friendsPayload);

    await getAcceptedFriends(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: friendsPayload }));
    expect(res.status).toBeCalledWith(200);
  });
  test('should call find method with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.find = vi.fn().mockResolvedValue(friendsPayload);

    await getAcceptedFriends(req, res);
    expect(Friends.find).toBeCalledWith(99, 'accepted');
  });
});

describe('getPendingRequestReceived', () => {
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

  const friendsPayload = [
    {
      user_id: 99,
      status: 'pending',
      created_at: '19/07/2022',
      updated_at: '19/07/2022',
      friend: {
        id: 1,
        email: 'test@test.com',
        username: 'joe',
        avatar: null,
      },

    }, {
      user_id: 99,
      status: 'pending',
      created_at: '19/07/2022',
      updated_at: '19/07/2022',
      friend: {
        id: 2,
        email: 'test2@test.com',
        username: 'john',
        avatar: null,
      },
    }];
  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findManyRequest = vi.fn().mockResolvedValue(friendsPayload);

    await getPendingRequestReceived(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Friends retrieved successfully' }));
  });
  test('should return a json with a data and status 200', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findManyRequest = vi.fn().mockResolvedValue(friendsPayload);

    await getPendingRequestReceived(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: friendsPayload }));
    expect(res.status).toBeCalledWith(200);
  });
  test('should call findManyRequest method with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findManyRequest = vi.fn().mockResolvedValue(friendsPayload);

    await getPendingRequestReceived(req, res);
    expect(Friends.findManyRequest).toBeCalledWith(99);
  });
});

describe('addFriend', () => {
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
      username: 'john',
      email: 'test@test.com',
      userId: 99,
    },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.findOne = vi.fn().mockResolvedValue({ id: 2 });
    Friends.create = vi.fn().mockResolvedValue(true);

    await addFriend(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Friend added successfully' }));
  });
  test('should return a status 201', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.findOne = vi.fn().mockResolvedValue({ id: 2 });
    Friends.create = vi.fn().mockResolvedValue(true);

    await addFriend(req, res);
    expect(res.status).toBeCalledWith(201);
  });
  test('should create a friend request with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;

    User.findOne = vi.fn().mockResolvedValue({ id: 2 });
    Friends.create = vi.fn().mockResolvedValue(true);

    await addFriend(req, res);
    expect(Friends.create).toBeCalledWith({ asker_id: 99, asked_id: 2 });
  });
  test('should return a json with an error message if friend not found', async () => {
    const res = mockResponse();
    const req = mockRequest;
    User.findOne = vi.fn().mockRejectedValue(new NotFoundError('User not found'));

    await addFriend(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ error: "Friend doesn't exist" }));
  });
});

describe('acceptFriendRequest', () => {
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
      userId: 99,
      friendId: 2,
    },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await acceptFriendRequest(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Friend request accepted successfully' }));
  });
  test('should return a status 204', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await acceptFriendRequest(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test('should call findRequest method with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await acceptFriendRequest(req, res);
    expect(Friends.findRequest).toBeCalledWith({ userId: 99, friendId: 2 });
  });
  test('should call update method with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await acceptFriendRequest(req, res);
    expect(Friends.update).toBeCalledWith(2, 99, 'accepted');
  });
  test('should return a json with an error message if no pending request found', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockRejectedValue(new NotFoundError('No pending request found'));
    Friends.update = vi.fn().mockResolvedValue(true);

    await acceptFriendRequest(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ error: 'No pending friend request found' }));
  });
});

describe('rejectFriendRequest', () => {
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
      userId: 99,
      friendId: 2,
    },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await rejectFriendRequest(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Friend request rejected successfully' }));
  });
  test('should return a status 204', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await rejectFriendRequest(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test('should call findRequest method with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await rejectFriendRequest(req, res);
    expect(Friends.findRequest).toBeCalledWith({ userId: 99, friendId: 2 });
  });
  test('should call update method with correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockResolvedValue(true);
    Friends.update = vi.fn().mockResolvedValue(true);

    await rejectFriendRequest(req, res);
    expect(Friends.update).toBeCalledWith(2, 99, 'rejected');
  });
  test('should return a json with an error message if no pending request found', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Friends.findRequest = vi.fn().mockRejectedValue(new NotFoundError('No pending request found'));
    Friends.update = vi.fn().mockResolvedValue(true);

    await rejectFriendRequest(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ error: 'No pending friend request found' }));
  });
});
