import axios from 'axios';

export const API_URL = 'https://quick-entry.herokuapp.com/api';

export const USER_LOGIN = '/users/login';
export const USER_SIGN_UP = '/users/signup';
export const PROFILE = '/users/profile'; //GET

export const ADMIN_LOGIN = '/admin/login';
export const ADMIN_SIGN_UP = '/admin/signup';
export const ADMIN_GET_ROOMS = '/admin/rooms'; //GET
export const ADMIN_NEW_ROOM = '/rooms/new';

export const authMapStateToProps = state => (
    {
        error: state.errors.message,
        isUserAuthenticated: state.user.isAuthenticated
    }
)

export const apiCall = (method, data, url) => {
    return new Promise((resolve, reject) => {
        axios[method](`${API_URL}${url}`, data).then((result) => {
            resolve(result.data)
        }).catch((err) => {
            reject(err.response.data.error);
        });
    });
}