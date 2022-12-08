import React, { Component, useEffect } from 'react';
import Nav from '../../components/nav'
import Navbottom from '../../components/nav_bottom'
import Product from './components/Product'
import {useDispatch, useSelector} from 'react-redux';
import Filter from './components/Filter'
import {BrowserRouter as Router, Route, Switch, Link, useLocation} from 'react-router-dom'
import './components/index.css'
import {CLEAR_ALL, SET_BP, SET_GENDER, SET_NAME} from '../../actions/types'
import {getListProductAll} from '../../actions/userService'
import userService from '../../services/user.service'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


function ProductList ({match}) {
    const query = useQuery();
    const gender = match.params.gender;
    const bodyPart = match.params.bodyPart;
    const dispatch = useDispatch();

    useEffect(async() => {
        console.log(query);
        if((gender&&bodyPart) || (gender)) {
            dispatch({type: CLEAR_ALL});
            const result = await userService.getCategoryId({gender: gender, bodyPart: bodyPart});
            dispatch({type: SET_BP, payload: result.bodyPart});
            dispatch({type: SET_GENDER, payload: result.gender});
        }else if(query.get('name')){
            dispatch({type: CLEAR_ALL});
            dispatch({type: SET_NAME, payload: query.get('name')});
        }else{
            dispatch({type: CLEAR_ALL});
        }
        dispatch(getListProductAll());
    },[query.get('name')])

    return (
      <div className="Home">
          <Nav></Nav>
          
          <p className="categories-header">{gender || ""}/{bodyPart||""}</p>
          <div className="product-list-container">
              <Filter className="left"></Filter>
              <Product></Product>
          </div>
          <Navbottom></Navbottom>
      </div>
    );
}


export default ProductList;