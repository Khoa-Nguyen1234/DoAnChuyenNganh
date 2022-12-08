import {
    LOAD_PRODUCT,
    SET_SIZE,
    SET_COLOR,
    SET_PRICE,
    SET_STOCK,
    SET_PER_PAGE,
    SET_PAGE,
    SET_SORT,
    CLEAR_FILTER,
    SET_BP,
    SET_GENDER,
    CLEAR_ALL,
    SET_NAME
} from "../actions/types";


    const initialState = {product: null, name: null, gender: null, bodyPart: null, category: null, totalPage: 1, currentPage: 1, perPage : 5, sortBy: null, filter: {size: null, priceLow: null, priceHigh: null, color: null, ava: null}};

    export default function (state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case LOAD_PRODUCT:
            return {
                ...state,
                product: payload.productList.product,
                totalPage: payload.productList.totalPage,
            }
        case SET_SIZE: 
            return {
                ...state,
                filter: {...state.filter ,size: payload},
            }
        case SET_COLOR: 
            return {
                ...state,
                filter: {...state.filter , color: payload},
            }

        case SET_PRICE:
            return{
                ...state,
                filter: {...state.filter ,priceLow: payload.low, priceHigh: payload.high},
            }
        case SET_STOCK:
            return{
                ...state,
                filter: {...state.filter ,ava: payload},
            }
        case SET_PAGE:
            return{
                ...state,
                currentPage: payload,
            }
        case SET_PER_PAGE:
            return{
                ...state,
                perPage: payload,
                currentPage: 1,
            }
        case SET_SORT:
            return{
                ...state,
                sortBy: payload,
                currentPage: 1,
            }
        case CLEAR_FILTER:
            return{
                ...initialState,
                bodyPart: state.bodyPart,
                gender: state.gender,
                name: state.name,
            }
        case SET_BP:
            return{
                ...state,
                bodyPart: payload,
            }
        case SET_GENDER:
            return{
                ...state,
                gender: payload,
            }
        case CLEAR_ALL:
            return{
                ...state,
                bodyPart: null, 
                gender: null,
                name: null,
            }
        case SET_NAME:
            return{
                ...state,
                name: payload,
            }
        default:
            return state;            
    }
}