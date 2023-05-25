import { BookUberCommandHandler } from './bookUberCommandHandler';
import { BookingModel } from '../models/booking';
import { Position } from '../models/position';
import { InMemoryUberRepository } from '../../adapters/secondary/gateways/fake/inMemoryUberRepository';
import { InMemoryBookingRepository } from '../../adapters/secondary/gateways/fake/inMemoryBookingRepository';
import { EnteringTripTypeScanner } from '../../adapters/secondary/gateways/fake/enteringTripTypeScanner';
import { LeavingTripTypeScanner } from '../../adapters/secondary/gateways/fake/leavingTripTypeScanner';
import { AbstractTripTypeScanner } from '../../adapters/secondary/gateways/fake/abstractTripTypeScanner';

describe('Uber booking', () => {
  let bookingRepository: InMemoryBookingRepository;
  let uberRepository: InMemoryUberRepository;
  const newBookingId = '7de9f5d9-482b-444a-8846-fac7caec14ee';
  const startPoint = new Position(2, 24);
  const endPoint = new Position(3, 28);
  const availableUberId = '319e4163-3152-40c0-bcc1-1800fe707082';
  const customerId = '666e4163-3152-40c0-bcc1-1800fe707082';
  let tripTypeScanner: AbstractTripTypeScanner;

  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    uberRepository = new InMemoryUberRepository();
    uberRepository.feedUbers('319e4163-3152-40c0-bcc1-1800fe707082');
  });

  describe('Customer willing to enter in Paris', () => {
    beforeEach(() => {
      tripTypeScanner = new EnteringTripTypeScanner(startPoint, endPoint);
    });

    describe('Successful booking', () => {
      it('should book an uber', async () => {
        await bookAnUber(newBookingId, startPoint, endPoint);
        expectBookings(
          newBookingId,
          customerId,
          availableUberId,
          0,
          startPoint,
          endPoint,
        );
      });
    });
  });

  describe('Customer willing to leave Paris', () => {
    beforeEach(() => {
      tripTypeScanner = new LeavingTripTypeScanner(startPoint, endPoint);
    });

    describe('Successful booking', () => {
      it('should book an uber', async () => {
        await bookAnUber(newBookingId, startPoint, endPoint);
        expectBookings(
          newBookingId,
          customerId,
          availableUberId,
          50,
          startPoint,
          endPoint,
        );
        expect(
          tripTypeScanner.scanWasCalledWith(startPoint, endPoint),
        ).toBeTruthy();
      });
    });
  });

  const bookAnUber = (
    bookingId: string,
    startPoint: Position,
    endPoint: Position,
  ) => {
    return new BookUberCommandHandler(
      bookingRepository,
      uberRepository,
      tripTypeScanner,
    ).handle({
      customerId,
      bookingId,
      startPoint,
      endPoint,
    });
  };

  const expectBookings = (
    bookingId: string,
    customerId: string,
    availableUberId: string,
    price: number,
    startPoint: Position,
    endPoint: Position,
  ) => {
    expect(bookingRepository.bookings()).toEqual([
      new BookingModel(
        bookingId,
        customerId,
        availableUberId,
        price,
        startPoint,
        endPoint,
      ),
    ]);
  };
});
