import styled from 'styled-components';

export const Wrapper = styled.header`
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.text.secondary};
`;

export const Container = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 0px auto;
	max-width: 62rem;
	padding: 1rem;
	width: 100%;
`;

export const Title = styled.h1`
	font-size: 2rem;
	font-weight: 700;
`;

export const User = styled.div`
	align-items: center;
	display: flex;
	font-size: 1.125rem;
	font-weight: 500;

	img {
		border: 0.125rem solid ${({ theme }) => theme.text.secondary};
		border-radius: 50%;
		margin-right: 1rem;
		height: 2.75rem;
		width: 2.75rem;
	}
`;
