import { ADD_ERROR, REMOVE_ERROR } from '../types';

export const addError = message => {
    return {
        type: ADD_ERROR,
        message
    }
}

export const removeError = message => {
    return {
        type: REMOVE_ERROR
    }
}