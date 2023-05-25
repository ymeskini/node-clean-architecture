import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  ErrorRequestHandler,
} from 'express';
import { logger } from '../modules/logger';

class ApiError extends Error {
  constructor(public status: number) {
    super();
  }
}

export const catchAsync = <TQuery, TBody, TParams>(
  fn: (
    req: Request<TParams, TBody, any, TQuery>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler<TParams, TBody, any, TQuery> => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message });
  } else {
    logger.error(err.toString());
    res.status(500).json({ error: 'Something went wrong' });
  }
};
