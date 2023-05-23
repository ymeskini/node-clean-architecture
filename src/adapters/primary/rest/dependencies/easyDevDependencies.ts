import { Dependencies } from './dependencies.interface';
import { InMemoryBookingRepository } from '../../../secondary/gateways/fake/inMemoryBookingRepository';
import { InMemoryTransactionsPerformer } from '../../../secondary/gateways/fake/inmemoryTransactionPerformer';
import { EasyTripTypeScanner } from '../../../secondary/gateways/fake/easyTripTypeScanner';
import { InMemoryUberRepository } from '../../../secondary/gateways/fake/inMemoryUberRepository';

export const easyDevDependencies: () => Dependencies = () => {
  const bookingRepository = new InMemoryBookingRepository();
  const uberRepository = new InMemoryUberRepository();
  const transactionPerformer = new InMemoryTransactionsPerformer();
  const tripTypeScanner = new EasyTripTypeScanner();
  uberRepository.feedUbers('3a80bba6-9570-45c9-8488-afad92e24a9a');

  return {
    bookingRepository,
    transactionPerformer,
    tripTypeScanner,
    uberRepository,
  };
};
