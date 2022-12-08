import {React, useState, useEffect} from 'react'
import './index.css'
import Nav from '../../components/nav';
import Navbottom from '../../components/nav_bottom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import OrderList from './components/OrderList';
import CheckOut from './components/CheckOut';




function Order() {

 
    return (
        <div >
            <Nav/>
            <div className="order-container">
                <h3>My bag</h3>
                <div className="my-bag-container">
                    <OrderList />
                    <CheckOut />
                </div>
            </div>
            <Navbottom/>
        </div>
    )
}

export default Order;