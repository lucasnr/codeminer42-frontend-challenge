import { Reducer } from 'redux';

import { CartTypes, CartState } from './types';

const INITAL_STATE: CartState = {
	products: [],
	subtotal: 0,
	shipping: 0,
	discount: 0,
	vouchers: [],
	total: 0,
};

const reducer: Reducer<CartState> = (state = INITAL_STATE, action) => {
	switch (action.type) {
		case CartTypes.MODIFY_SUCCEEDED:
			return {
				...state,
				products: action.products,
				subtotal: action.subtotal,
				shipping: action.shipping,
				discount: action.discount,
				total: action.total,
			};
		case CartTypes.ADD_VOUCHER_SUCCEEDED:
			return {
				...state,
				subtotal: action.subtotal,
				shipping: action.shipping,
				discount: action.discount,
				vouchers: action.vouchers,
				total: action.total,
			};
		default:
			return state;
	}
};

export default reducer;
