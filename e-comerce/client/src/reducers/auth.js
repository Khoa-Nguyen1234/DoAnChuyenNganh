import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

    const user = JSON.parse(localStorage.getItem('user'));

    const initialState = user ? {isLoggedIN: true, user} : {isLoggedIN: false, user: null};

    export default function (state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIN: false,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIN: false,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIN: true,
                user: payload.user,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIN: false,
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIN: false,
            }
        default:
            return state;            
    }
}