import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { prepareErrorMessage } from '../action/Common';
import { VarientActions } from '../action/constants';
import { USER_SERVICE } from '../service/user.services';

export function* fetchVarientByShopIdAsync(action) {
    let response = yield USER_SERVICE.USER_BY_ID(action.payload);
    if (response.data && response.data != null) {
        yield put({
            type: VarientActions.GET_BY_SHOP_ID_ASYNC,
            payload: response.data
        });
    } else {
        yield put(prepareErrorMessage(VarientActions.VARIENT_ERROR, response));
    }
}

export function* fetchVarientByShopId() {
    yield takeEvery(VarientActions.GET_BY_SHOP_ID, fetchVarientByShopIdAsync);
}

export default function* rootSaga() {
    yield all([
        fork(fetchVarientByShopId)
    ])
}