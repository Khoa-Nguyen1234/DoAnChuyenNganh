import axios from "axios";

import authHeader from "./auth-header";
import pathApi from '../configs/apiPath';
import { ResponsiveEmbed } from "react-bootstrap";


const getPublicContent = () => {
  return axios.get(pathApi.PUBLIC_URL);
};

const uploadImage = (data) => {
  return axios.post(pathApi.ADD_PRODUCT, data ,{ headers: authHeader() });
}


const addProduct = (data) => {
  return axios.post(pathApi.ADD_PRODUCT_CART, data ,{ headers :authHeader()});
}

const getListProductAll = (data) => {
  const params = {
    page: data.currentPage,
    perPage: data.perPage,
    'price[$gte]': data.filter.priceLow,
    'price[$lte]': data.filter.priceHigh,
    'size[$in]': data.filter.size ? [data.filter.size] : [],
    'color[$in]':data.filter.color ? [data.filter.color] : [],
    inStock: data.filter.ava,
    sort: data.sortBy,
    gender: data.gender,
    bodyPart: data.bodyPart,
    'name[$regex]': data.name,
    'name[$options]': data.name ? 'i': null,
  };
  return axios.get(pathApi.SHOP_ALL, {params}).then(((response) => {
    return response.data;
  })); 
}

const getCategoryId = (data) => {
  const params = {
    gender: data.gender,
    bodyPart: data.bodyPart,
  };
  return axios.get(pathApi.CATEGORYID, {params}).then(((response) => {
    return response.data;
  })); 
}

const getDetailProduct = (product_id) => {
  return axios.get(pathApi.TO_PRODUCT +product_id).then(((response) => {
    return response.data;
  })); 
}

const getCart = () => {
  return axios.get(pathApi.CART ,{ headers :authHeader()}).then(((response) => {
    if (response.data) {
      localStorage.setItem("cart", JSON.stringify(response.data));
    }
    return response.data;
  }));
}

const removeProduct = (product_id) => {
  return axios.put(pathApi.REMOVE_PRODUCT+ product_id ,[],{ headers :authHeader()}).then(((response) => {
    return response.data;
  }));
}

const incPro = (product_id) => {
  return axios.put(pathApi.INCREASE_PRODUCT+ product_id ,[],{ headers :authHeader()}).then(((response) => {
    return response.data;
  }));
}

const descPro = (product_id) => {
  return axios.put(pathApi.DECREASE_PRODUCT+ product_id ,[],{ headers :authHeader()}).then(((response) => {
    return response.data;
  }));
}

const getProductInput = () => {
  return axios.get(pathApi.ADD_PRODUCT,{ headers :authHeader()}).then(((response) => {
    return response.data;
  }));
}

const checkout = (data) => {
  return axios.post(pathApi.CHECKOUT, data ,{ headers :authHeader()});
}

const getFilter = () => {
  return axios.get(pathApi.FILTER).then(((response) => {
    return response.data;
  }));
}

const getCategory = () => {
  return axios.get(pathApi.CATEGORY).then(((response) => {
    return response.data;
  }));
}

const getNothing = () => {
  return axios.get(pathApi.GET_NOTHING,{ headers :authHeader()}).then(((response) => {
    return response;
  }));
}

export default {
  getPublicContent,
  uploadImage,
  addProduct,
  getCart,
  removeProduct,
  incPro,
  descPro,
  getDetailProduct,
  getListProductAll,
  getProductInput,
  checkout,
  getFilter,
  getCategory,
  getCategoryId,
  getNothing
};