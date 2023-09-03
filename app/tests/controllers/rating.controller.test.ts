// import {
//   describe, vi, afterEach, test, expect,
// } from 'vitest';
// import { Request, Response } from 'express';
// import ratingController from '../../controllers/rating.controller.js';
// import UserOnSport from '../../models/user_on_sport.js';

// const { rate, updateRating } = ratingController;

// describe('user can rate himself', () => {
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   vi.mock('../../utils/associate');

//   vi.mock('../../models/user_on_sport', async () => {
//     await vi.importActual('../../models/user_on_sport');

//     return { ...UserOnSport, addOwnSport: vi.fn() };
//   });

//   // vi.mock('../../models/user_on_sport', () => {
//   //   const UserOnSporMockt = vi.fn();
//   //   UserOnSport.mockResolvedValue(true);
//   //   return {
//   //     addOwnSport: vi.fn(),
//   //   };
//   // });

//   const mockRequest = {
//     body: {
//       user_id: 1,
//       sport_id: 1,
//       rating: 'beginner',
//     },
//   } as Request;

//   const mockResponse = () => {
//     const res = {} as Response;
//     res.status = vi.fn().mockReturnValue(res);
//     res.json = vi.fn().mockReturnValue(res);
//     return res;
//   };
//   test('should return a json with a message', async () => {
//     const res = mockResponse();
//     const req = mockRequest;

//     await rate(req, res);
//     expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Sport rated' }));
//   });
//   test('should return a status 201', async () => {
//     const res = mockResponse();
//     const req = mockRequest;

//     await rate(req, res);
//     expect(res.status).toBeCalledWith(201);
//   });
// });

// describe('user can rate another user', () => {
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   vi.mock('../../models/user_on_sport', () => {
//     const UserOnSport = vi.fn();
//     UserOnSport.mockResolvedValue(true);
//     return {
//       default: {
//         updateSportRating: vi.fn(),
//       },
//     };
//   });
//   const mockRequest = {
//     body: {
//       user_id: 1,
//       sport_id: 1,
//       rating: 7,
//       rater_id: 2,
//     },
//   } as Request;

//   const mockResponse = () => {
//     const res = {} as Response;
//     res.status = vi.fn().mockReturnValue(res);
//     res.json = vi.fn().mockReturnValue(res);
//     return res;
//   };
//   test('should return a json with a message', async () => {
//     const res = mockResponse();
//     const req = mockRequest;

//     await rate(req, res);
//     expect(res.json).toBeCalledWith(expect.objectContaining({ message: 'Rating updated' }));
//   });
//   test('should return a status 200', async () => {
//     const res = mockResponse();
//     const req = mockRequest;

//     await rate(req, res);
//     expect(res.status).toBeCalledWith(200);
//   });

//   vi.mock('../../models/user_on_sport', () => ({
//     updateSportRating: vi.fn(), // Mock the updateSportRating function
//   }));

//   test('should call updateSportRating', async () => {
//     const res = mockResponse();
//     const req = mockRequest;

//     await updateRating(req, res);

//     // Assertions
//     expect(UserOnSport.updateSportRating).toHaveBeenCalledWith({
//       user_id: 1,
//       sport_id: 2,
//       rating: 4,
//       rater_id: 3,
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Rating updated' });
//   });
// });
