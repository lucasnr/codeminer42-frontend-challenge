import React, { useState, useEffect } from 'react';

import Product from './Product';
import { Container, Message } from './styles';

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
			try {
				const { data } = await api.get('products.json');
				setProducts(data.products);
			} catch (error) {
				setError('Ops... Looks like something went wrong');
			}
		}
	}, []);

	return products ? (
		<Container>
			{products.map((product) => (
				<Product key={product.id} {...product} />
			))}
		</Container>
	) : (
		<Message error={error ? true : false}>
			{error || 'Loading products...'}
		</Message>
	);
};

export default Products;
