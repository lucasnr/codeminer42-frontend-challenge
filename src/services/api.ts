import axios from 'axios';

import { IVoucher } from '~/store/modules/cart/types';

const api = axios.create({
	baseURL: 'https://shielded-wildwood-82973.herokuapp.com',
});

export interface IApiProduct {
	id: number;
	name: string;
	price: number;
	available: number;
}

export interface FetchProductsServerResponse {
	products: IApiProduct[];
}

export interface FetchVouchersServerResponse {
	vouchers: IVoucher[];
}

export const getProducts = () =>
	api.get<FetchProductsServerResponse>('products.json');

export const getVouchers = () =>
	api.get<FetchVouchersServerResponse>('vouchers.json');
