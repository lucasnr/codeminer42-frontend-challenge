import { IProduct, IVoucher } from '~/store/modules/cart/types';
import { calculateShipping } from '~/store/modules/cart/sagas';

describe('Shippping', () => {
	const products: IProduct[] = [
		{
			id: 1,
			name: 'Strawberry',
			price: 15,
			available: 5,
			quantity: 5,
		},
		{
			id: 2,
			name: 'White Grape',
			price: 35,
			available: 6,
			quantity: 4,
		},
	];
	const subtotal = products
		.map((product) => product.price * product.quantity)
		.reduce((prev, price) => prev + price);

	it('equals to 0 when the subtotal is greater than 400', () => {
		const shipping = calculateShipping(products, 401, []);
		expect(shipping).toBe(0);
	});

	it('equals to 30 when the sum of quantity is less than or equal to 10', () => {
		const quantity = products
			.map((product) => product.quantity)
			.reduce((prev, quantity) => prev + quantity);

		const shipping = calculateShipping(products, subtotal, []);
		expect(quantity).toBeLessThanOrEqual(10);
		expect(shipping).toBe(30);
	});

	it('equals to 30 plus 7 for each 5 more products above 10', () => {
		const quantity = 21;
		const products: IProduct[] = [
			{
				id: 1,
				name: 'Strawberry',
				price: 2,
				available: 5,
				quantity,
			},
		];
		const subtotal = products
			.map((product) => product.price * product.quantity)
			.reduce((prev, price) => prev + price);

		expect(subtotal).toBeLessThanOrEqual(400);
		expect(quantity).toBeGreaterThan(10);

		const shipping = calculateShipping(products, subtotal, []);
		expect(shipping).toBe(30 + 14);
	});

	it('equals to 0 when there is a shipping voucher', () => {
		const voucher: IVoucher = {
			id: 1,
			code: '#JUSTSHIPIT',
			amount: 0,
			type: 'shipping',
		};
		const shipping = calculateShipping(products, subtotal, [voucher]);
		expect(shipping).toBe(0);
	});
});
