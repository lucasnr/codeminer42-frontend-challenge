import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '~/styles/GlobalStyles';
import light from '~/styles/themes/light';

const App: React.FC = () => {
	return (
		<ThemeProvider theme={light}>
			<GlobalStyles />
			<h1>Goodbye World</h1>
		</ThemeProvider>
	);
};

export default App;
