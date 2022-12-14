import {BookingRepository} from "../../../../businesslogic/gateways/bookingRepository.interface";
import * as knex from "knex";
import {Booking} from "../../../../businesslogic/models/booking";
import {GenericTransaction} from "../../../../businesslogic/gateways/transactionPerformer.interface";
import {Transaction} from "knex";
import {Position} from "../../../../businesslogic/models/position";

export class SqlBookingRepository implements BookingRepository {

    private sqlConnection: knex;

    constructor(sqlConnection: knex) {
        this.sqlConnection = sqlConnection;
    }

    byCustomerId(customerId: string): Promise<Booking[]> {
        return new Promise(async (resolve, reject) => {
            const bookingRawResults = await this.sqlConnection('bookings')
                .select()
                .where({customer_id: customerId});
            resolve(bookingRawResults.map(bookingRawResult => {
                return new Booking(
                    bookingRawResult['customer_id'],
                    bookingRawResult['id'],
                    new Position(bookingRawResult['start_lat'], bookingRawResult['start_lon']),
                    new Position(bookingRawResult['end_lat'], bookingRawResult['end_lon']),
                    bookingRawResult['uber_id'],
                    bookingRawResult['price']
                )
            }));
        });
    }

    save(booking: Booking): (trx: GenericTransaction) => Promise<void> {
        return async trx => {
            return new Promise(async (resolve, reject) => {
                this.sqlConnection('bookings')
                    .transacting(trx as Transaction)
                    .insert({
                        id: booking.id,
                        customer_id: booking.customerId,
                        uber_id: booking.uberId,
                        start_lat: booking.startPoint.lat,
                        start_lon: booking.startPoint.lon,
                        end_lat: booking.endPoint.lat,
                        end_lon: booking.endPoint.lon,
                        price: booking.price
                    }).then(() => {
                    resolve();
                });
            });
        }
    }


}