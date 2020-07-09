import { put, select } from 'redux-saga/effects';

import {
	CartTypes,
	CartState,
	AddRequestedAction,
	AddSucceededAction,
	IProduct,
} from './types';

import { ApplicationState } from '~/store';

export function* addProduct(action: AddRequestedAction) {
	const { products, total, subtotal }: CartState = yield select(
		(state: ApplicationState) => state.cart
	);
	const toAddProduct = action.product;

	let newProducts: IProduct[];
	const foundProduct = products.find(
		(product) => product.id === toAddProduct.id
	);
	if (foundProduct)
		newProducts = products.map((product) => {
			if (product.id === foundProduct.id)
				return { ...product, quantity: product.quantity + 1 };

			return product;
		});
	else newProducts = [...products, { ...toAddProduct, quantity: 1 }];

	const newSubtotal = subtotal + toAddProduct.price;
	const newTotal = total + toAddProduct.price;

	const toPutAction: AddSucceededAction = {
		type: CartTypes.ADD_SUCCEEDED,
		products: newProducts,
		subtotal: newSubtotal,
		total: newTotal,
	};
	yield put(toPutAction);
}
