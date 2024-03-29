import { SET_CURRENT_ADMIN, GET_ADMIN_ROOMS, LOGOUT_ADMIN } from '../types';

const DEF_STATE = {
    isAuthenticated: false,
    admin: {},
    rooms: []
}

export default (state=DEF_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_ADMIN:
            return {
                ...state,
                isAuthenticated: !!Object.keys(action.admin).length,
                admin: action.admin,
            };
        case GET_ADMIN_ROOMS:
            return {
                ...state,
                rooms: action.rooms
            };
        case LOGOUT_ADMIN:
            return DEF_STATE;
        default:
            return state;
    }
};
