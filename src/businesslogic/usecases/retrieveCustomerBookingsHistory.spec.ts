import { RetrieveCustomerBookingsHistory } from './retrieveCustomerBookingsHistory';
import { InMemoryBookingRepository } from '../../adapters/secondary/gateways/fake/inMemoryBookingRepository';
import { BookingModel } from '../models/booking';
import { Position } from '../models/position';

describe('Customer bookings history retrieval', () => {
  let bookingsRepository: InMemoryBookingRepository;
  const customerId = '419e4163-3152-40c0-bcc1-1800fe707083';

  beforeEach(() => {
    bookingsRepository = new InMemoryBookingRepository();
  });

  describe('No existing booking', () => {
    it('should not retrieve any bookings', async () => {
      expect(await retrieveHistory(customerId)).toEqual([]);
    });
  });

  describe('Existing bookings', () => {
    const newBookingId = '7de9f5d9-482b-444a-8846-fac7caec14ee';
    const startPoint = new Position(2, 24);
    const endPoint = new Position(3, 28);
    const availableUberId = '319e4163-3152-40c0-bcc1-1800fe707082';

    it('should not retrieve any bookings when customer id is unknown', async () => {
      const existingBooking = new BookingModel(
        'unknownId',
        newBookingId,
        startPoint,
        endPoint,
        availableUberId,
        50,
      );
      bookingsRepository.feedWithBookings(existingBooking);
      expect(await retrieveHistory(customerId)).toEqual([]);
    });

    it("should retrieve the customer's bookings", async () => {
      const existingBooking = new BookingModel(
        customerId,
        newBookingId,
        startPoint,
        endPoint,
        availableUberId,
        50,
      );
      bookingsRepository.feedWithBookings(existingBooking);
      expect(await retrieveHistory(customerId)).toEqual([existingBooking]);
    });
  });

  const retrieveHistory = (customerId: string) => {
    return new RetrieveCustomerBookingsHistory(bookingsRepository).retrieve(
      customerId,
    );
  };
});
