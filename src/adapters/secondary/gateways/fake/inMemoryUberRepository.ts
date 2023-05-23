import { UberRepository } from '../../../../businesslogic/gateways/uberRepository';

export class InMemoryUberRepository implements UberRepository {
  private _ubers: string[] = [];

  availableOne(): Promise<string | undefined> {
    return Promise.resolve(this._ubers[0]);
  }

  feedUbers(...ubers: string[]) {
    for (const uber of ubers) {
      this._ubers.push(uber);
    }
  }
}
