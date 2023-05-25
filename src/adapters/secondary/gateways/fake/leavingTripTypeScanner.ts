import { Position } from '../../../../businesslogic/models/position';
import { TripType } from '../../../../businesslogic/models/tripType';
import { AbstractTripTypeScanner } from './abstractTripTypeScanner';

export class LeavingTripTypeScanner extends AbstractTripTypeScanner {
  protected _startPoint: Position;
  protected _endPoint: Position;

  constructor(startPoint: Position, endPoint: Position) {
    super();
    this._startPoint = startPoint;
    this._endPoint = endPoint;
  }
  scan(startPoint: Position, endPoint: Position): Promise<TripType> {
    this._startPoint = startPoint;
    this._endPoint = endPoint;
    return Promise.resolve(new TripType('leaving'));
  }
}
