import { GET_ADMIN_ROOMS, LOGOUT_ADMIN } from '../types';
import { apiCall, ADMIN_NEW_ROOM, ADMIN_ROOM_INFO } from '../../utils';
import { addError, removeError } from './errors';


export const logoutAdmin = () => ({
    type: LOGOUT_ADMIN
})

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

export const createNewRoom = room => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            apiCall('post', room, ADMIN_NEW_ROOM).then((res) => {
                console.log(res);
                dispatch(removeError())
                resolve();
            }).catch((err) => {
                dispatch(addError(err))
                reject(err);
            });
        });
    }
}

export const getRoomDetails = (uid, rid) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            apiCall('get', null, `${ADMIN_ROOM_INFO}?id=${uid}&rid=${rid}`).then((room) => {
                console.log(room);
                dispatch(removeError())
                resolve(room);
            }).catch((err) => {
                dispatch(addError(err))
                reject(err);
            });
        });
    }
}