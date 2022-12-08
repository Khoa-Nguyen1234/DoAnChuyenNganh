import React, { Component, useState, useEffect, useRef } from 'react';
import { Dropdown, DropdownButton, Row, Col, Container, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Login from './Login'
import Register from './Register'
import ForgotPass from './ForgotPass'

import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../actions/auth'
import {getListProductAll} from '../actions/userService'
import {SET_BP, SET_GENDER} from '../actions/types'
import userService from '../services/user.service'

import {loginPopup, loginExit, registerPopup,registerExit, forgotExit} from '../actions/'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'



function Nav (props) {

    const isLoggedIn = useSelector(state=> state.auth.isLoggedIN);
    const login = useSelector(state=> state.login);
    const forgot = useSelector(state=> state.forgot);
    const register = useSelector(state=> state.register);

    const cart = useSelector(state=> state.cart);

    const [avatarToggle, setToggleAvatar] = useState(false);
    const [cartToggle, setToggleCart] = useState(false);
    const [dropDown, setDropdown] = useState([]);
    const [inputValue, setInput] = useState("");
    const linkSearch = useRef(null);

    const dispatch = useDispatch();

    const handleInputChange = (e) => {

        setInput(e.target.value);
        
    }

    const handleInputSearch = (e) => {
        if(e.key === 'Enter'){
            linkSearch.current.click(); 
        }
    }



    useEffect(async() => {
        const tempCategory = await userService.getCategory();
        setDropdown(tempCategory.result.map(gender => ({gender_id: gender.gender_id, gender_name: gender.gender, bodyPart: gender.bodyPart.map(item => ({name: item.bp, bp_id: item.bp_id}))})));

    },[])

    
        return (
            <div>
            <div>
                <Container className="header">
                    <Row className="header-first">
                        <Col className="header-search">
                            <input className="search-input" onKeyDown={handleInputSearch} type="text" placeholder="Search" value={inputValue} onChange={handleInputChange}/>
                            <Link to={`/search?name=${inputValue}`}>
                                <button style={{display: 'none'}} ref={linkSearch}></button>
                            </Link>
                        </Col>
                        <Col className="header-logo" xs={6}>
                            <Link to='/'><img src={process.env.PUBLIC_URL + "/logo1.svg"}></img></Link>
                            
                        </Col>
                        <Col className="header-info">
                            {isLoggedIn ? <div className="myDropdown">
                                    <a href="#" onClick={()=> setToggleAvatar(!avatarToggle)}>
                                        <img className="userPic" src={process.env.PUBLIC_URL+ "/logo_user.jpg" } />
                                    </a>
                                    <div className={avatarToggle ? "myDropdownContent showz" : "myDropdownContent" }>
                                        <a href="#" ><span>Account</span></a>
                                        <a href="#" onClick={() => dispatch(logout())}><span>Log out</span></a>
                                    </div>
                                </div> : 
                                <div className="login-register">
                                    <Register show={register} onHide={() => dispatch(registerExit())}/>
                                    <Login show={login} onHide={() => dispatch(loginExit())}/>
                                    
                                    <Button className="register-button" variant="primary" onClick={() => dispatch(registerPopup())}>
                                        Register
                                    </Button>
                                    <Button className="login-button" variant="primary" onClick={() => {dispatch(loginPopup())}}>
                                        Login
                                    </Button>
                                    <ForgotPass show={forgot} onHide={() => dispatch(forgotExit())}/>
                                </div>
                            }
                        <button className="button-cart" onClick={() => setToggleCart(!cartToggle)}>
                        <img src={process.env.PUBLIC_URL + "/cart.svg"}/>
                        <span className='myBadge' id='lblCartCount'>{cart.cart ? (cart.cart.productList ? cart.cart.productList.length : 0) : 0}</span>
                        </button>
                        <div className={cartToggle ? "cart-dropdown showz" : "cart-dropdown" }>
                            <div>
                            {cart.cart ? (cart.cart.productList ? cart.cart.productList.slice(0, 3).map((product) => 
                                    <div className="cart-product-mini">
                                        <div className="cart-mini-left">
                                            <img className="cart-mini-picture" src={product.photos && product.photos[0]}></img>
                                        </div>
                                        <div className="cart-mini-right">
                                            <h5>{product.name}</h5>
                                            <div className="cart-mini-info">
                                                <p>${product.price}</p>
                                                <p>{product.size} • {product.color} • {product.quantity} pcs </p>
                                            </div>
                                        </div>
                                    </div>
                            ): ""): ""}
                            </div>
                            <div className="cart-show-all"><Link to='/cart'>View cart</Link></div>
                        </div>
                        
                        
                        </Col>
                    </Row>
                </Container>
                <hr border="1px solid"/>
            </div>
            <div>
                    <Container className="header">

                <Row>
                    {/* <Col>
                    <img className="sub-image"  src={process.env.PUBLIC_URL+'/logo1.svg'} />    
                    </Col> */}
                    <Col className="all-dropdown">
                    {dropDown ? dropDown.map(dropdown => 
                        <Dropdown className="header-dropdown">        
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {dropdown.gender_name} <img src= {process.env.PUBLIC_URL + '/arrow.svg'}></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu menuAlign="center" className="dropdown-menu">
                            {dropdown.bodyPart.map(list => 
                                    <Dropdown.Item href={`/shop/${dropdown.gender_name}/${list.name}`}>{list.name}</Dropdown.Item>
                                )}
                        </Dropdown.Menu>
                        </Dropdown>
                        ): ""}
                
                    </Col>
                </Row>

            </Container>
            <hr border="1px solid"/>
            </div>
            </div>
        )
    
}

export default Nav;