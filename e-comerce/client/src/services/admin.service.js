import axios from "axios";

import authHeader from "./auth-header";
import pathApi from '../configs/apiPath';

const getProductList = (data) => {
    const params = {
        page: data.page,
        perPage: data.perPage,
        sort: data.sort,
    };
    const config = {
        headers : authHeader(),
        params: params,
    };
    return axios.get(pathApi.ADMIN_MANAGE_PRODUCT, config).then(((response) => {
        return response.data;
    })); 
};

const getOrderList = (data) => {
    const params = {
        page: data.page,
        perPage: data.perPage,
        sort: data.sort,
    };
    const config = {
        headers : authHeader(),
        params: params,
    };
    return axios.get(pathApi.ADMIN_MANAGE_ORDER, config).then(((response) => {
        return response.data;
    })); 
};

const deleteProduct = (product_id) => {
    return axios.delete(pathApi.ADMIN_MANAGE_PRODUCT+'/'+product_id,{ headers :authHeader()}).then(((response) => {
        return response.data;
    })); 
};

const changeStock = (data) => {
    const toSend = {quantity: data.quantity};
    return axios.post(pathApi.ADMIN_MANAGE_PRODUCT+'/'+data.product_id, toSend,{ headers :authHeader()}).then(((response) => {
        return response.data;
    })); 
};

const updateStatus = (data) => {
    const toSend = {status: data.status};
    return axios.post(pathApi.ADMIN_MANAGE_ORDER+'/'+data.order_id, toSend,{ headers :authHeader()}).then(((response) => {
        return response.data;
    })); 
};


export default {
    getProductList,
    deleteProduct,
    changeStock,
    getOrderList,
    updateStatus
};