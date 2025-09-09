/**
 * Module for handling currency codes and formatting amounts.
 * 
 * This module defines a `Currency` class that encapsulates a three-letter
 * ISO 4217 currency code and provides methods for formatting amounts
 * according to the specified currency.
 * 
 * Example usage:
 * 
 * ```typescript
 * const usd = new Currency('USD');
 * console.log(usd.formatAmount(1234.56)); // Outputs: $1,234.56
 * ```  
 */


/**
 * Type representing a single uppercase letter (A-Z).
 */
type UppercaseLetter = 
    'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 
    'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 
    'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 
    'V' | 'W' | 'X' | 'Y' | 'Z';

/**
 * Type representing a three-letter ISO 4217 currency code.
 */
export type CurrencyCode = 
    `${UppercaseLetter}${UppercaseLetter}${UppercaseLetter}`;

/**
 * Class representing a currency with a three-letter ISO 4217 code.
 * Provides methods for formatting amounts in the specified currency.
 */
export class Currency {
    private readonly _code: CurrencyCode;

    /**
     * Creates a new Currency instance.
     * @param {CurrencyCode} code - The three-letter ISO 4217 currency code.
     */
    constructor(code: CurrencyCode) {
        this._code = code;
    }

    /**
     * Gets the currency code.
     * @returns {CurrencyCode} The three-letter ISO 4217 currency code.
     */
    public get code(): string { return this._code; }

    /**
     * Formats a given amount according to the currency code.
     * @param {number} amount - The amount to format.
     * @param {string} locale - The locale to use for formatting (default is 'en-US').
     * @returns {string} The formatted amount string.
     */
    public formatAmount(amount: number,  locale: string = 'en-US'): string {
        return amount.toLocaleString(locale, {
            style: 'currency',
            currency: this._code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    /**
     * Returns the string representation of the currency code.
     * @returns {string} The three-letter ISO 4217 currency code.
     */
    public toString(): string {
        return this._code;
    }
        
}