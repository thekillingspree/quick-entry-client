import { combineReducers } from 'redux';
import admin from './admin';
import errors from './errors';
import user from './user';

const rootReducer = combineReducers({
    admin,
    errors,
    user
});

export default rootReducer;