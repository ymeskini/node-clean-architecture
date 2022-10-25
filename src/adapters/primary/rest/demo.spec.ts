import {computeProductPrice, DateProvider} from "./demo";

class DeterministicDateProvider implements DateProvider {

    constructor(private dateNow: Date) {
    }

    now(): Date {
        return this.dateNow;
    }

}

class RealDateProvider implements DateProvider {
    now(): Date {
        return new Date();
    }

}

describe('Compute the right product price', () => {

    let dateProvider;

    describe('It is Christmas', () => {

        beforeEach(() => {
            dateProvider = new DeterministicDateProvider(
                new Date(2020, 11, 25, 0, 0));
        });

        it('should apply a discount on a product', () => {
            expect(computeProductPrice(21, 10, dateProvider))
                .toEqual(18.9);
        });

    });

    describe('It is not Christmas', () => {

        beforeEach(() => {
            dateProvider = new DeterministicDateProvider(
                new Date(2020, 10, 25, 0, 0));
        });

        it('should not apply a discount on a product', () => {
            expect(computeProductPrice(20, 10, dateProvider))
                .toEqual(20);
        });

    });

});