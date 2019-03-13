import axios from 'axios';

export const API_URL = "https://quick-entry.herokuapp.com/api";

export const authMapStateToProps = state => (
    {
        error: state.errors.message
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