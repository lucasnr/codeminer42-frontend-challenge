import React from 'react';
import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import Cart from '~/pages/ShoppingPage/Cart';
import Discount from '~/pages/ShoppingPage/Cart/Discount';

import { formatMoney } from '~/utils/format';
import { mountWithProviders, flushPromises } from '~/utils/tests';

import { Provider } from 'react-redux';
import realStore, { ApplicationState } from '~/store';

import * as api from '~/services/api';

const mockStore = configureStore<ApplicationState>([]);
const initialState: ApplicationState = {
	cart: {
		products: [
			{
				id: 5,
				name: 'Strawberry',
				price: 15,
				available: 9,
				quantity: 1,
			},
		],
		subtotal: 15,
		shipping: 30,
		discount: 0,
		vouchers: [],
		total: 45,
	},
};

describe('<Cart>', () => {
	let store: MockStoreEnhanced<ApplicationState>;
	let wrapper: ReactWrapper;

	beforeEach(async () => {
		store = mockStore(initialState);

		await act(async () => {
			wrapper = mountWithProviders(<Cart />, store);
		});
	});

	it('renders without fail and matches snapshot', async () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('renders correct values from store', async () => {
		const expectedSubtotal = `$ ${formatMoney(15)}`;
		const expectedShipping = `$ ${formatMoney(30)}`;
		const expectedDiscount = `$ ${formatMoney(0)}`;
		const expectedTotal = `$ ${formatMoney(45)}`;

		expect(wrapper.find('[data-testid="subtotal"]').text()).toBe(
			expectedSubtotal
		);
		expect(wrapper.find('[data-testid="shipping"]').text()).toBe(
			expectedShipping
		);
		expect(wrapper.find('[data-testid="discount"]').text()).toBe(
			expectedDiscount
		);
		expect(wrapper.find('[data-testid="total"]').text()).toBe(expectedTotal);
	});

	it('adds voucher', async () => {
		const code = '#50OFF';

		const fakeResponse: AxiosResponse<api.FetchVouchersServerResponse> = {
			data: {
				vouchers: [
					{
						id: 2,
						code,
						amount: 50,
						type: 'percentual',
					},
				],
			},
			status: 200,
			statusText: 'Ok',
			headers: {
				'content-type': 'application/json',
			},
			config: {},
		};
		const apiSpy = jest
			.spyOn(api, 'getVouchers')
			.mockResolvedValue(fakeResponse);

		wrapper = mountWithProviders(
			<Provider store={realStore}>
				<Cart />
			</Provider>
		);

		const form = wrapper.find(Discount);
		await act(async () => {
			await flushPromises();

			form.find('input').simulate('change', { target: { value: code } });
			form.simulate('submit');
			wrapper.update();
		});

		expect(apiSpy).toHaveBeenCalled();
		expect(realStore.getState().cart.vouchers.length).toBe(1);
		expect(realStore.getState().cart.vouchers[0].code).toBe(code);
	});
});
