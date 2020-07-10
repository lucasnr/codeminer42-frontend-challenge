import React from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store';

import Product from './Product';
import Discount from './Discount';
import { Container, Title, Content, Totals, Vouchers, Voucher } from './styles';

const Cart: React.FC = () => {
	const {
		subtotal,
		shipping,
		discount,
		total,
		products,
		vouchers,
	} = useSelector((state: ApplicationState) => state.cart);

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
					<span>$ {subtotal}</span>
				</li>
				<li>
					<span>Shipping</span>
					<span>$ {shipping}</span>
				</li>
				<Vouchers>
					<span>Discount</span>
					{vouchers.map((voucher) => (
						<Voucher key={voucher.id}>{voucher.code}</Voucher>
					))}
					<span>$ {discount}</span>
				</Vouchers>
				<li>
					<span>Total</span>
					<span>$ {total}</span>
				</li>
			</Totals>
		</Container>
	);
};

export default Cart;
