// Action Types

export enum CartTypes {
	ADD_REQUESTED = '@cart/ADD_REQUESTED',
	REMOVE_REQUESTED = '@cart/REMOVE_REQUESTED',
	MODIFY_SUCCEEDED = '@cart/MODIFY_SUCCEEDED',
}

export interface ToAddProductType {
	id: number;
	name: string;
	price: number;
	available: number;
}

export interface IProduct extends ToAddProductType {
	quantity: number;
}

export interface AddRequestedAction {
	type: CartTypes;
	product: ToAddProductType;
}

export interface RemoveRequestedAction {
	type: CartTypes;
	id: number;
}

export interface ModifySucceededAction {
	type: CartTypes;
	products: IProduct[];
	subtotal: number;
	total: number;
}

// Reducer State

export interface CartState {
	readonly products: IProduct[];
	readonly subtotal: number;
	readonly shipping: number;
	readonly discount: number;
	readonly total: number;
}
