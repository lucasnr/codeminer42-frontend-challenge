import React from 'react';

import Header from './Header';
import Product from './Product';
import Cart from './Cart';
import { Container, Content, Products, CheckoutButton } from './styles';

const ShoppingPage: React.FC = () => {
	return (
		<Container>
			<Header />
			<Content>
				<Products>
					<Product />
					<Product />
					<Product />

					<Product />
					<Product />
					<Product />
				</Products>

				<Cart />

				<CheckoutButton>Checkout</CheckoutButton>
			</Content>
		</Container>
	);
};

export default ShoppingPage;
