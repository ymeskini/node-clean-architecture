import {
  GenericTransaction,
  TransactionPerformer,
} from '../../../../businesslogic/gateways/transactionPerformer.interface';

export class NullTransaction implements GenericTransaction {
  commit: any;
  rollback: any;
}

export class InMemoryTransactionsPerformer implements TransactionPerformer {
  async perform<T>(
    useCase: (genericTransaction: GenericTransaction) => Promise<T>,
  ): Promise<T> {
    const trx = new NullTransaction();
    try {
      const p = await useCase(trx);
      return p;
    } catch (e) {
      trx.rollback();
      throw e;
    }
  }
}
