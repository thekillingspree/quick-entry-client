import { GET_ADMIN_ROOMS } from '../types';
import { apiCall } from '../../utils';
import { addError, removeError } from './errors';

export const getRooms = rooms => ({
    type: GET_ADMIN_ROOMS,
    rooms
});


export const getRoomsApi = url => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            apiCall('get', null, url).then((rooms) => {
                dispatch(getRooms(rooms));
                console.log(rooms);
                dispatch(removeError());
                resolve();
            }).catch((err) => {
                dispatch(addError(err));
                console.error(err);
                reject();
            });
        });
    }
}