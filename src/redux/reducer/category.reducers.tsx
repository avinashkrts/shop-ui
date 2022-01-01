import { ProductActions } from "../action/constants";

const INITIAL_STATE = {
    productData: {}
}

const ProductReducers = (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActions.GET_BY_SHOP_ID_ASYNC:
            return ({
                ...states,
                productData: action.payload
            });
        default:
            return states;
    }
}

export default ProductReducers;