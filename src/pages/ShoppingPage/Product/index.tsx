import React from 'react';

import { Container, Info, Name, Price, Button } from './styles';

const Product: React.FC = () => {
	return (
		<Container>
			<img
				alt="Product cover"
				src="https://pics.me.me/thumb_kinda-want-this-to-happen-everyone-start-posting-oranges-at-68325797.png"
			/>
			<Info>
				<Name>Product Name</Name>
				<Price>
					<span>$ 123,00</span>
					<div className="dot"></div>
					<span>2 left</span>
				</Price>
			</Info>
			<Button>Buy</Button>
		</Container>
	);
};

export default Product;
