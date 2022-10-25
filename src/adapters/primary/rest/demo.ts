export interface DateProvider {
    now(): Date;
}

export const computeProductPrice = (price: number, discount: number,
                                    dateProvider: DateProvider) => {
    if (isChristmas(dateProvider))
        return applyDiscount(price, discount);
    return price;
};

const applyDiscount = (price: number, discount: number) => {
    return price - (price * discount / 100);
};

function isChristmas(dateProvider: DateProvider) {
    return dateProvider.now().getMonth() === 11;
}