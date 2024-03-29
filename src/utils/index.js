import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import _ from 'lodash';
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

export const checkPw = password => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/
    return pattern.test(password)
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const genDaysArray = () => days.map(name => ({name, sum: 0, count: 0}));

export const getDayIndex = day => {
    return days.map(_ => _.slice(0, 3)).indexOf(day)
}

export const genChartDataAdmin = data => {
    let result = genDaysArray();
    data.forEach(entry => {
        const day = entry[2];
        const time = entry[5];
        const i = getDayIndex(day.split(',')[0]);
        console.log(day.split(','), result, i)
        console.log(i)
        result[i].sum += time;
        result[i].count++;
    });
    for (let i = 0; i < result.length; i++) {
        if (result[i].count === 0) {
            result[i].avg = 0;
            continue;
        }
        result[i].avg = Math.ceil(result[i].sum / result[i].count);
    }
    return result;
}

//Chart logic for users.
export const genChartDataUser = data => {
    let result = []
    console.log(data);
    data.forEach(entry => {
        const room = entry[0];
        const time = entry[4];
        const i = _.findIndex(result, ['name', room]);
        if (i === -1) {
            result.push({
                name: room,
                avg: time,
                count: 1
            });
            console.log(result);
        } else {
            result[i].avg += time;
            result[i].count++;
        }
    });
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        if (result[i].count === 0) {
            result[i].avg = 0;
            continue;
        }
        result[i].avg = Math.ceil(result[i].avg / result[i].count);
    }
    return result;
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