import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import store from '~/store';

import GlobalStyles from '~/styles/GlobalStyles';
import light from '~/styles/themes/light';

import ShoppingPage from '~/pages/ShoppingPage';

import '~/assets/css/normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={light}>
				<GlobalStyles />
				<ToastContainer newestOnTop />

				<ShoppingPage />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
