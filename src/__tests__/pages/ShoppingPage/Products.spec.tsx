import React from 'react';
import { act } from 'react-dom/test-utils';
import { AxiosResponse, AxiosError } from 'axios';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import Products from '~/pages/ShoppingPage/Products';
import { Loading } from '~/pages/ShoppingPage/Products/styles';

import { mountWithProviders, flushPromises } from '~/utils/tests';
import { ApplicationState } from '~/store';
import * as api from '~/services/api';

const mockStore = configureStore<ApplicationState>([]);

describe('<Products>', () => {
	let store: MockStoreEnhanced<ApplicationState>;

	beforeEach(() => {
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
		store = mockStore(initialState);
	});

	it('fetches data from api and renders children', async () => {
		const fakeResponse: AxiosResponse<api.FetchProductsServerResponse> = {
			data: {
				products: [
					{
						id: 1,
						name: 'Strawberry',
						price: 33,
						available: 15,
					},
					{
						id: 2,
						name: 'White Grape',
						price: 5,
						available: 12,
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
			.spyOn(api, 'getProducts')
			.mockResolvedValueOnce(fakeResponse);

		await act(async () => {
			const wrapper = mountWithProviders(<Products />, store);
			expect(wrapper.find(Loading)).toHaveLength(1); // is loading

			await flushPromises();
			wrapper.update();

			expect(wrapper.find(Loading)).toHaveLength(0); // is no longer loading
			expect(wrapper.text()).toContain('Strawberry');
			expect(wrapper.text()).toContain('White Grape');
		});

		expect(apiSpy).toHaveBeenCalled();
		expect(apiSpy).toHaveBeenCalledTimes(1);
		apiSpy.mockReset();
	});

	it('displays error message when 5 calls from api fails', async () => {
		const fakeError: AxiosError = {
			name: 'Internal Server Error',
			code: '500',
			message: 'Internal Server Error',
			config: {},
			isAxiosError: false,
			toJSON: () => ({
				code: '500',
				message: 'Internal Server Error',
			}),
		};

		const apiSpy = jest.spyOn(api, 'getProducts').mockRejectedValue(fakeError);

		await act(async () => {
			const wrapper = mountWithProviders(<Products />, store);
			expect(wrapper.find(Loading)).toHaveLength(1); // is loading

			await flushPromises();
			wrapper.update();

			expect(wrapper.find(Loading)).toHaveLength(0); // is no longer loading
			expect(wrapper.text()).toContain(
				'Ops... Looks like something went wrong.'
			);
		});

		expect(apiSpy).toHaveBeenCalled();
		expect(apiSpy).toHaveBeenCalledTimes(5);
		apiSpy.mockReset();
	});
});
