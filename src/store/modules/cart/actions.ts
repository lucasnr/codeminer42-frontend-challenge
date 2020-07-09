import {
	CartTypes,
	AddRequestedAction,
	RemoveRequestedAction,
	ToAddProductType,
} from './types';

export const addProduct = (product: ToAddProductType): AddRequestedAction => {
	return {
		type: CartTypes.ADD_REQUESTED,
		product,
	};
};

export const removeProduct = (id: number): RemoveRequestedAction => {
	return {
		type: CartTypes.REMOVE_REQUESTED,
		id,
	};
};
