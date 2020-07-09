import styled from 'styled-components';

export const Container = styled.section`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;

type MessageProps = {
	error: boolean;
};

export const Message = styled.span<MessageProps>`
	color: ${({ error }) => (error ? '#d44' : 'inherit')};
	font-size: 1.5rem;
	font-weight: 700;
`;
