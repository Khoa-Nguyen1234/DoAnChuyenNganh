import {combineReducers} from 'redux';
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import forgotReducer from './forgotReducer'
import loggedReducer from './isLogged'
import auth from './auth'
import cart from './cart'
import message from './message'
import adminProductList from './adminProductList'
import adminOrder from './adminOrder'
import searchList from './searchList'


const allReducers = combineReducers({
    forgot: forgotReducer,
    login: loginReducer,
    register: registerReducer,
    logged: loggedReducer,
    auth,
    message,
    cart,
    adminProductList,
    adminOrder,
    searchList
})

export default allReducers