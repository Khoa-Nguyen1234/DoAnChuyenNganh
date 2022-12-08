import {
    SET_MESSAGE,
    ADD_CART,
    GET_CART,
    LOAD_PRODUCT,
    LOAD_DETAIL_PRODUCT,
    REMOVE_PRODUCT,
    DECREASE_PRODUCT,
    INCREASE_PRODUCT,
    CHECKOUT
  } from "./types";
  
  import userService from "../services/user.service";

  export const addProductCart = (data) => async (dispatch) => {
    
    try {
        
        const response = await userService.addProduct(data);
        dispatch({
            type: ADD_CART,
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


// export const getCart = () => async (dispatch) => {
    
//     try {
        
//         const response = await userService.getCart();
//         console.log(response);
        
//         dispatch({
//             type: GET_CART,
//         });
//         dispatch({
//             type:SET_MESSAGE,
//             payload: response.data.message,
//         });
        
//         return response;

//     } catch (error) {
//         const message = (error.response &&
//             error.response.data &&
//             error.response.data.message) || error.message || error.toString();
        
//         dispatch({
//             type:SET_MESSAGE,
//             payload: message,
//         })
//     }
// }



export const getCart = () => (dispatch) => {
    return  userService.getCart().then((response) => {
        dispatch({
            type: GET_CART,
            payload: { cart: response }
        });
        dispatch({
            type: SET_MESSAGE,
            payload: response.message,
        });
        
        return Promise.resolve();
    }, (error) => {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message || error.toString();
        
        dispatch({
            type:SET_MESSAGE,
            payload: message,
        })
        return;
    })
}


export const getProduct = (product_id) => {return async (dispatch) => {
    return await userService.getDetailProduct(product_id).then((response) => {
        dispatch({
            type: LOAD_DETAIL_PRODUCT,
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

export const getListProductAll = () => { return async (dispatch, getState) => {
    const {searchList} = getState();
    return await userService.getListProductAll(searchList).then((response) => {
        dispatch({
            type: LOAD_PRODUCT,
            payload: {productList: response}
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


export const removeProduct = (product_id) => {return async (dispatch) => {
    return await userService.removeProduct(product_id).then((response) => {
        dispatch({
            type: REMOVE_PRODUCT,
        });
        dispatch({
            type:SET_MESSAGE,
            payload: response,
        });
        
        return Promise.resolve();
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

export const increaseProduct = (product_id) => {return async (dispatch) => {
    return await userService.incPro(product_id).then((response) => {
        dispatch({
            type: INCREASE_PRODUCT,
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


export const decreaseProduct = (product_id) => {return async (dispatch) => {
    return await userService.descPro(product_id).then((response) => {
        dispatch({
            type: DECREASE_PRODUCT,
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


export const checkout = (data) => {return async (dispatch) => {
    return await userService.checkout(data).then((response) => {
        dispatch({
            type: CHECKOUT,
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


export const setSize = (data) => {return async (dispatch) => {
    return await userService.checkout(data).then((response) => {
        dispatch({
            type: CHECKOUT,
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


