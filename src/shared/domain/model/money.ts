import {Currency} from "./currency";

/**
 * Value Object that represents a monetary value with an amount and a currency.
 * @remarks
 * It provides methods for formatting, addition, and multiplication.
 * @throws Error if the amount is negative or if operations are attempted between different currencies.
 * @example
 * const usd = new Currency('USD');
 * const money = new Money(100, usd);
 */
export class Money {
    private readonly _amount: number;
    private readonly _currency: Currency;

    /**
     * Creates a new Money instance.
     * @param {number} amount - The monetary amount, must be non-negative.
     * @param {Currency} currency - The currency of the monetary amount.
     * @throws {Error} If the amount is negative.
     */
    constructor(amount: number, currency: Currency) {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }
        this._amount = amount;
        this._currency = currency;
    }

    /**
     * Gets the monetary amount.
     * @returns {number} The monetary amount.
     */
    get amount(): number {
        return this._amount;
    }

    /**
     * Gets the currency of the monetary amount.
     * @returns {Currency} The currency.
     */
    get currency(): Currency {
        return this._currency;
    }

    /**
     * Formats the monetary amount according to the specified locale.
     * @param {string} [locale='en-US'] - The locale to format the amount.
     * @returns {string} The formatted monetary amount.
     */
    public format = (locale: string = 'en-US'): string =>
        this._currency.formatAmount(this._amount, locale);

    /**
     * Returns a string representation of the Money instance.
     * @returns {string} A string in the format "amount currencyCode".
     */
    public toString(): string {
        return `${this._amount.toFixed(2)} ${this._currency.code}`;
    }

    /**
     * Adds another Money instance to this one.
     * @returns {Money} A new Money instance representing the sum.
     * @param {Money} other - The other Money instance to add.
     * @throws {Error} If the currencies of the two Money instances do not match.
     */
    public add = (other: Money): Money => {
        if (!(this._currency.code === (other.currency.code))) {
            throw new Error("Cannot add amounts with different currencies");
        }
        return new Money(this._amount + other.amount, this._currency);
    }

    /**
     * Multiplies the monetary amount by a factor.
     * @param {number} factor - The factor to multiply by, must be non-negative.
     * @returns {Money} A new Money instance representing the product.
     * @throws {Error} If the factor is negative.
     */
    public multiply = (factor: number): Money => {
        if (factor < 0)
            throw new Error(`Factor cannot be negative: ${factor}`);
        return new Money(this._amount * factor, this._currency);
    }
}