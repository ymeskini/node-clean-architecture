import { Knex } from 'knex';
import { Booking } from '../../../../../businesslogic/models/booking';
import { Uber } from '../../../../../businesslogic/models/uber';

// check https://knexjs.org/guide/#typescript
declare module 'knex/types/tables' {
  // This is same as specifying `knex<Booking>('boookings')`
  interface Tables {
    bookings: Booking;
    ubers: Uber;

    // So, this is like specifying
    //    knex
    //    .insert<{ name: string }>({ name: 'name' })
    //    .into<{ name: string, id: number }>('users')
    bookings_composite: Knex.CompositeTableType<
      // This interface will be used for return type and
      // `where`, `having` etc where full type is required
      Booking,
      // For example, this will require only "name" field when inserting
      // and make created_at and updated_at optional.
      // And "id" can't be provided at all.
      // Defaults to "base" type.
      Booking,
      // This interface is used for "update()" calls.
      // For example, this wil allow updating all fields except "id".
      // "id" will still be usable for `where` clauses so
      //      knex('users_composite')
      //      .update({ name: 'name2' })
      //      .where('id', 10)`
      Partial<Omit<Booking, 'id'>>
    >;

    ubers_composite: Knex.CompositeTableType<
      Uber,
      Uber,
      Partial<Omit<Uber, 'id'>>
    >;
  }
}
