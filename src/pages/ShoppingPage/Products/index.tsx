import React, { useState, useEffect } from 'react';

import Product from './Product';
import { Container, Message, Loading } from './styles';

import api from '~/services/api';

export interface IProduct {
	id: number;
	name: string;
	price: number;
	available: number;
}

const Products: React.FC = () => {
	const [products, setProducts] = useState<IProduct[]>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		fetchProducts();

		async function fetchProducts() {
			for (let i = 0; i < 5; i++) {
				try {
					const { data } = await api.get('products.json');
					setProducts(data.products);
					return;
				} catch (error) {}
			}

			setError('Ops... Looks like something went wrong.');
		}
	}, []);

	return products ? (
		<Container>
			{products.map((product) => (
				<Product key={product.id} {...product} />
			))}
		</Container>
	) : (
		<Message>{error || <Loading aria-label="Loading products..." />}</Message>
	);
};

export default Products;
