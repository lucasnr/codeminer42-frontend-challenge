import React from 'react';

import { Wrapper, Container, Title, User } from './styles';

const Header: React.FC = () => {
	return (
		<Wrapper>
			<Container>
				<Title>Shopping</Title>
				<User>
					<img
						alt="User's avatar"
						src="https://static.diverseui.com/male-67.jpg"
					/>
					<span>John Doe</span>
				</User>
			</Container>
		</Wrapper>
	);
};

export default Header;
