import {
    ADDPRODUCT ,
    ADD_CART ,
    GET_CART,
    REMOVE_PRODUCT,
    INCREASE_PRODUCT,
    DECREASE_PRODUCT,
    LOGOUT,
} from "../actions/types";

    const cart = JSON.parse(localStorage.getItem('cart'));

    const initialState = cart ? {trigger: true, cart} : {trigger: true, cart: null};

    export default function (state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_CART:
            return {
                ...state,
                cart: payload.cart,
                trigger: !state.trigger,
            }
        case LOGOUT:
            return {
                cart: null,
                trigger: !state.trigger,
            }
        default:
            return state;            
    }
}