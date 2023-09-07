import {
  describe, vi, afterEach, test, expect,
} from 'vitest';
import { Request, Response } from 'express';
import ratingController from '../../controllers/rating.controller.js';
import UserOnSport from '../../models/user_on_sport.js';

const {
  rate, updateRating, getStartRating, getSports,
} = ratingController;

describe('rate', () => {
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
      user_id: 1,
      sport_id: 1,
      rating: 'beginner',
    },
  } as Request;

  test('should return a json with a message', async () => {
    const res = mockResponse();
    const req = mockRequest;
    UserOnSport.addOwnSport = vi.fn().mockResolvedValue(true);

    await rate(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Sport rated' }));
  });
  test('should return a status 201', async () => {
    const res = mockResponse();
    const req = mockRequest;
    UserOnSport.addOwnSport = vi.fn().mockResolvedValue(true);

    await rate(req, res);
    expect(res.status).toBeCalledWith(201);
  });
});

describe('updateRating', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  test('should return a json with a message', async () => {
    const mockRequest = {
      body: {
        user_id: 1,
        sport_id: 1,
        rating: 2,
        rater_id: 2,
      },
    } as Request;
    UserOnSport.updateSportRating = vi.fn().mockResolvedValue(true);

    const res = mockResponse();
    const req = mockRequest;
    await updateRating(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Rating updated' }));
  });

  test('should return a status 200', async () => {
    const mockRequest = {
      body: {
        user_id: 1,
        sport_id: 1,
        rating: 2,
        rater_id: 2,
      },
    } as Request;
    UserOnSport.updateSportRating = vi.fn().mockResolvedValue(true);
    const res = mockResponse();
    const req = mockRequest;
    await updateRating(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should throw an error if rater_id === user_id', async () => {
    const mockRequest = {
      body: {
        user_id: 1,
        sport_id: 1,
        rating: 2,
        rater_id: 1,
      },
    } as Request;
    UserOnSport.updateSportRating = vi.fn().mockResolvedValue(true);
    const res = mockResponse();
    const req = mockRequest;
    await expect(updateRating(req, res)).rejects.toThrow('You cannot rate yourself');
  });
});

describe('getStartRating', () => {
  afterEach((() => {
    vi.restoreAllMocks();
  }));

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  // @ts-ignore
  const mockRequest = {
    params: {
      id: '1',
    },
    body: {
      cacheKey: 'test',
    },
  } as Request;

  const ownRatingPayload = [
    {
      name: 'Football',
      gb_rating: 2,
    },
    {
      name: 'BasketBall',
      gb_rating: 2,
    },
  ];

  test('should return a json with a message', async () => {
    UserOnSport.getStartRating = vi.fn().mockResolvedValue(ownRatingPayload);
    const res = mockResponse();
    const req = mockRequest;
    await getStartRating(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'User start rating' }));
  });
  test('should return a json with a data', async () => {
    UserOnSport.getStartRating = vi.fn().mockResolvedValue(ownRatingPayload);
    const res = mockResponse();
    const req = mockRequest;
    await getStartRating(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: ownRatingPayload }));
  });

  test('should return a status 200', async () => {
    UserOnSport.getStartRating = vi.fn().mockResolvedValue(ownRatingPayload);
    const res = mockResponse();
    const req = mockRequest;
    await getStartRating(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});

describe('getSports', () => {
  afterEach((() => {
    vi.restoreAllMocks();
  }));

  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  // @ts-ignore
  const mockRequest = {
    params: {
      id: '1',
    },
    body: {
      cacheKey: 'test',
    },
  } as Request;

  const RatingPayload = [
    {
      name: 'Football',
      gb_rating: 2,
    },
    {
      name: 'BasketBall',
      gb_rating: 7,
    },
  ];
  test('should return a json with a message', async () => {
    UserOnSport.getRatings = vi.fn().mockResolvedValue(RatingPayload);
    const res = mockResponse();
    const req = mockRequest;
    await getSports(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Sport(s) that the user master' }));
  });
  test('should return a json with a data', async () => {
    UserOnSport.getRatings = vi.fn().mockResolvedValue(RatingPayload);
    const res = mockResponse();
    const req = mockRequest;
    await getSports(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ data: RatingPayload }));
  });
  test('should return a status 200', async () => {
    UserOnSport.getRatings = vi.fn().mockResolvedValue(RatingPayload);
    const res = mockResponse();
    const req = mockRequest;
    await getSports(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});
