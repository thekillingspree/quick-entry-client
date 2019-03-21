import { apiCall, USER_PROFILE } from '../../utils';
import { SET_USER_HISTORY, LOGOUT_USER } from '../types';
import { addError, removeError } from './errors';

export const logoutUser = () => ({
    type: LOGOUT_USER
})

export const setHistory = history => ({
    type: SET_USER_HISTORY,
    history
})

export const getHistory = uid => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            apiCall('get', null, `${USER_PROFILE}?uid=${uid}`).then((user) => {
                dispatch(setHistory(user.history));
                removeError();
                resolve();
            }).catch((err) => {
                addError(err)
                reject(err);
            });

        });
    }
}