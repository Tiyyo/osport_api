import { NextFunction, Request, Response } from 'express';
import type { Controller } from '../@types/index.d.ts';

// factory design pattern
// he gets all controllers errors and pass them to the error handler middleware

export default (controller: Controller) => (
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);
