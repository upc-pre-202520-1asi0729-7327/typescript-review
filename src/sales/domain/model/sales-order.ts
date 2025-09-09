import {SalesOrderItem} from "./sales-order-item";
import {DateTime} from "../../../shared/domain/model/date-time";
import {Currency} from "../../../shared/domain/model/currency";

export type SalesOrderState = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'CANCELLED';
export class SalesOrder {
    private readonly _customerId: string;
    private readonly _id: string;
    private readonly _items: SalesOrderItem[];
    private readonly _orderedAt: DateTime;
    private readonly _currency: Currency;
    private _state: SalesOrderState;
    
    constructor(customerId: string,  currency: Currency, orderedAt?: Date | string ) {
        // TODO: Validate customerId is present and is not empty
        this._customerId = customerId;
        this._id = crypto.randomUUID();
        this._items = [];
        this._orderedAt = new DateTime(orderedAt);
        this._currency = currency;
        this._state = 'PENDING';
    }
}