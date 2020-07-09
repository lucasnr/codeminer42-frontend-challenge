import React from 'react';

import Product from './Product';
import { Container, Title, Content, Discount, Totals } from './styles';

const Cart: React.FC = () => {
	return (
		<Container>
			<Title>Shopping Cart</Title>
			<Content>
				<ul>
					<Product />
					<Product />
				</ul>

				<Discount>
					<input type="text" placeholder="Discount code" />
					<button type="submit">Apply</button>
				</Discount>
			</Content>

			<Totals>
				<li>
					<span>Subtotal</span>
					<span>$ 234,00</span>
				</li>
				<li>
					<span>Shipping</span>
					<span>$ 10,00</span>
				</li>
				<li>
					<span>Discount</span>
					<span>$ 1,00</span>
				</li>
				<li>
					<span>Total</span>
					<span>$ 243,00</span>
				</li>
			</Totals>
		</Container>
	);
};

export default Cart;
