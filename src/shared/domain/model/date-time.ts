/**
 * Value Object representing a Date and Time.
 * Ensures the date is valid and not in the future.
 */
export class DateTime {
    private readonly _date: Date;

    /**
     * Creates a new DateTime instance.
     * @param {Date | string} [value] - The date value. If not provided, defaults to the current date and time.
     * @throws {Error} If the provided date is invalid or in the future.
     */
    constructor(value?: Date | string) {
      const now = new Date(); 
      if (value) {
          const parsedDate = new Date(value);
          if (isNaN(parsedDate.getTime()))
              throw Error(`Invalid date: ${parsedDate}`);
          if (parsedDate > now)
                throw Error(`Date cannot be in the future: ${parsedDate}`);
            this._date = parsedDate;
      } else this._date = now;
    }

    /**
     * Gets the underlying Date object.
     * @returns {Date} The date value.
     */
    public get value(): Date {
        return this._date;
    }

    /**
     * Formats the date to a readable string.
     * @param {string} [locale='en-US'] - The locale for formatting.
     * @returns {string} The formatted date string.
     */
    public format(locale: string = 'en-US'): string {
        return this._date.toLocaleDateString(locale, {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }

    /**
     * Returns the ISO string representation of the date.
     * @returns {string} The ISO string of the date.
     */
    public toString(): string {
        return this._date.toISOString();
    }
}