import {Position} from "../../../../businesslogic/models/position";
import {TripType} from "../../../../businesslogic/models/tripType";
import {AbstractTripTypeScanner} from "./abstractTripTypeScanner";

export class EnteringTripTypeScanner extends AbstractTripTypeScanner {

    scan(startPoint: Position, endPoint: Position): Promise<TripType> {
        this._startPoint = startPoint;
        this._endPoint = endPoint;
        return Promise.resolve(new TripType('entering'));
    }
}