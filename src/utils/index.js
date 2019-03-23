import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';

export const API_URL = 'https://quick-entry.herokuapp.com/api';

export const USER_LOGIN = '/users/login';
export const USER_SIGN_UP = '/users/signup';
export const USER_PROFILE = '/users/profile'; //GET

export const ADMIN_LOGIN = '/admin/login';
export const ADMIN_SIGN_UP = '/admin/signup';
export const ADMIN_GET_ROOMS = '/admin/rooms'; //GET
export const ADMIN_NEW_ROOM = '/rooms/new';
export const ADMIN_ROOM_INFO = '/rooms/view'; //GET

export const authMapStateToProps = state => (
    {
        error: state.errors.message,
        isUserAuthenticated: state.user.isAuthenticated,
        isAdminAuthenticated: state.admin.isAuthenticated,
        user: state.user.user,
        admin: state.admin
    }
)

export const errorMSP = state => ({
    error: state.errors.message
})

export const setAuthTokens = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(axios.defaults.headers.common['Authorization'])
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const apiCall = (method, data, url) => {
    console.log(url, axios.defaults.headers.common['Authorization'])
    return new Promise((resolve, reject) => {
        axios[method](`${API_URL}${url}`, data).then((result) => {
            resolve(result.data)
        }).catch((err) => {
            reject(err.response.data.error);
        });
    });
}

export const getMUITheme = () => {
    return createMuiTheme({
        overrides: {
            MUIDataTableToolbar: {
                icon: {
                    '&:hover': {
                        color: '#9a81d4'
                    }
                },
                titleText: {
                    fontFamily: 'Poppins',
                    fontWeight: 'normal',
                }
            },
            MuiTable: {
                root: {
                    fontFamily: 'Poppins'
                }
            },
            MuiTypography: {
                caption: {
                    fontFamily: 'Poppins'
                }
            }
        }
    })
}