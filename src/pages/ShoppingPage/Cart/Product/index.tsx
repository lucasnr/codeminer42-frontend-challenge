import React from 'react';

import { Container, Content, Name, Row, Controls } from './styles';

const Product: React.FC = () => {
	return (
		<Container>
			<img
				alt="Product's cover"
				src="https://pics.me.me/thumb_kinda-want-this-to-happen-everyone-start-posting-oranges-at-68325797.png"
			/>

			<Content>
				<Name>Product name</Name>
				<Row>
					<span>Quantity: 4</span>
					<span>$ 123,45</span>
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
