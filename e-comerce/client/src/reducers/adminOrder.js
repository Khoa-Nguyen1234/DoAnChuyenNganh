import {
    ADMIN_ORDER_LIST,
} from "../actions/types";


    const initialState = {order: null, totalPage: 1, totalProduct:1};

    export default function (state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case ADMIN_ORDER_LIST:
            return {
                ...payload.order,
            }
        default:
            return state;            
    }
}