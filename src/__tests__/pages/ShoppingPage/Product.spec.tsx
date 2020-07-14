import React from 'react';
import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import Product from '~/pages/ShoppingPage/Products/Product';
import { Button } from '~/pages/ShoppingPage/Products/Product/styles';

import { mountWithProviders } from '~/utils/tests';
import { IApiProduct } from '~/services/api';
import { formatMoney } from '~/utils/format';

import { Provider } from 'react-redux';
import realStore, { ApplicationState } from '~/store';

const mockStore = configureStore<ApplicationState>([]);
const initialState: ApplicationState = {
	cart: {
		products: [],
		subtotal: 0,
		shipping: 0,
		discount: 0,
		vouchers: [],
		total: 0,
	},
};

describe('<Product>', () => {
	const product: IApiProduct = {
		id: 5,
		name: 'Strawberry',
		price: 15,
		available: 10,
	};

	let store: MockStoreEnhanced<ApplicationState>;
	let wrapper: ReactWrapper;

	beforeEach(async () => {
		store = mockStore(initialState);

		await act(async () => {
			wrapper = mountWithProviders(<Product {...product} />, store);
		});
	});

	it('renders without fail and matches snapshot', async () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('renders correct values', async () => {
		const formattedPrice = formatMoney(product.price);
		expect(wrapper.find('[data-testid="price"]').text()).toBe(
			`$ ${formattedPrice}`
		);
		expect(wrapper.find('[data-testid="available"]').text()).toBe(
			`${product.available} left`
		);
	});

	it('adds product to store', async () => {
		wrapper = mountWithProviders(
			<Provider store={realStore}>
				<Product {...product} />
			</Provider>
		);
		const button = wrapper.find(Button);

		await act(async () => {
			button.simulate('click');
			wrapper.update();
		});

		expect(realStore.getState().cart.products.length).toBe(1);
		expect(wrapper.find('[data-testid="available"]').text()).toBe(
			`${product.available - 1} left`
		);
	});

	it('does not adds product to store if unavailable', async () => {
		wrapper = mountWithProviders(
			<Provider store={realStore}>
				<Product {...product} available={1} />
			</Provider>
		);
		const button = wrapper.find(Button);

		await act(async () => {
			button.simulate('click');
			wrapper.update();
		});

		expect(realStore.getState().cart.products.length).toBe(1);
		expect(realStore.getState().cart.products[0].quantity).toBe(1);
		expect(wrapper.find('[data-testid="available"]').text()).toBe('0 left');
		expect(button.text()).toBe('Unavailable');

		await act(async () => {
			button.simulate('click');
			wrapper.update();
		});

		expect(realStore.getState().cart.products[0].quantity).toBe(1); // still be 1
	});
});
