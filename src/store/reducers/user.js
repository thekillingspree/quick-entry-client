import { SET_CURRENT_USER } from '../types';

const DEF_STATE = {
    isAuthenticated: false,
    user: {}
}

export default (state=DEF_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
        default:
            return state;    
    }
}