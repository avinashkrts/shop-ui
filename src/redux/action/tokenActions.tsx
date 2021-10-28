import ActionTypes from "./constants/Constant";

export const changeProductData = (data) => {
    return dispatch => {
        dispatch({type: ActionTypes.CHANGE_PRODUCT_STATE, payload: data})
    }
}