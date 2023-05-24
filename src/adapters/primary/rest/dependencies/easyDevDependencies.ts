import { Dependencies } from './dependencies.interface';
import { InMemoryBookingRepository } from '../../../secondary/gateways/fake/inMemoryBookingRepository';
import { EasyTripTypeScanner } from '../../../secondary/gateways/fake/easyTripTypeScanner';
import { InMemoryUberRepository } from '../../../secondary/gateways/fake/inMemoryUberRepository';

export const inMemoryDevDependencies = (): Dependencies => {
  const bookingRepository = new InMemoryBookingRepository();
  const uberRepository = new InMemoryUberRepository();
  const tripTypeScanner = new EasyTripTypeScanner();
  uberRepository.feedUbers('3a80bba6-9570-45c9-8488-afad92e24a9a');

  return {
    bookingRepository,
    tripTypeScanner,
    uberRepository,
  };
};
