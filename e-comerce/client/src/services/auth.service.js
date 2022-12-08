import axios from "axios";

import pathApi from '../configs/apiPath'

const registerMethod = (name, email, password) => {
    const data = {
        name: name,
        username: email,
        password: password,
    }
    return axios.post(pathApi.REGISTER, data);
}

const loginMethod = (email, password) => {
    const data = {
        username: email,
        password: password,
    }
    return axios.post(pathApi.LOGIN, data).then(((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }));
}

const logoutMethod = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
}

export default {
    registerMethod,
    loginMethod,
    logoutMethod,
};