import React, { Component } from 'react';
import { Dropdown, DropdownButton, Row, Col, Container, Button, Image } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'



function Product(props) {


        return(
            <Container className="product">
                {/* <Row className='bgleft'>
                <Col>
                    <img src="https://www.yonex.com/static/version1664212785/frontend/Yonex/base/default/images/Yonex_Logo.svg  " />
                    </Col>
                </Row>   */}
                
                <Row className="product-week">
                    <Col className="product-week-image" >
                        <img className="week-image" src={process.env.PUBLIC_URL+'/bg1.jpg'} />
                        <h1 className="week-text">NEW PRODUCT</h1>
                        <Link to='/shop' className="week-shop">Shop now</Link>
                        
                    </Col>
                </Row>
                <Row>
                <Col xs={3}>
                    <img className="sub-image"  src={process.env.PUBLIC_URL+'/ax77-t.webp'} />
                    <div className="sub-text">
                        <h3>RACQUETS TENNIS</h3>
                    </div>
                    <Link to='/shop/TENNIS' className="home-shop">Shop now</Link>
                </Col>
                <Col xs={3}>
                    <img className="sub-image"  src={process.env.PUBLIC_URL+'/sp1.2.jpg'} />
                    <h3 className="sub-text">SHOES</h3>
                    <Link to='/shop/GOLF' className="home-shop">Shop now</Link>
                </Col>
                <Col xs={3}>
                    <img className="sub-image"  src={process.env.PUBLIC_URL+'/balo1.webp'} />
                    <h3 className="sub-text">BAGS</h3>                    
                    <Link to='/shop/SALE OFF' className="home-shop">Shop now</Link>
                </Col>
                <Col xs={3}>
                    <img className="sub-image"  src={process.env.PUBLIC_URL+'/aobg1.webp'} />
                    <h3 className="sub-text">BADMINTON</h3>
                    <Link to='/shop/BADMINTON' className="home-shop">Shop now</Link>
                </Col>
                </Row>
            </Container>
        )
}

export default Product;