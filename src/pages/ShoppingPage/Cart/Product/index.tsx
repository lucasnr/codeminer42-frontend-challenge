import React, { useMemo } from 'react';

import { Container, Content, Name, Row, Controls } from './styles';

import getImage from '~/utils/images';

import { IProduct } from '~/store/modules/cart/types';

const Product: React.FC<IProduct> = ({ id, name, quantity, price }) => {
	const image = useMemo(() => getImage(id), [id]);

	return (
		<Container>
			<img alt={name} src={image} />

			<Content>
				<Name>{name}</Name>
				<Row>
					<span>Quantity: {quantity}</span>
					<span>$ {price}</span>
				</Row>
			</Content>
			<Controls>
				<button>+</button>
				<button>-</button>
			</Controls>
		</Container>
	);
};

export default Product;
