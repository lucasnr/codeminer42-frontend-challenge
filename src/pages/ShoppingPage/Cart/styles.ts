import styled from 'styled-components';

export const Container = styled.section`
	background-color: rgba(0, 0, 0, 0.075);
	border-radius: 0.5rem;
	overflow: hidden;
`;

export const Title = styled.h2`
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.text.secondary};
	font-size: 1.5rem;
	font-weight: 600;
	padding: 0.5rem;
	text-align: center;
`;

export const Content = styled.div`
	padding: 1rem;
`;

export const Discount = styled.form`
	display: flex;

	input {
		border: 0.0625rem solid rgba(0, 0, 0, 0.5);
		border-radius: 0.25rem;
		font-size: 0.875rem;
		font-weight: 400;
		margin-right: 1rem;
		padding: 0.625rem 1rem;
		width: 100%;
	}

	button {
		background-color: ${({ theme }) => theme.colors.primary};
		border: none;
		border-radius: 0.5rem;
		color: ${({ theme }) => theme.text.secondary};
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.625rem 1rem;
		text-transform: uppercase;
	}
`;

export const Totals = styled.ul`
	li {
		align-items: center;
		border-top: 0.0625rem solid rgba(0, 0, 0, 0.125);
		display: flex;
		font-size: 1rem;
		justify-content: space-between;
		padding: 1rem;

		&:last-child {
			font-weight: 700;
		}
	}
`;
