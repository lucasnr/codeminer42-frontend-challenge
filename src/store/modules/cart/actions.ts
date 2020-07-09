import { CartTypes, AddRequestedAction, ToAddProductType } from './types';

export const addProduct = (product: ToAddProductType): AddRequestedAction => {
	return {
		type: CartTypes.ADD_REQUESTED,
		product,
	};
};
