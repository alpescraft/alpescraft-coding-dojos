export class ShoppingCart {
    prices:number[] = [];

    add = (price:number, ...otherPrices: number[]) => {
        this.prices.push(price);
        this.prices.push(...otherPrices);
    };

    calculateTotalPrice = () => {
        return this.prices.reduce((acc, val) => acc + val, 0);
    };

    numberOfProducts = () => this.prices.length;

    hasDiscount = () => {
        return this.prices.some((val) => val > 100);
    };
}
