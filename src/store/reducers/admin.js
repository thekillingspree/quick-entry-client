import { SET_CURRENT_ADMIN, GET_ADMIN_ROOMS } from '../types';

const DEF_STATE = {
    isAuthenticated: false,
    admin: {},
    rooms: []
}

export default (state=DEF_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_ADMIN:
            return {
                isAuthenticated: !!Object.keys(action.admin).length,
                admin: action.admin
            };
        case GET_ADMIN_ROOMS:
            return {
                ...state,
                rooms: action.rooms
            }
        default:
            return state;
    }
};
