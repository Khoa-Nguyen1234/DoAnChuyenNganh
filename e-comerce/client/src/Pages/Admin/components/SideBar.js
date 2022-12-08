import React, { Component, useState } from 'react';
import { Dropdown, DropdownButton, Row, Col, Container, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'

import {useSelector, useDispatch} from 'react-redux'


import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'



function SideBar (props) {

    const isLoggedIn = useSelector(state=> state.auth.isLoggedIN)

    const dispatch = useDispatch();

    
    
        return (
            <div className="admin-sidebar">
                <img className="admin-logo" src={process.env.PUBLIC_URL + '/logo.svg'} />
                <Link to='/admin/order'>
                <div className="admin-sidebar-item-container">
                    <div className="admin-sidebar-item">
                        <div className="admin-select-tab"></div>
                        <div className="admin-item-name">
                            <img src={process.env.PUBLIC_URL + '/orders-dark.svg'}/>
                            <p>Orders</p>
                        </div>
                    </div>
                </div>
                </Link>
                <Link to='/admin/product'>
                <div className="admin-sidebar-item-container">
                    <div className="admin-sidebar-item active">
                        <div className="admin-select-tab"></div>
                        <div className="admin-item-name ">
                            <img src={process.env.PUBLIC_URL + '/products-dark.svg'}/>
                            <p>Products</p>
                        </div>
                    </div>
                </div>
                </Link>
            </div>

        )
    
}

export default SideBar;