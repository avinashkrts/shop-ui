import { combineReducers } from 'redux'
import ProductReducers from './product.reducers'
import BrandReducers from './brand.reducers'
import UserReducers from './user.reducers'

const rootReducer = combineReducers({
    productReducers: ProductReducers,
    brandReducers: BrandReducers,
    userReducers: UserReducers
})

export default rootReducer;