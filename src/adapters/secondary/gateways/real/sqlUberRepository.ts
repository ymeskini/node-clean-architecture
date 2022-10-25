import * as knex from "knex";
import {UberRepository} from "../../../../businesslogic/gateways/uberRepository";

export class SqlUberRepository implements UberRepository {

    private sqlConnection: knex;

    constructor(sqlConnection: knex) {
        this.sqlConnection = sqlConnection;
    }

    availableOne(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const uberRawResult = await this.sqlConnection('ubers')
                .select()
                .first();
            resolve(uberRawResult['id']);
        });
    }

}