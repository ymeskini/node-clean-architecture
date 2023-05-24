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
      tripTypeScanner = new EnteringTripTypeScanner();
    });

    describe('Successful booking', () => {
      it('should book an uber', async () => {
        await bookAnUber(newBookingId, startPoint, endPoint);
        expectBookings(
          customerId,
          newBookingId,
          startPoint,
          endPoint,
          availableUberId,
          0,
        );
      });
    });
  });

  describe('Customer willing to leave Paris', () => {
    beforeEach(() => {
      tripTypeScanner = new LeavingTripTypeScanner();
    });

    describe('Successful booking', () => {
      it('should book an uber', async () => {
        await bookAnUber(newBookingId, startPoint, endPoint);
        expectBookings(
          customerId,
          newBookingId,
          startPoint,
          endPoint,
          availableUberId,
          50,
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
    customerId: string,
    bookingId: string,
    startPoint: Position,
    endPoint: Position,
    availableUberId: string,
    price: number,
  ) => {
    expect(bookingRepository.bookings()).toEqual([
      new BookingModel(
        customerId,
        bookingId,
        startPoint,
        endPoint,
        availableUberId,
        price,
      ),
    ]);
  };
});
