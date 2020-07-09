import { all, takeLatest } from 'redux-saga/effects';

import { CartTypes } from './cart/types';
import { addProduct, removeProduct } from './cart/sagas';

export default function* rootSaga() {
	return yield all([
		takeLatest(CartTypes.ADD_REQUESTED, addProduct),
		takeLatest(CartTypes.REMOVE_REQUESTED, removeProduct),
	]);
}
