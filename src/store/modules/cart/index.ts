import { Reducer } from 'redux';

import { CartTypes, CartState } from './types';

const INITAL_STATE: CartState = {
	products: [],
	subtotal: 0,
	shipping: 0,
	discount: 0,
	total: 0,
};

const reducer: Reducer<CartState> = (state = INITAL_STATE, action) => {
	switch (action.type) {
		case CartTypes.ADD_SUCCEEDED:
			return {
				...state,
				products: action.products,
				subtotal: action.subtotal,
				total: action.total,
			};
		default:
			return state;
	}
};

export default reducer;
