import knex from 'knex';
import { UberRepository } from '../../../../businesslogic/gateways/uberRepository';

export class SqlUberRepository implements UberRepository {
  private sqlConnection: knex;

  constructor(sqlConnection: knex) {
    this.sqlConnection = sqlConnection;
  }

  async availableOne(): Promise<string> {
    const uberRawResult = await this.sqlConnection('ubers').select().first();
    return uberRawResult['id'];
  }
}
