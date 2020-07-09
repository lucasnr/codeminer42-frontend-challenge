import React from 'react';

import { Wrapper, Container, Title, User } from './styles';

import avatar from '~/assets/img/diverseui-male-67.jpg';

const Header: React.FC = () => {
	return (
		<Wrapper>
			<Container>
				<Title>Shopping</Title>
				<User>
					<img alt="User's avatar" src={avatar} />
					<span>John Doe</span>
				</User>
			</Container>
		</Wrapper>
	);
};

export default Header;
