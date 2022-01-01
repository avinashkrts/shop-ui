import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { prepareErrorMessage } from '../action/Common';
import { ProductActions } from '../action/constants';
import { PRODUCT_SERVICE } from '../service/product.services';

export function* fetchProductByShopIdAsync(action) {
    let response = yield PRODUCT_SERVICE.PRODUCT_BY_SHOP_ID(action.payload);
    if (response.data && response.data != null) {
        yield put({
            type: ProductActions.GET_BY_SHOP_ID_ASYNC,
            payload: response.data
        });
    } else {
        yield put(prepareErrorMessage(ProductActions.PRODUCT_ERROR, response));
    }
}

export function* fetchProductByShopId() {
    yield takeEvery(ProductActions.GET_BY_SHOP_ID, fetchProductByShopIdAsync);
}

export default function* rootSaga() {
    yield all([
        fork(fetchProductByShopId)
    ])
}