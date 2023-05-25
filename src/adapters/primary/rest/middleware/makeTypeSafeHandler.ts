import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ParsedQs } from 'qs';
import { z } from 'zod';
import { catchAsync } from './errorHandler';

type ValidationConfig<TQuery, TBody, TParams> = {
  query?: z.Schema<TQuery>;
  body?: z.Schema<TBody>;
  params?: z.Schema<TParams>;
};

const makeTypeSafeHandler = <
  TQuery extends ParsedQs = any,
  TBody extends Record<string, any> = any,
  TParams extends Record<string, any> = any,
>(
  config: ValidationConfig<TQuery, TBody, TParams>,
  handler: RequestHandler<TParams, any, TBody, TQuery>,
): RequestHandler<TParams, any, TBody, TQuery> => {
  return (req, res, next) => {
    const { query, body } = req;

    if (config.params) {
      try {
        config.params.parse(req.params);
      } catch (e) {
        return res.status(400).json({ message: 'Bad Request' });
      }
    }
    if (config.query) {
      try {
        config.query.parse(query);
      } catch (e) {
        return res.status(400).json({ message: 'Bad Request' });
      }
    }
    if (config.body) {
      try {
        config.body.parse(body);
      } catch (e) {
        return res.status(400).send({ message: 'Bad Request' });
      }
    }

    return handler(req, res, next);
  };
};

export const makeTypeSafeHandlerWithAsyncCatch = <
  TQuery extends ParsedQs = any,
  TBody extends Record<string, any> = any,
  TParams extends Record<string, any> = any,
>(
  config: ValidationConfig<TQuery, TBody, TParams>,
  handler: (
    req: Request<TParams, any, TBody, TQuery>,
    res: Response<any>,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler<TParams, any, TBody, TQuery> => {
  return makeTypeSafeHandler(config, catchAsync(handler));
};
