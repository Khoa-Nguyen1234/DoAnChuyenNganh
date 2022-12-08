import React from 'react'
import SideBar from './components/SideBar'
import EditProduct from './components/EditProduct'
import OrderManagement from './components/OrderManagement'
import ProductManagement from './components/ProductManagement'
import {useSelector} from 'react-redux'
import './index.css'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

function AdminProduct() {   

    

    return (
        <div className="admin-product">
            <SideBar/>
            <Route path='/admin/product'>
                <ProductManagement/>
            </Route>
            <Route path='/admin/add-product'>
                <EditProduct/>
            </Route>
            <Route path='/admin/order'>
                <OrderManagement/>
            </Route>
        </div>
    )
}

export default AdminProduct;
