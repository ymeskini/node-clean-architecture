import { BookingRepository } from '../gateways/bookingRepository.interface';
import { BookingModel } from '../models/booking';
import { UberRepository } from '../gateways/uberRepository';
import { TripTypeScanner } from '../gateways/tripTypeScanner.interface';
import { BookingUberCommand } from './bookingUberCommand.interface';
import { Position } from '../models/position';

export class BookUberCommandHandler {
  constructor(
    private bookingRepository: BookingRepository,
    private uberRepository: UberRepository,
    private tripTypeScanner: TripTypeScanner,
  ) {}

  async handle(command: BookingUberCommand) {
    const { customerId, bookingId, startPoint, endPoint } = command;
    const startPosition = new Position(startPoint.lat, startPoint.lon);
    const endPosition = new Position(endPoint.lat, endPoint.lon);
    const [tripType, availableUberId] = await Promise.all([
      this.tripTypeScanner.scan(startPosition, endPosition),
      this.uberRepository.availableOne(),
    ]);
    await this.bookingRepository.save(
      new BookingModel(
        customerId,
        bookingId,
        startPosition,
        endPosition,
        availableUberId,
        tripType.determinePrice(),
      ),
    );
  }
}
