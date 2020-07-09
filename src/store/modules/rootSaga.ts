import { all, takeLatest } from 'redux-saga/effects';

import { CartTypes } from './cart/types';
import { addProduct } from './cart/sagas';

export default function* rootSaga() {
	return yield all([takeLatest(CartTypes.ADD_REQUESTED, addProduct)]);
}
