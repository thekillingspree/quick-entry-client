import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import admin from './admin';
import errors from './errors';
import user from './user';

const persistConfig = {
    key: 'quickentry-root',
    blacklist: ['errors'],
    storage
};

const rootReducer = persistCombineReducers(persistConfig, {
    admin,
    errors,
    user
});

export default rootReducer;