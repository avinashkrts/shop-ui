import { all } from "redux-saga/effects";
import ProductSagas from "./product.saga";
import BrandSagas from "./brand.saga";
import CategorySaga from "./category.saga";
import UserSagas from "./user.saga";

export default function* rootSaga(getState) {
    yield all([
        ProductSagas(),
        BrandSagas(),
        UserSagas(),
        CategorySaga()
    ]);
};