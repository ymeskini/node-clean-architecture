export interface GenericTransaction {
    commit(): any;
    rollback(): any;
}

export interface TransactionPerformer {
    perform<T>(useCase: (genericTransaction: GenericTransaction) => Promise<T>): Promise<T>;
}