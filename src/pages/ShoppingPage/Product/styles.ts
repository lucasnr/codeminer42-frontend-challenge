import styled from 'styled-components';

export const Container = styled.div`
	border-radius: 0.5rem;
	overflow: hidden;

	img {
		background-color: rgba(0, 0, 0, 0.1);
		display: block;
		height: 9rem;
		object-fit: cover;
		object-position: center;
		width: 100%;

		@media (min-width: 576px) {
			height: 7.5rem;
		}
	}
`;

export const Info = styled.div`
	background-color: ${({ theme }) => theme.background.primary};
	padding: 1rem;

	> * {
		margin-bottom: 0.5rem;
	}
`;

export const Name = styled.h3`
	font-size: 1rem;
	font-weight: 600;
`;

export const Price = styled.h4`
	display: flex;
	font-size: 1rem;
	font-weight: 400;

	.dot {
		background-color: currentColor;
		border-radius: 50%;
		content: ' ';
		display: block;
		height: 0.25rem;
		margin: auto 1ch;
		width: 0.25rem;
	}
`;

export const Button = styled.button`
	background-color: ${({ theme }) => theme.colors.primary};
	border: none;
	color: ${({ theme }) => theme.text.secondary};
	font-size: 1rem;
	font-weight: 500;
	padding: 0.625rem 1rem;
	text-transform: uppercase;
	width: 100%;
`;
