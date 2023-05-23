import { TripTypeScanner } from '../../../../businesslogic/gateways/tripTypeScanner.interface';
import { Position } from '../../../../businesslogic/models/position';
import { TripType } from '../../../../businesslogic/models/tripType';

export class EasyTripTypeScanner implements TripTypeScanner {
  scan(startPoint: Position, _: Position): Promise<TripType> {
    return Promise.resolve(
      new TripType(startPoint.lat < 3 ? 'leaving' : 'entering'),
    );
  }
}
