import { RetrieveCustomerBookingsHistory } from '../../../../businesslogic/usecases/retrieveCustomerBookingsHistory';
import { BookUberCommandHandler } from '../../../../businesslogic/usecases/bookUberCommandHandler';
import { Express } from 'express';
import { Dependencies } from '../dependencies/dependencies.interface';

export const configureBookingController = (
  app: Express,
  dependencies: Dependencies,
) => {
  const {
    bookingRepository,
    uberRepository,
    tripTypeScanner,
    transactionPerformer,
  } = dependencies;

  app.get('/customers/:customerId/bookings', async (req, res) => {
    const bookings = await new RetrieveCustomerBookingsHistory(
      bookingRepository,
    ).retrieve(req.params['customerId']);
    res.json({ data: bookings });
  });

  app.post('/customers/:customerId/bookings/:bookingId', async (req, res) => {
    const { customerId, bookingId } = req.params;
    const { startPoint, endPoint } = req.body;
    await new BookUberCommandHandler(
      bookingRepository,
      uberRepository,
      tripTypeScanner,
      transactionPerformer,
    ).handle({
      customerId,
      bookingId,
      startPoint,
      endPoint,
    });
    res.json({ data: null });
  });
};
