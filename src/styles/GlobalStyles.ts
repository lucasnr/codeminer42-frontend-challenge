import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
		outline: none;
	}

	body {
		background-color: ${({ theme }) => theme.background.primary};
		color: ${({ theme }) => theme.text.primary};
		overflow-y: scroll;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	button {
		cursor: pointer;
	}

	ul {
		list-style: none;
	}
`;

export default GlobalStyles;
