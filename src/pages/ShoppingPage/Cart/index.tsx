import React from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store';

import Product from './Product';
import { Container, Title, Content, Discount, Totals } from './styles';

const Cart: React.FC = () => {
	const { subtotal, shipping, discount, total, products } = useSelector(
		(state: ApplicationState) => state.cart
	);

	return (
		<Container>
			<Title>Shopping Cart</Title>
			<Content>
				<ul>
					{products.map((product) => (
						<Product key={product.id} {...product} />
					))}
				</ul>

				<Discount>
					<input type="text" placeholder="Discount code" />
					<button type="submit">Apply</button>
				</Discount>
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
				<li>
					<span>Discount</span>
					<span>$ {discount}</span>
				</li>
				<li>
					<span>Total</span>
					<span>$ {total}</span>
				</li>
			</Totals>
		</Container>
	);
};

export default Cart;
