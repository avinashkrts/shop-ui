import ActionTypes from "../action/constants/Constant";

const INITIAL_STATE = {
    productData: {}
}

const TokenReducers = (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_PRODUCT_STATE:
            return ({
                ...states,
                productData: action.payload
            })

        default:
            return states;
    }
}

export default TokenReducers;