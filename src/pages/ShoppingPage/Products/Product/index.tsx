import React, { useMemo } from 'react';

import { Container, Info, Name, Price, Button } from './styles';

import getImage from '~/utils/images';

import { IProduct } from '../index';

const Product: React.FC<IProduct> = ({ id, name, price, available }) => {
	const image = useMemo(() => {
		return getImage(id);
	}, [id]);

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
			<Button>Buy</Button>
		</Container>
	);
};

export default Product;
