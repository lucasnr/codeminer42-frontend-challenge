import React, { ReactElement } from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';

import light from '~/styles/themes/light';

import { ApplicationState } from '~/store';

export const flushPromises = () => new Promise(setImmediate);

export const mountWithProviders = (
	children: ReactElement,
	store?: MockStoreEnhanced<ApplicationState>
) => {
	if (store)
		return mount(
			<Provider store={store}>
				<ThemeProvider theme={light}>{children}</ThemeProvider>
			</Provider>
		);
	else return mount(<ThemeProvider theme={light}>{children}</ThemeProvider>);
};
