import {
    ADMIN_PRODUCT_LIST,
} from "../actions/types";

    const cart = JSON.parse(localStorage.getItem('cart'));

    const initialState = {product: null, totalPage: 1, totalProduct:1};

    export default function (state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case ADMIN_PRODUCT_LIST:
            return {
                ...payload.product_admin,
            }
        default:
            return state;            
    }
}