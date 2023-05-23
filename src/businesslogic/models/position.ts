export class Position {
  constructor(private _lat: number, private _lon: number) {}

  get lat(): number {
    return this._lat;
  }

  get lon(): number {
    return this._lon;
  }
}
