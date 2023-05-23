import { BookingRepository } from '../../../../businesslogic/gateways/bookingRepository.interface';
import { UberRepository } from '../../../../businesslogic/gateways/uberRepository';
import { TransactionPerformer } from '../../../../businesslogic/gateways/transactionPerformer.interface';
import { TripTypeScanner } from '../../../../businesslogic/gateways/tripTypeScanner.interface';

export interface Dependencies {
  bookingRepository: BookingRepository;
  uberRepository: UberRepository;
  transactionPerformer: TransactionPerformer;
  tripTypeScanner: TripTypeScanner;
}
