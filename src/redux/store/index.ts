import allReducers from '../reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
)

export const persistor = persistStore(store)

export default store;