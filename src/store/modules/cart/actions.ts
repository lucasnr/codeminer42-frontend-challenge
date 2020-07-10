import {
	CartTypes,
	AddRequestedAction,
	RemoveRequestedAction,
	IToAddProduct,
	AddVoucherRequestedAction,
	IVoucher,
} from './types';

export const addProduct = (product: IToAddProduct): AddRequestedAction => {
	return {
		type: CartTypes.ADD_REQUESTED,
		product,
	};
};

export const removeProduct = (id: number): RemoveRequestedAction => {
	return {
		type: CartTypes.REMOVE_REQUESTED,
		id,
	};
};

export const addVoucher = (voucher: IVoucher): AddVoucherRequestedAction => {
	return {
		type: CartTypes.ADD_VOUCHER_REQUESTED,
		voucher,
	};
};
