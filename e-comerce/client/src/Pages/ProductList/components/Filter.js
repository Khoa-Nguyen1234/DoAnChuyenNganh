import React, { Component, useState, useEffect } from 'react';
import { Dropdown, DropdownButton, Row, Col, Container, Button, Image } from 'react-bootstrap';
import {SET_SIZE, SET_COLOR, SET_PRICE, SET_STOCK, CLEAR_FILTER} from '../../../actions/types'
import {useDispatch, useSelector} from 'react-redux'
import userService from '../../../services/user.service'
import {CirclePicker} from 'react-color';
import Slider from '@material-ui/core/Slider';
import {getListProductAll} from '../../../actions/userService';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

function valuetext(value) {
    return `${value}°C`;
  }



function Filter(props) {

    const dispatch = useDispatch();
    const searchList = useSelector(state=> state.searchList);
    const filter = searchList.filter;

    const [size, toggleSize] = useState(false);
    const [color, toggleColor] = useState(false);
    const [price, togglePrice] = useState(false);
    const [available, toggleAvai] = useState(false);

    const [colorArr, setColor] = useState([]);
    const [sizeArr, setSize] = useState([]);

    const [priceRange, setPrice] = useState([0,1000]);


    useState(async () => {
        const a = await userService.getFilter();
        setColor(a.color);
        setSize(a.size);
    })

    const handleSubmitFilter = () => {
        dispatch(getListProductAll());
    }

    const handleClearFilter = () => {
        dispatch({type: CLEAR_FILTER});
        dispatch(getListProductAll());
    }

    const handleChangeStock = (e) => {
        e.preventDefault();
        dispatch({type: SET_STOCK, payload: e.target.value});
    }

    const handleChangePrice = (e, newValue) => {
        e.preventDefault();
        console.log(newValue);
        setPrice(newValue);
        dispatch({type: SET_PRICE, payload: {low: newValue[0], high: newValue[1]}});
    } 

    const handleSetSize = (e, size) => {
        e.preventDefault();
        dispatch({type: SET_SIZE, payload: size})
    }
    
    const handleChangeColor = (color, event) => {
        event.preventDefault();
        const id_color = (colorArr.find(t1 => t1.code == String(color.hex).toUpperCase())._id);
        dispatch({type: SET_COLOR, payload: id_color})
    }

        return(
            <div className="filter-container">
                <div className="category">
                    <h2>Category</h2>
                    <a href="#">All RACQUET</a>
                    <hr border-top="1px solid"/>
                    <div className="specific-category">
                        <a href="#"><p>RACQUETS </p></a>
                        <a href="#"><p>BAGS</p></a>
                        <a href="#"><p>SHOES</p></a>
                        <a href="#"><p>APPAREL</p></a>
                        
                    </div>
                </div>
                <hr className="middle" border-top="1px solid"/>
                <div className="filter">
                    <h2>Filter</h2>
                    <div className="specific-filter">
                        <button  onClick={() => toggleSize(!size)} className="filter-size">
                            <p>Size</p>
                            <img  src={process.env.PUBLIC_URL+'/arrow.svg'}/>
                        </button>
                        <div className={size ? "mySelectionDropdown showzz" : "mySelectionDropdown"}>
                            {sizeArr ? sizeArr.map(eachSize => <button className={filter.size == eachSize._id  ? "product-size-button chosen" : "product-size-button"} value={eachSize._id} onClick={(e) => handleSetSize(e, eachSize._id)}>{eachSize.size}</button>) : ""}
                        </div>
                        <hr border-top="1px solid"/>
                        <button onClick={() => toggleColor(!color)} className="filter-size">
                            <p>Color</p>
                            <img src={process.env.PUBLIC_URL+'/arrow.svg'}/>
                        </button>
                        <div className={color ? "mySelectionDropdown showzz" : "mySelectionDropdown"}>
                            <div className="showzz">
                                <CirclePicker colors={colorArr.map(color => color.code) || []} onChangeComplete={handleChangeColor}/>
                            </div>
                        </div>
                        <hr border-top="1px solid"/>
                        <button onClick={() => togglePrice(!price)} className="filter-size">
                            <p>Price</p>
                            <img src={process.env.PUBLIC_URL+'/arrow.svg'}/>
                        </button>
                        <div className={price ? "mySelectionDropdown showzz" : "mySelectionDropdown"}>
                        <Slider
                            value={priceRange}
                            min={0}
                            max={1000}
                            onChange={handleChangePrice}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            />
                        </div>
                        <hr border-top="1px solid"/>
                        <button onClick={() => toggleAvai(!available)} className="filter-size">
                            <p>Available</p>
                            <img src={process.env.PUBLIC_URL+'/arrow.svg'}/>
                        </button>
                        <div className={available ? "mySelectionDropdown stock-filter-dropdown" : "mySelectionDropdown"} onChange={handleChangeStock}>
                            <div className="stock-check-filter">
                                <span>In stock:</span>
                                <input type="radio" name="stock" value={1}/>
                            </div>
                            <div className="stock-check-filter">
                                <span>Out of stock:</span>
                                <input type="radio" name="stock" value={0}/>
                            </div>
                        </div>
                        <hr border-top="1px solid"/>
                        <button className="apply-filter-btn" onClick={handleSubmitFilter}>Apply filter</button>
                        <button className="apply-filter-btn" onClick={handleClearFilter}>Clear filter</button>
                    </div>
                </div>
            </div>
        )
}

export default Filter;