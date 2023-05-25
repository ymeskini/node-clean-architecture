import { UberRepository } from '../../../../businesslogic/gateways/uberRepository';

export class InMemoryUberRepository implements UberRepository {
  private _ubers: string[] = [];

  availableOne(): Promise<string> {
    const uber = this._ubers[0];
    if (!uber) {
      return Promise.reject(new Error('No available ubers'));
    }
    return Promise.resolve(uber);
  }

  feedUbers(...ubers: string[]) {
    for (const uber of ubers) {
      this._ubers.push(uber);
    }
  }
}
