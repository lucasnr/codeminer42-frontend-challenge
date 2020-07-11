import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import Header from '~/components/Header';
import Products from './Products';
import Cart from './Cart';
import { Container, Content, CheckoutButton } from './styles';

const ShoppingPage: React.FC = () => {
	const handleCheckout = useCallback(() => {
		toast.info('Checkout successfully done');
	}, []);

	return (
		<Container>
			<Header />
			<Content>
				<Products />
				<Cart />

				<CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
			</Content>
		</Container>
	);
};

export default ShoppingPage;
