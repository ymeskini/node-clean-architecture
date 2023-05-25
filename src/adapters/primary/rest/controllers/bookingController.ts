import { Express } from 'express';
import { z } from 'zod';

import { RetrieveCustomerBookingsHistory } from '../../../../businesslogic/usecases/retrieveCustomerBookingsHistory';
import { BookUberCommandHandler } from '../../../../businesslogic/usecases/bookUberCommandHandler';
import { Dependencies } from '../dependencies/dependencies.interface';
import { makeTypeSafeHandlerWithAsyncCatch } from '../middleware/makeTypeSafeHandler';
import { positionSchema } from '../../../../businesslogic/models/position';

export const configureBookingController = (
  app: Express,
  dependencies: Dependencies,
) => {
  const { bookingRepository, uberRepository, tripTypeScanner } = dependencies;

  app.get(
    '/customers/:customerId/bookings',
    makeTypeSafeHandlerWithAsyncCatch(
      {
        params: z.object({
          customerId: z.string().uuid(),
        }),
      },
      async (req, res) => {
        const { customerId } = req.params;
        const bookings = await new RetrieveCustomerBookingsHistory(
          bookingRepository,
        ).retrieve(customerId);
        res.json({ data: bookings });
      },
    ),
  );

  app.post(
    '/customers/:customerId/bookings/:bookingId',
    makeTypeSafeHandlerWithAsyncCatch(
      {
        params: z.object({
          customerId: z.string().uuid(),
          bookingId: z.string().uuid(),
        }),
        body: z.object({
          startPoint: positionSchema,
          endPoint: positionSchema,
        }),
      },
      async (req, res) => {
        const { customerId, bookingId } = req.params;
        const { startPoint, endPoint } = req.body;
        await new BookUberCommandHandler(
          bookingRepository,
          uberRepository,
          tripTypeScanner,
        ).handle({
          customerId,
          bookingId,
          startPoint,
          endPoint,
        });
        res.json({ data: null });
      },
    ),
  );
};
