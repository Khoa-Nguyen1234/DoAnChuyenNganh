import React, { Component, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Row, Col, Container, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import {SET_SORT, SET_PAGE, SET_PER_PAGE} from '../../../actions/types'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {getListProductAll} from '../../../actions/userService';


import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { getContrastRatio } from '@material-ui/core';



function Product(props) {

    const [sortToggle, setSortToggle] = useState(false);
    const [perPageToggle, setPerPageToggle] = useState(false);
    const dispatch = useDispatch();

    const searchList = useSelector(state => state.searchList);
    const totalPage = searchList.totalPage || 1;
    const currentPage = searchList.currentPage || 1;
    const perPage = searchList.perPage || 5;
    const sortBy = searchList.sortBy || 0;
    const sortType = ['Popularity', 'Name', 'Price'];

        useEffect(async () => {
        },[]);

        const handleSort = (e, value) => {
            e.preventDefault();
            dispatch({type: SET_SORT, payload: value});
            setSortToggle(!sortToggle);
            dispatch(getListProductAll());
        }

        const handlePage = (value) => {
            dispatch({type: SET_PAGE, payload: value});
            dispatch(getListProductAll());
        }

        const handlePerPage = (value) => {
            dispatch({type: SET_PER_PAGE, payload: value});
            setPerPageToggle(!perPageToggle);
            dispatch(getListProductAll());
        }


        return(
            <div className="product-container">
                
                <div className="product-page">
                    <button className="filter-size sort" onClick={() => setSortToggle(!sortToggle)}>
                        <p>Sort by: </p>
                        <h3>{sortType[sortBy]}</h3>
                        <img src={process.env.PUBLIC_URL + '/arrow.svg'}/>
                    </button>
                    <div className={sortToggle ? "myDropdownContentz showz" : "myDropdownContentz" }>
                        <button onClick={e => handleSort(e, 0)}><span>{sortType[0]}</span></button>
                        <button onClick={e => handleSort(e, 1)}><span>{sortType[1]}</span></button>
                        <button onClick={e => handleSort(e, 2)}><span>{sortType[2]}</span></button>
                    </div>
                    <div className="product-page-tab">
                        <button className="filter-size sort" onClick={() => setPerPageToggle(!perPageToggle)}>
                            <p>Per page: </p>
                            <h3>{perPage}</h3>
                            <img src={process.env.PUBLIC_URL + '/arrow.svg'}/>
                        </button>
                        <div className={perPageToggle ? "per-page-dropdown showz" : "per-page-dropdown" }>
                            <button onClick={() => {handlePerPage(3);}}><span>3</span></button>
                            <button onClick={() => {handlePerPage(5);}}><span>5</span></button>
                            <button onClick={() => {handlePerPage(7);}}><span>7</span></button>
                            <button onClick={() => {handlePerPage(10);}}><span>10</span></button>
                        </div>
                        <img className="left-icon" src={process.env.PUBLIC_URL+'/arrow.svg'} onClick={() => {if(currentPage>1){handlePage(currentPage-1)}}}/>
                        <p>{currentPage}/{totalPage}</p>
                        <img className="right-icon" src={process.env.PUBLIC_URL+'/arrow.svg'} onClick={() => {if(currentPage<totalPage){handlePage(currentPage+1)}}}/>
                    </div>
                </div>
                <div className="product-item-container">
                    {searchList.product ? searchList.product.map((product) => <div className="product-item">
                    <Link to={'/product/'+product._id} >
                    <div className="img-product"><img src={product.photos[0]}/></div>
                    {product.quantity-product.sold===0 ? <div className="product-sold-out"><p>Sold out</p></div> : ""}
                    <div className="product-quick-shop"><p>+ Quick shop</p></div>
                    <h3>{product.name}</h3></Link>
                    <p>${product.price}</p>
                </div>) : ""}
                </div>
                <div className="product-page-end">
                    <div className="product-page-tab">
                    <img className="left-icon" src={process.env.PUBLIC_URL+'/arrow.svg'} onClick={() => {if(currentPage>1){handlePage(currentPage-1)}}}/>
                        <p>{currentPage}/{totalPage}</p>
                        <img className="right-icon" src={process.env.PUBLIC_URL+'/arrow.svg'} onClick={() => {if(currentPage<totalPage){handlePage(currentPage+1)}}}/>
                    </div>
                </div>
            </div>
        )
}

export default Product;