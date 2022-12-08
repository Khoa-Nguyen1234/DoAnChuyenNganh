import {
    SET_MESSAGE,
    ADDPRODUCT,
    GET_INPUT_PRODUCT,
    ADMIN_PRODUCT_LIST,
    ADMIN_ORDER_LIST
  } from "./types";
  
  import AdminService from "../services/user.service";
  import admin from "../services/admin.service";

  export const addProduct = (data) => async (dispatch) => {
    
    try {
        
        const response = await AdminService.uploadImage(data);
        dispatch({
            type: ADDPRODUCT,
        });
        dispatch({
            type:SET_MESSAGE,
            payload: response.data.message,
        });
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message || error.toString();
        
        dispatch({
            type:SET_MESSAGE,
            payload: message,
        })
    }
}


export const getInputProduct = () => {return (dispatch) => {
    return AdminService.getProductInput().then((response) => {
        dispatch({
            type: GET_INPUT_PRODUCT,
        });
        dispatch({
            type:SET_MESSAGE,
            payload: response.message,
        });
        
        return response;
    }, (error) => {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message || error.toString();
        
        dispatch({
            type:SET_MESSAGE,
            payload: message,
        })
        return;
    }
    );
}}

export const getProductList = (data) => {return (dispatch) => {
    return admin.getProductList(data).then((response) => {
        dispatch({
            type: ADMIN_PRODUCT_LIST,
            payload: { product_admin: response }
        });
        dispatch({
            type:SET_MESSAGE,
            payload: response.message,
        });
        
        return response;
    }, (error) => {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message || error.toString();
        
        dispatch({
            type:SET_MESSAGE,
            payload: message,
        })
        return;
    }
    );
}}

export const getOrderList = (data) => {return (dispatch) => {
    return admin.getOrderList(data).then((response) => {
        dispatch({
            type: ADMIN_ORDER_LIST,
            payload: { order: response }
        });
        dispatch({
            type:SET_MESSAGE,
            payload: response.message,
        });
        
        return response;
    }, (error) => {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message || error.toString();
        
        dispatch({
            type:SET_MESSAGE,
            payload: message,
        })
        return;
    }
    );
}}




