import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store';

import Product from './Product';
import Discount from './Discount';
import { Container, Title, Content, Totals, Vouchers, Voucher } from './styles';

import { formatMoney } from '~/utils/format';

const Cart: React.FC = () => {
	const {
		subtotal,
		shipping,
		discount,
		total,
		products,
		vouchers,
	} = useSelector((state: ApplicationState) => state.cart);

	const {
		subtotalFormatted,
		shippingFormatted,
		discountFormatted,
		totalFormatted,
	} = useMemo(() => {
		return {
			subtotalFormatted: formatMoney(subtotal),
			shippingFormatted: formatMoney(shipping),
			discountFormatted: formatMoney(discount),
			totalFormatted: formatMoney(total),
		};
	}, [discount, shipping, subtotal, total]);

	return (
		<Container>
			<Title>Shopping Cart</Title>
			<Content>
				<ul>
					{products.map((product) => (
						<Product key={product.id} {...product} />
					))}
				</ul>

				<Discount />
			</Content>

			<Totals>
				<li>
					<span>Subtotal</span>
					<span>$ {subtotalFormatted}</span>
				</li>
				<li>
					<span>Shipping</span>
					<span>$ {shippingFormatted}</span>
				</li>
				<Vouchers>
					<span>Discount</span>
					{vouchers.map((voucher) => (
						<Voucher key={voucher.id}>{voucher.code}</Voucher>
					))}
					<span>$ {discountFormatted}</span>
				</Vouchers>
				<li>
					<span>Total</span>
					<span>$ {totalFormatted}</span>
				</li>
			</Totals>
		</Container>
	);
};

export default Cart;
