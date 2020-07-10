// Action Types

export enum CartTypes {
	ADD_REQUESTED = '@cart/ADD_REQUESTED',
	REMOVE_REQUESTED = '@cart/REMOVE_REQUESTED',
	MODIFY_SUCCEEDED = '@cart/MODIFY_SUCCEEDED',
	ADD_VOUCHER_REQUESTED = '@cart/ADD_VOUCHER_REQUESTED',
	ADD_VOUCHER_SUCCEEDED = '@cart/ADD_VOUCHER_SUCCEEDED',
}

export interface IToAddProduct {
	id: number;
	name: string;
	price: number;
	available: number;
}

export interface IProduct extends IToAddProduct {
	quantity: number;
}

export interface IVoucher {
	id: number;
	code: string;
	type: 'percentual' | 'fixed' | 'shipping';
	amount: number;
	minValue?: number;
}

export interface AddRequestedAction {
	type: CartTypes.ADD_REQUESTED;
	product: IToAddProduct;
}

export interface RemoveRequestedAction {
	type: CartTypes.REMOVE_REQUESTED;
	id: number;
}

export interface ModifySucceededAction {
	type: CartTypes.MODIFY_SUCCEEDED;
	products: IProduct[];
	subtotal: number;
	shipping: number;
	discount: number;
	total: number;
}

export interface AddVoucherRequestedAction {
	type: CartTypes.ADD_VOUCHER_REQUESTED;
	voucher: IVoucher;
}

export interface AddVoucherSucceededAction {
	type: CartTypes.ADD_VOUCHER_SUCCEEDED;
	subtotal: number;
	vouchers: IVoucher[];
	discount: number;
	shipping: number;
	total: number;
}

// Reducer State

export interface CartState {
	readonly products: IProduct[];
	readonly subtotal: number;
	readonly shipping: number;
	readonly discount: number;
	readonly vouchers: IVoucher[];
	readonly total: number;
}
