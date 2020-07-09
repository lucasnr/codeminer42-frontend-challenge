import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '~/styles/GlobalStyles';
import light from '~/styles/themes/light';

import ShoppingPage from '~/pages/ShoppingPage';

import '~/assets/css/normalize.css';

const App: React.FC = () => {
	return (
		<ThemeProvider theme={light}>
			<GlobalStyles />

			<ShoppingPage />
		</ThemeProvider>
	);
};

export default App;
