import styled from 'styled-components';

export const Container = styled.section`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));

	@media (min-width: 768px) {
		margin-bottom: auto !important;
	}
`;

type MessageProps = {
	error: boolean;
};

export const Message = styled.span<MessageProps>`
	display: block;
	color: ${({ error }) => (error ? '#d44' : 'inherit')};
	font-size: 1.5rem;
	font-weight: 700;
`;
