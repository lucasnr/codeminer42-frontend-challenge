import { IProduct, IVoucher } from '~/store/modules/cart/types';
import { calculateDiscount } from '~/store/modules/cart/sagas';

describe('Discount', () => {
	const products: IProduct[] = [
		{
			id: 1,
			name: 'Strawberry',
			price: 15,
			available: 50,
			quantity: 50,
		},
		{
			id: 2,
			name: 'White Grape',
			price: 35,
			available: 50,
			quantity: 50,
		},
	];
	const subtotal = products
		.map((product) => product.price * product.quantity)
		.reduce((prev, price) => prev + price);

	it('equals to 0 when there is no voucher', () => {
		const discount = calculateDiscount(subtotal, []);
		expect(discount).toBe(0);
	});

	it('equals to half of subtotal when there is a percentual voucher with amount equal to 50', () => {
		const voucher: IVoucher = {
			id: 1,
			code: '#50OFF',
			type: 'percentual',
			amount: 50,
		};
		const discount = calculateDiscount(subtotal, [voucher]);
		expect(discount).toBe(subtotal / 2);
	});

	it('equals the sum of the amount of all fixed voucher', () => {
		const amountOne = 200;
		const amountTwo = 370;

		const vouchers: IVoucher[] = [
			{
				id: 1,
				code: `#${amountOne}DOLLARS`,
				type: 'fixed',
				amount: amountOne,
			},
			{
				id: 2,
				code: `#${amountTwo}DOLLARS`,
				type: 'fixed',
				amount: amountTwo,
			},
		];
		const discount = calculateDiscount(subtotal, vouchers);

		expect(discount).toBe(amountOne + amountTwo);
	});

	it('equals the sum of the amount of all fixed voucher plus the percentual of a percentual voucher over the subtotal', () => {
		const amountOne = 200;
		const amountTwo = 370;
		const amountThree = 45;

		const vouchers: IVoucher[] = [
			{
				id: 1,
				code: `#${amountOne}DOLLARS`,
				type: 'fixed',
				amount: amountOne,
			},
			{
				id: 2,
				code: `#${amountTwo}DOLLARS`,
				type: 'fixed',
				amount: amountTwo,
			},
			{
				id: 3,
				code: `#${amountThree}OFF`,
				type: 'percentual',
				amount: amountThree,
			},
		];
		const discount = calculateDiscount(subtotal, vouchers);

		expect(discount).toBe(
			amountOne + amountTwo + subtotal * (amountThree / 100)
		);
	});
});
