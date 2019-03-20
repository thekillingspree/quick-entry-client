import { SET_CURRENT_USER, SET_USER_HISTORY } from '../types';

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
        case SET_USER_HISTORY:
            return {
                ...state,
                user: {
                    ...state.user,
                    history: [...action.history]
                }
            };
        default:
            return state;    
    }
}