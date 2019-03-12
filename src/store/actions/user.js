import axios from 'axios';
import { SET_CURRENT_USER } from '../types';
import { API_URL } from '../../utils';
import { addError, removeError } from './errors';

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export const signUpUser = user => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${API_URL}/users/signup`, user).then((res) => {
                const data = res.data;
                const u = {
                    ...data.result,
                    token: data.token
                }
                console.log(u)
                dispatch(setCurrentUser(u))
                dispatch(removeError())
                resolve();
            }).catch((err) => {
                const msg = err.response.data.error;
                console.log(msg);
                dispatch(addError(msg))
                reject();
            });
        });
    }
}

export const signInUser = user => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${API_URL}/users/login`, user).then((res) => {
                const data = res.data;
                const u = {
                    ...data.result,
                    token: data.token
                }
                console.log(u)
                dispatch(setCurrentUser(u))
                dispatch(removeError())
                resolve();
            }).catch((err) => {
                const msg = err.response.data.error;
                console.log(msg);
                dispatch(addError(msg))
                reject();
            });
        });
    }
}