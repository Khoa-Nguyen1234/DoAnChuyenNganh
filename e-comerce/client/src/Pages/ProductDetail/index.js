import React from 'react'
import Similar from './components/Similar'
import Review from './components/Review'
import ProductInfo from './components/ProductInfo'
import './index.css'
import Nav from '../../components/nav';
import Navbottom from '../../components/nav_bottom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

function ProductDetail({match}) {
    const product_id = match.params.product_id;
    return (
        <div >
                <Nav/>
                <div className="product-detail">
                <ProductInfo product_id={product_id}/>
                <Review/>
                <Similar/>
                </div>
                <Navbottom/>
        </div>
    )
}

export default ProductDetail;
