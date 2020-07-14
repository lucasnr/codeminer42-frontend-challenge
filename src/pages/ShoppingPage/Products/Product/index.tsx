import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Container, Info, Name, Price, Button } from './styles';

import { ApplicationState } from '~/store';
import { addProduct } from '~/store/modules/cart/actions';

import { IApiProduct } from '~/services/api';

import getImage from '~/utils/images';
import { formatMoney } from '~/utils/format';

const Product: React.FC<IApiProduct> = ({
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

	const priceFormatted = useMemo(() => formatMoney(price), [price]);

	return (
		<Container>
			<img alt={name} src={image} />
			<Info>
				<Name>{name}</Name>
				<Price>
					<span>$ {priceFormatted}</span>
					<div className="dot"></div>
					<span>{available} left</span>
				</Price>
			</Info>
			<Button onClick={handleAddToCart} disabled={available === 0}>
				{available === 0 ? 'Unavailable' : 'Buy'}
			</Button>
		</Container>
	);
};

export default Product;
