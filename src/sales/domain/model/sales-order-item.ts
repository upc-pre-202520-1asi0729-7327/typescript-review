import {ProductId} from "./product-id";
import {Money} from "../../../shared/domain/model/money";

/**
 * SalesOrderItem represents an item in a sales order aggregate.
 * Attributes:
 * - orderId: Identifier for the sales order.
 * - itemId: Unique identifier for the sales order item.
 * - productId: Identifier for the product being ordered.
 * - quantity: Number of units of the product ordered.
 * - unitPrice: Price per unit of the product.
 * 
 * Methods:
 * - calculateItemTotal(): Calculates the total price for this item (unitPrice * quantity).
 * 
 * Invariants:
 * - quantity must be greater than zero.
 */
export class SalesOrderItem {
    private readonly _orderId: string;
    private readonly _itemId: string;
    private readonly _productId: ProductId;
    private readonly _quantity: number;
    private readonly _unitPrice: Money;

    /**
     * Constructor for SalesOrderItem.
     * Enforces the invariant that quantity must be greater than zero.
     * @param {string} orderId - Identifier for the sales order.
     * @param {ProductId} productId - Identifier for the product being ordered.
     * @param {number} quantity - Number of units of the product ordered.
     * @param {Money} unitPrice - Price per unit of the product.
     * @throws {Error} If quantity is less than or equal to zero.
     */
    constructor(orderId: string, productId: ProductId, quantity: number, unitPrice: Money) {
        if (quantity <= 0)
            throw new Error("Quantity must be greater than zero");
        this._orderId = orderId;
        this._itemId = crypto.randomUUID();
        this._productId = productId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
    }

    /**
     * Get orderId
     * @returns {string} orderId - Identifier for the sales order.
     */
    get orderId(): string {
        return this._orderId;
    }

    /**
     * Get itemId
     * @returns {string} itemId - Unique identifier for the sales order item.
     */
    get itemId(): string {
        return this._itemId;
    }

    /**
     * Get productId
     * @returns {ProductId} productId - Identifier for the product being ordered.
     */
    get productId(): ProductId {
        return this._productId;
    }

    /**
     * Get quantity
     * @returns {number} quantity - Number of units of the product ordered.
     */
    get quantity(): number {
        return this._quantity;
    }

    /**
     * Get unitPrice
     * @returns {Money} unitPrice - Price per unit of the product.
     */
    get unitPrice(): Money {
        return this._unitPrice;
    }

    /**
     * Calculate the total price for this item (unitPrice * quantity).
     * @returns {Money} Total price for this item.
     */
    calculateItemTotal(): Money {
        return new Money(this._unitPrice.multiply(this.quantity).amount, this._unitPrice.currency);
    }
}