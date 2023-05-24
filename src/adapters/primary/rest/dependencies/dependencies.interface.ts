import { BookingRepository } from '../../../../businesslogic/gateways/bookingRepository.interface';
import { UberRepository } from '../../../../businesslogic/gateways/uberRepository';
import { TripTypeScanner } from '../../../../businesslogic/gateways/tripTypeScanner.interface';

export interface Dependencies {
  bookingRepository: BookingRepository;
  uberRepository: UberRepository;
  tripTypeScanner: TripTypeScanner;
}
