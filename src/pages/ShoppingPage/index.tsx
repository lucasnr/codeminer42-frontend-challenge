import React from 'react';

import Header from './Header';
import Products from './Products';
import Cart from './Cart';
import { Container, Content, CheckoutButton } from './styles';

const ShoppingPage: React.FC = () => {
	return (
		<Container>
			<Header />
			<Content>
				<Products />
				<Cart />

				<CheckoutButton>Checkout</CheckoutButton>
			</Content>
		</Container>
	);
};

export default ShoppingPage;
