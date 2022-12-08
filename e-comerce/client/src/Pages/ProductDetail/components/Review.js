import {React, useState, useRef, useEffect} from 'react';
import Select from 'react-select';
import uploadImage from '../../../services/user.service';
import {addProduct} from '../../../actions/admin';
import axios from 'axios';
import pathApi from '../../../configs/apiPath';
import {useDispatch} from 'react-redux';


function Review() {



    return (
        <div>
            <h5 className="similar-title">Reviews</h5>
            <div className="review-container">
                <p className="review-empty">No reviews</p>
                {/* <div className="review-page-tab">
                    <img className="left-icon" src="arrow.svg"/>
                    <p>1/7</p>
                    <img className="right-icon" src="arrow.svg"/>
                </div> */}
            </div>
        </div>
    )
}

export default Review;