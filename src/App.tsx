import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import store from '~/store';

import GlobalStyles from '~/styles/GlobalStyles';
import light from '~/styles/themes/light';

import ShoppingPage from '~/pages/ShoppingPage';

import '~/assets/css/normalize.css';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={light}>
				<GlobalStyles />

				<ShoppingPage />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
