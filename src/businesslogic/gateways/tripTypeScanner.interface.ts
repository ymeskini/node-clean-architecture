import {Position} from "../models/position";
import {TripType} from "../models/tripType";

export interface TripTypeScanner {
    scan(startPoint: Position, endPoint: Position): Promise<TripType>;
}