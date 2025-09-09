import {Money} from "../../../shared/domain/model/money";

/**
 * Customer aggregate root
 * 
 * This class represents a customer in the CRM bounded context.
 * It contains the customer's id, name, and last order price.
 * 
 * Invariants:
 * - A customer must have a non-empty name.
 * - The last order price can be null if the customer has not placed any orders yet.
 *
 */
export class Customer {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _lastOrderPrice: Money | null;

    /**
     * Get the customer's id
     * @returns {string} The customer's id
     */
    get id(): string {
        return this._id;
    }

    /**
     * Get the customer's name
     * @returns {string} The customer's name
     */
    get name(): string {
        return this._name;
    }

    /**
     * Get the customer's last order price
     * @returns {Money | null} The customer's last order price or null if no orders have been placed
     */
    get lastOrderPrice(): Money | null {
        return this._lastOrderPrice;
    }

    /**
     * Create a new Customer
     * @param {string} name - The customer's name
     * @throws {Error} If the name is empty
     */
    constructor(name: string) {
        if(!name || name.trim().length === 0) 
            throw new Error("Customer name cannot be empty");
        this._id = crypto.randomUUID();
        this._lastOrderPrice = null;
        this._name = name;
    }
}