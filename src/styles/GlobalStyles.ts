import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
		outline: none;
	}

	body {
		background-color: ${({ theme }) => theme.background.secondary};
		color: ${({ theme }) => theme.text.primary};
		overflow-y: scroll;
	}

	body, input, button, textarea {
		font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
	}

	#root {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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
