import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Container, Info, Name, Price, Button } from './styles';

import { ApplicationState } from '~/store';
import { addProduct } from '~/store/modules/cart/actions';

import { IProduct } from '../index';

import getImage from '~/utils/images';

const Product: React.FC<IProduct> = ({
	id,
	name,
	price,
	available: initialAvailable,
}) => {
	const image = useMemo(() => {
		return getImage(id);
	}, [id]);

	const cartProducts = useSelector(
		(state: ApplicationState) => state.cart.products
	);
	const available = useMemo(() => {
		const productOnCart = cartProducts.find((product) => product.id === id);
		return initialAvailable - (productOnCart?.quantity || 0);
	}, [initialAvailable, cartProducts, id]);

	const dispatch = useDispatch();
	const handleAddToCart = useCallback(() => {
		if (available < 1) {
			toast.error('This product is no longer available');
			return;
		}

		dispatch(addProduct({ id, name, price, available: initialAvailable }));
	}, [available, dispatch, id, name, price, initialAvailable]);

	return (
		<Container>
			<img alt="Product cover" src={image} />
			<Info>
				<Name>{name}</Name>
				<Price>
					<span>$ {price}</span>
					<div className="dot"></div>
					<span>{available} left</span>
				</Price>
			</Info>
			<Button onClick={handleAddToCart}>Buy</Button>
		</Container>
	);
};

export default Product;
