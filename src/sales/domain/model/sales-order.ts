import {SalesOrderItem} from "./sales-order-item";
import {DateTime} from "../../../shared/domain/model/date-time";
import {Currency} from "../../../shared/domain/model/currency";
import {Money} from "../../../shared/domain/model/money";
import {ProductId} from "./product-id";

/**
 * SalesOrder represents a customer's order in the sales bounded context.
 * It includes details such as the customer ID, order items, order date,
 * currency, and the current state of the order.
 * 
 * The SalesOrder class provides methods to add items, calculate the total amount,
 * and manage the order state (e.g., confirm, ship, cancel).
 */


/**
 * SalesOrderState defines the possible states of a sales order.
 * - 'PENDING': The order has been created but not yet confirmed.
 * - 'CONFIRMED': The order has been confirmed and is ready for processing.
 * - 'SHIPPED': The order has been shipped to the customer.
 * - 'CANCELLED': The order has been cancelled and will not be processed.
 */
export type SalesOrderState = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'CANCELLED';

/**
 * SalesOrder aggregate root encapsulates the properties and behaviors of a sales order.
 * It includes methods to manage order items, calculate totals, and change the order state.
 * 
 */
export class SalesOrder {
    private readonly _customerId: string;
    private readonly _id: string;
    private readonly _items: SalesOrderItem[];
    private readonly _orderedAt: DateTime;
    private readonly _currency: Currency;
    private _state: SalesOrderState;

    /**
     * Creates a new SalesOrder instance.
     * 
     * @remarks
     * The constructor initializes a new sales order with the provided customer ID, currency, and optional order date.
     * If the order date is not provided, it defaults to the current date and time.
     * The order state is initialized to 'PENDING'.
     * @param {string} customerId - The ID of the customer placing the order.
     * @param {Currency} currency - The currency for the order.
     * @param {Date | string} [orderedAt] - The date and time when the order was placed. Defaults to the current date and time if not provided.
     * @throws {Error} If the customerId is not provided or is an empty string.
     */
    constructor(customerId: string,  currency: Currency, orderedAt?: Date | string ) {
        if(!customerId || customerId.trim().length === 0) {
            throw new Error('Customer ID is required');
        }
        this._customerId = customerId;
        this._id = crypto.randomUUID();
        this._items = [];
        this._orderedAt = new DateTime(orderedAt);
        this._currency = currency;
        this._state = 'PENDING';
    }

    /**
     * Determines if items can be added to the order based on its current state.
     * Items can only be added if the order is in 'PENDING' or 'CONFIRMED' state.
     * 
     * @returns {boolean} True if items can be added, false otherwise.  
     * @private
     */
    private canAddItems(): boolean {
        return this._state !== 'CANCELLED' && this._state !== 'SHIPPED';
    }

    /**
     * Gets the customer ID associated with the sales order.
     * @returns {string} The customer ID.
     */
    get customerId(): string {
        return this._customerId;
    }

    /**
     * Gets the unique identifier of the sales order.
     * @returns {string} The sales order ID.
     */
    get id(): string {
        return this._id;
    }

    /**
     * Gets the list of items in the sales order.
     * @returns {SalesOrderItem[]} An array of SalesOrderItem objects.
     */
    get items(): SalesOrderItem[] {
        return this._items;
    }

    /**
     * Gets the date and time when the order was placed.
     * @returns {DateTime} The order date and time.
     */
    get orderedAt(): DateTime {
        return this._orderedAt;
    }

    /**
     * Gets the currency used for the sales order.
     * @returns {Currency} The currency of the order.
     */
    get currency(): Currency {
        return this._currency;
    }

    /**
     * Gets the current state of the sales order.
     * @returns {SalesOrderState} The current state of the order.
     */
    get state(): SalesOrderState {
        return this._state;
    }

    /**
     * Adds an item to the sales order.
     * 
     * @remarks
     * This method allows adding a new item to the sales order. It checks if the order is in a state that allows adding items.
     * If the order is 'CANCELLED' or 'SHIPPED', an error is thrown. The method also validates the product ID, quantity, and unit price.
     * @param {ProductId} productId - The ID of the product to add to the order.
     * @param {number} quantity - The quantity of the product to add. Must be greater than zero.
     * @param {number} unitPriceAmount - The unit price of the product. Must be greater than zero.
     * @throws {Error} If the order state does not allow adding items, or if the productId, quantity, or unitPriceAmount are invalid.
     */
    addItem(productId: ProductId, quantity: number, unitPriceAmount: number): void {
        if(!this.canAddItems()) {
            throw new Error(`Cannot add items to a ${this._state} order`);
        }
        if (!productId || productId.id.trim().length === 0) {
            throw new Error('Product ID is required');
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        if (unitPriceAmount <= 0) {
            throw new Error('Unit price must be greater than zero');
        }
        const unitPrice = new Money(unitPriceAmount, this._currency);
        const item = new SalesOrderItem(this._id, productId, quantity, unitPrice);
        this._items.push(item);
    }

    /**
     * Calculates the total amount of the sales order by summing the total of each item.
     * 
     * @remarks
     * This method iterates through all items in the order, calculates the total for each item,
     * and sums them up to get the overall total amount of the order. The total is returned as a Money object
     * in the order's currency.
     * @returns {Money} The total amount of the sales order.
     */
    calculateTotalAmount(): Money {
        return this._items.reduce((total, item) =>
            total.add(item.calculateItemTotal()), new Money(0, this._currency));
    }

    /**
     * Confirms the sales order, changing its state from 'PENDING' to 'CONFIRMED'.
     * @throws {Error} If the order is not in 'PENDING' state.
     */
    confirm(): void {
        if (this._state === 'PENDING')
            this._state = 'CONFIRMED';
        else
            throw new Error(`Cannot confirm an order in ${this._state} state`);
    }

    /**
     * Ships the sales order, changing its state from 'CONFIRMED' to 'SHIPPED'.
     * @throws {Error} If the order is not in 'CONFIRMED' state.
     */
    ship(): void {
        if (this._state === 'CONFIRMED')
            this._state = 'SHIPPED';
        else
            throw new Error(`Cannot ship an order in ${this._state} state`);
    }

    /**
     * Cancels the sales order, changing its state to 'CANCELLED'.
     * The order can be cancelled if it is in 'PENDING' or 'CONFIRMED' state.
     * @throws {Error} If the order is in 'SHIPPED' or 'CANCELLED' state.
     */
    cancel(): void {
        if (this._state === 'PENDING' || this._state === 'CONFIRMED')
            this._state = 'CANCELLED';
        else
            throw new Error(`Cannot cancel an order in ${this._state} state`);
    }
    
}