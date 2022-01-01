import {ProductActions} from "./constants";

export const changeProductData = (data) => {
    return dispatch => {
        dispatch({
            type: ProductActions.GET_BY_SHOP_ID,
            payload: data
        })
    }
}