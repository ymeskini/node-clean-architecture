import { Position } from '../../../../businesslogic/models/position';
import { TripTypeScanner } from '../../../../businesslogic/gateways/tripTypeScanner.interface';
import { TripType } from '../../../../businesslogic/models/tripType';

export abstract class AbstractTripTypeScanner implements TripTypeScanner {
  protected abstract _startPoint: Position;
  protected abstract _endPoint: Position;

  abstract scan(startPoint: Position, endPoint: Position): Promise<TripType>;

  scanWasCalledWith(startPoint: Position, endPoint: Position) {
    return (
      this._startPoint.compare(startPoint) && this._endPoint.compare(endPoint)
    );
  }
}
