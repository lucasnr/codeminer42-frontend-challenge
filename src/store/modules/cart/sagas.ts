import { put, select } from 'redux-saga/effects';

import {
	CartTypes,
	CartState,
	AddRequestedAction,
	RemoveRequestedAction,
	ModifySucceededAction,
	IProduct,
} from './types';

import { ApplicationState } from '~/store';

export function* addProduct(action: AddRequestedAction) {
	const { products, subtotal }: CartState = yield select(
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
	const shipping = calculateShipping(newProducts, newSubtotal);
	const total = newSubtotal + shipping;

	const toPutAction: ModifySucceededAction = {
		type: CartTypes.MODIFY_SUCCEEDED,
		products: newProducts,
		subtotal: newSubtotal,
		shipping,
		total,
	};
	yield put(toPutAction);
}

export function* removeProduct(action: RemoveRequestedAction) {
	const { products, subtotal }: CartState = yield select(
		(state: ApplicationState) => state.cart
	);

	const toRemoveProduct = products.find((product) => product.id === action.id);
	if (!toRemoveProduct) return;

	const { id, price, quantity } = toRemoveProduct;
	let newProducts;

	if (quantity === 1)
		newProducts = products.filter((product) => product.id !== id);
	else
		newProducts = products.map((product) => {
			if (product.id === id)
				return { ...product, quantity: product.quantity - 1 };

			return product;
		});

	const newSubtotal = subtotal - price;
	const shipping = calculateShipping(newProducts, subtotal);
	const total = newSubtotal + shipping;

	const toPutAction: ModifySucceededAction = {
		type: CartTypes.MODIFY_SUCCEEDED,
		products: newProducts,
		subtotal: newSubtotal,
		shipping,
		total,
	};
	yield put(toPutAction);
}

function calculateShipping(products: IProduct[], subtotal: number): number {
	if (subtotal > 400 || products.length === 0) return 0;

	const weight = products
		.map((product) => product.quantity)
		.reduce((prev, quantity) => prev + quantity);

	if (weight <= 10) return 30;
	return 30 + Math.floor((weight - 10) / 5) * 7;
}
