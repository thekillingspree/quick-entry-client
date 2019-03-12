import axios from 'axios';
import { SET_CURRENT_ADMIN } from '../types';
import { API_URL } from '../../utils';
import { addError, removeError } from './errors';


export const setCurrentAdmin = admin => {
    return {
        type: SET_CURRENT_ADMIN,
        admin
    }
}

//TODO: DRY API CALL. REFACTOR user AND admin.
export const signUpAdmin = admin => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${API_URL}/api/admin/signup`, admin).then((res) => {
                const data = res.data;
                const a = {
                    ...data.result,
                    token: data.token
                }
                console.log(a)
                dispatch(setCurrentAdmin(a))
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
