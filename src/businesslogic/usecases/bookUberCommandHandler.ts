import { BookingRepository } from '../gateways/bookingRepository.interface';
import { BookingModel } from '../models/booking';
import { UberRepository } from '../gateways/uberRepository';
import { TripTypeScanner } from '../gateways/tripTypeScanner.interface';
import { BookingUberCommand } from './bookingUberCommand.interface';

export class BookUberCommandHandler {
  constructor(
    private bookingRepository: BookingRepository,
    private uberRepository: UberRepository,
    private tripTypeScanner: TripTypeScanner,
  ) {}

  async handle(command: BookingUberCommand) {
    const { customerId, bookingId, startPoint, endPoint } = command;
    // await this.transactionPerformer.perform(async (trx) => {
    const [tripType, availableUberId] = await Promise.all([
      this.tripTypeScanner.scan(startPoint, endPoint),
      this.uberRepository.availableOne(),
    ]);
    await this.bookingRepository.save(
      new BookingModel(
        customerId,
        bookingId,
        startPoint,
        endPoint,
        availableUberId,
        tripType.determinePrice(),
      ),
    );
  }
}
