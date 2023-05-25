import { Knex } from 'knex';
import { UberRepository } from '../../../../businesslogic/gateways/uberRepository';

export class SqlUberRepository implements UberRepository {
  private sqlConnection: Knex;

  constructor(sqlConnection: Knex) {
    this.sqlConnection = sqlConnection;
  }

  async availableOne(): Promise<string> {
    const uberRawResult = await this.sqlConnection('ubers').select().first();
    if (!uberRawResult) {
      throw new Error('No available ubers');
    }
    return uberRawResult.id;
  }
}
