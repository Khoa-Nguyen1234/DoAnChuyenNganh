import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    ADDPRODUCT,
  } from "./types";

  import {getCart} from './userService'
  
  import AuthService from "../services/auth.service";

//   export const register = (username, email, password) => (dispatch) => {
//     return AuthService.registerMethod(username, email, password).then(
//       (response) => {
//         dispatch({
//           type: REGISTER_SUCCESS,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: response.data.message,
//         });
  
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         dispatch({
//           type: REGISTER_FAIL,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
  
//         return Promise.reject();
//       }
//     );
//   };

export const register = (name, email, password) => async (dispatch) => {
    
        try {
            
            const response = await AuthService.registerMethod(name, email, password);
            dispatch({
                type: REGISTER_SUCCESS,
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
                type: REGISTER_FAIL,
            });
            dispatch({
                type:SET_MESSAGE,
                payload: message,
            })
        }
    }


    export const login = (username, password) => (dispatch) => {
        return AuthService.loginMethod(username, password).then(
          (data) => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: { user: data },
            });
            dispatch(getCart());
            return Promise.resolve();
          },
          (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            dispatch({
              type: LOGIN_FAIL,
            });
      
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
      
            return Promise.reject();
          }
        );
      };

export const logout = () => (dispatch) => {
    AuthService.logoutMethod();
  
    dispatch({
      type: LOGOUT,
    });
};
  