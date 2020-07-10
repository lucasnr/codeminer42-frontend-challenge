import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container, Content, Name, Row, Controls } from './styles';

import getImage from '~/utils/images';
import { formatMoney } from '~/utils/format';

import { addProduct, removeProduct } from '~/store/modules/cart/actions';
import { IProduct } from '~/store/modules/cart/types';

const Product: React.FC<IProduct> = ({
	id,
	name,
	quantity,
	price,
	available,
}) => {
	const image = useMemo(() => getImage(id), [id]);

	const dispatch = useDispatch();
	const handleIncreaseOnCart = useCallback(() => {
		if (quantity === available) {
			toast.error('This product is no longer available');
			return;
		}

		dispatch(addProduct({ id, name, price, available }));
	}, [available, dispatch, id, name, price, quantity]);

	const handleDecreaseOnCart = useCallback(() => {
		dispatch(removeProduct(id));
	}, [dispatch, id]);

	const priceFormatted = useMemo(() => formatMoney(price), [price]);

	return (
		<Container>
			<img alt={name} src={image} />

			<Content>
				<Name>{name}</Name>
				<Row>
					<span>Quantity: {quantity}</span>
					<span>$ {priceFormatted}</span>
				</Row>
			</Content>
			<Controls>
				<button
					aria-label="Increase amount on cart"
					onClick={handleIncreaseOnCart}
				>
					+
				</button>
				<button
					aria-label="Decrease amount on cart"
					onClick={handleDecreaseOnCart}
				>
					-
				</button>
			</Controls>
		</Container>
	);
};

export default Product;
