import { combineReducers } from 'redux'
import TokenReducers from './tokenReducers'

const rootReducer = combineReducers({
    tokenReducer: TokenReducers
})

export default rootReducer;