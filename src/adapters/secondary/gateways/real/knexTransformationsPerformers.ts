import { Knex } from 'knex';
import {
  GenericTransaction,
  TransactionPerformer,
} from '../../../../businesslogic/gateways/transactionPerformer.interface';

export class KnexTransactionsPerformer implements TransactionPerformer {
  private sqlConnection: Knex;

  constructor(sqlConnection: Knex) {
    this.sqlConnection = sqlConnection;
  }

  perform<T>(
    process: (genericTransaction: GenericTransaction) => Promise<T>,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) =>
      this.sqlConnection
        .transaction<T>((trx) => {
          try {
            const returnValuePromise = process(trx);
            returnValuePromise
              .then(trx.commit)
              .then(() => resolve(returnValuePromise))
              .catch((e) => trx.rollback(e).catch((e) => reject(e)));
          } catch (e) {
            trx.rollback(e).catch((e) => reject(e));
          }
        })
        .catch((e) => {
          reject(e);
        }),
    );
  }
}
