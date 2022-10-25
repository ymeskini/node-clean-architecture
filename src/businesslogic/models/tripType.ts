export class TripType {

    constructor(private type: string) {
    }

    determinePrice() {
        return this.type === 'entering' ? 0 : 50
    }
}