import { SET_CURRENT_USER, SET_CURRENT_ADMIN } from '../types';
import { apiCall, setAuthTokens } from '../../utils';
import { addError, removeError } from './errors';

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export const setCurrentAdmin = (admin) => {
    return {
        type: SET_CURRENT_ADMIN,
        admin
    }
}

export const authUser = (user, url) => {
    const isAdmin = url.split('/')[1] === 'admin';
    return dispatch => {
        return new Promise ((resolve, reject) => {
            apiCall('post', user, url).then((user) => {
                console.log(user)
                localStorage.setItem('auth', user.token);
                setAuthTokens(user.token);
                if (isAdmin) {
                    dispatch(setCurrentAdmin(user))
                } else { 
                    dispatch(setCurrentUser(user))
                }
                console.log(user.token);
                dispatch(removeError())
                resolve();
            }).catch((msg) => {
                dispatch(addError(msg))
                reject();
            });
        });
    }
}