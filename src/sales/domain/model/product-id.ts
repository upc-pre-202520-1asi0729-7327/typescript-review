/**
 * ProductId Value Object
 * @remarks 
 * This class represents a unique identifier for a product in the sales bounded context.
 * It uses UUIDs to ensure uniqueness across the system.
 * 
 * @example
 * ```typescript
 * const productId = new ProductId();
 * console.log(productId.id); // Outputs a UUID string
 * ```
 */
export class ProductId {
    private readonly _id: string;

    /**
     * Creates a new ProductId instance.
     * If no id is provided, a new UUID will be generated.
     * @param {string} [id] - Optional UUID string to use as the product ID.
     */
    constructor(id?: string) {
        this._id = id ?? crypto.randomUUID();
    }

    /**
     * Gets the string representation of the ProductId.
     * @returns {string} The UUID string of the product ID.
     */
    get id(): string {
        return this._id;
    }

    /**
     * Compares this ProductId with another for equality.
     * @param {ProductId} other - The other ProductId to compare with.
     * @returns {boolean} True if both ProductIds are equal, false otherwise.
     */
    equals(other: ProductId): boolean {
        return this._id === other.id;
    }

    /**
     * Returns the string representation of the ProductId.
     * @returns {string} The UUID string of the product ID.
     */
    toString(): string {
        return this._id;
    }
}