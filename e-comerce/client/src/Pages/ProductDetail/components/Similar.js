import {React, useState, useRef, useEffect} from 'react';
import Select from 'react-select';
import uploadImage from '../../../services/user.service';
import {addProduct} from '../../../actions/admin';
import axios from 'axios';
import pathApi from '../../../configs/apiPath';
import {useDispatch} from 'react-redux';


function Similar() {



    return (
        <div className="similar-container">
            <h5 className="similar-title">You may also like</h5>
            <div className="similar-product-container">
                {/* <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div>
                <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div>
                <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div>
                <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div>
                <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div>
                <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div>
                <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div>
                <div className="similar-product">
                    <a href="#">
                    <img src={process.env.PUBLIC_URL+'/ladies.jpg'}/>
                    <h3>Name of the product sol on long long</h3></a>
                </div> */}
                
            </div>
        </div>
    )
}

export default Similar;
