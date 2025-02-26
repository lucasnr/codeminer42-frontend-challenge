import { put, select } from 'redux-saga/effects';

import {
	CartTypes,
	CartState,
	AddRequestedAction,
	RemoveRequestedAction,
	ModifySucceededAction,
	IProduct,
	AddVoucherRequestedAction,
	AddVoucherSucceededAction,
	IVoucher,
} from './types';

import { ApplicationState } from '~/store';

export function* addProduct(action: AddRequestedAction) {
	const { products, subtotal, vouchers }: CartState = yield select(
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
	const { shipping, discount, total } = calculateValues(
		newProducts,
		newSubtotal,
		vouchers
	);

	const toPutAction: ModifySucceededAction = {
		type: CartTypes.MODIFY_SUCCEEDED,
		products: newProducts,
		subtotal: newSubtotal,
		shipping,
		discount,
		total,
	};
	yield put(toPutAction);
}

export function* removeProduct(action: RemoveRequestedAction) {
	const { products, subtotal, vouchers }: CartState = yield select(
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
	const { shipping, discount, total } = calculateValues(
		newProducts,
		newSubtotal,
		vouchers
	);

	const toPutAction: ModifySucceededAction = {
		type: CartTypes.MODIFY_SUCCEEDED,
		products: newProducts,
		subtotal: newSubtotal,
		shipping,
		discount,
		total,
	};
	yield put(toPutAction);
}

export function* addVoucher(action: AddVoucherRequestedAction) {
	let { products, subtotal, vouchers }: CartState = yield select(
		(state: ApplicationState) => state.cart
	);

	const voucher = action.voucher;
	vouchers = [...vouchers, voucher];

	const { shipping, discount, total } = calculateValues(
		products,
		subtotal,
		vouchers
	);
	const toPutAction: AddVoucherSucceededAction = {
		type: CartTypes.ADD_VOUCHER_SUCCEEDED,
		subtotal,
		shipping,
		discount,
		vouchers,
		total,
	};
	yield put(toPutAction);
}

export function calculateShipping(
	products: IProduct[],
	subtotal: number,
	vouchers: IVoucher[]
): number {
	if (subtotal > 400 || products.length === 0) return 0;

	const freeShippingVoucher = vouchers.find(
		(voucher) => voucher.type === 'shipping'
	);
	if (freeShippingVoucher && subtotal >= (freeShippingVoucher.minValue || 0))
		return 0;

	const weight = products
		.map((product) => product.quantity)
		.reduce((prev, quantity) => prev + quantity);

	if (weight <= 10) return 30;
	return 30 + Math.floor((weight - 10) / 5) * 7;
}

export function calculateDiscount(subtotal: number, vouchers: IVoucher[]) {
	let discount = 0;

	vouchers.forEach((voucher) => {
		switch (voucher.type) {
			case 'percentual':
				discount += subtotal * (voucher.amount / 100);
				break;
			case 'fixed':
				discount += voucher.amount;
				break;
		}
	});

	return discount;
}

export function calculateValues(
	products: IProduct[],
	subtotal: number,
	vouchers: IVoucher[]
) {
	const shipping = calculateShipping(products, subtotal, vouchers);
	const discount = calculateDiscount(subtotal, vouchers);

	let total = subtotal + shipping - discount;
	if (total < 0) total = 0;

	return { shipping, discount, total };
}
