const DB_URL = 'http://localhost:9000'

 const pathApi = {
    LOGIN: DB_URL + '/auth/login',
    REGISTER: DB_URL + '/auth/register',
    PUBLIC_STORE: DB_URL + '/all',
    NAV_INFO: DB_URL + '/',
    ADD_PRODUCT: DB_URL + '/admin/add-product',
    TO_PRODUCT: DB_URL + '/product/',
    ADD_PRODUCT_CART: DB_URL +'/cart/add',
    CART: DB_URL +'/cart',
    REMOVE_PRODUCT: DB_URL + '/cart/delete/',
    INCREASE_PRODUCT: DB_URL + '/cart/increase/',
    DECREASE_PRODUCT: DB_URL + '/cart/decrease/',
    SHOP_ALL: DB_URL + '/shop/all',
    CHECKOUT: DB_URL +'/cart/checkout',
    ADMIN_MANAGE_PRODUCT: DB_URL + '/admin/product',
    ADMIN_MANAGE_ORDER: DB_URL + '/admin/order',
    FILTER: DB_URL + '/filter',
    CATEGORY: DB_URL + '/category',
    CATEGORYID: DB_URL + '/categoryId',
    GET_NOTHING: DB_URL + '/get-nothing',
}
export default pathApi
