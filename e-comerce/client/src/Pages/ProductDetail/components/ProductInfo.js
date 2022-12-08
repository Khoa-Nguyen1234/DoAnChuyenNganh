import {React, useState, useRef, useEffect} from 'react';
import Select from 'react-select';
import {addProduct} from '../../../actions/admin';
import axios from 'axios';
import pathApi from '../../../configs/apiPath';
import {useDispatch} from 'react-redux';
import QuantityPicker from './QuantityPicker';
import {addProductCart, getProduct, getCart} from '../../../actions/userService';
import {CirclePicker} from 'react-color';
import ReactStars from "react-rating-stars-component";
import Swal from 'sweetalert2'


function ProductInfo(props) {

        const dispatch = useDispatch();
        const product_id = props.product_id;
        const [size_id, setSize] = useState("");
        const [color_id, setColor] = useState("");
        const [toggleSize, setToggleSize] = useState("");
        const [tempArray, setTempArray] = useState({product: {name: "", price: 0, quantity:0, photos:[]}, availableColor: [], availableSize: []});
        const [quantity, setQuantity] = useState(1);


        useEffect( async () => {
            const a = await (dispatch(getProduct(product_id)));
            setTempArray(a);
        },[]);

        const handleChangeColor = (color, event) => {
            setColor(tempArray.availableColor.find(t1 => t1.code == String(color.hex).toUpperCase()).color_id);
        }

        const handleChangeSize = (event, size) => {
            setToggleSize(size);
            setSize(tempArray.availableSize.find(t1 => t1.size == size).size_id)
        }

        const handleAddCart = async () => {
            Swal.fire({
                title: 'Are you sure to buy this item ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, buy it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    const data = {
                        product_id: product_id,
                        quantity: quantity,
                        size_id: size_id,
                        color_id: color_id,
                        price: tempArray.product.price,
                    }
                    dispatch(addProductCart(data)).then(() => {
                        dispatch(getCart()).then(() => {
                        });
                    });
                }
              })
        }

        const handleChangeQuantity = (valuez) => {
            setQuantity(valuez);
        }


    return (
        <div className="product-info-container">
            <div className="product-category-path">
                <a href="#"><p>Ladies</p></a>
                <p>/</p>
                <a href="#"><p>Dresses</p></a>
                <p>/</p>
                <a href="#"><p>{tempArray.product.name=="" ? tempArray.product.name : ""}</p></a>
            </div>
            <div className="product-info">
                <div className="product-all-picture">
                    <div className="product-many-picture">
                        {tempArray ? (tempArray.product ? tempArray.product.photos.map(photos => <img src={photos}></img>) : "") : ""}
                    </div>
                    <div className="product-main-picture">
                        <img src={tempArray.product.photos[0]}></img>
                    </div>
                </div>
                <div className="product-item-info">
                    <div className="product-item-upper">
                        <h3>{tempArray.product.name ? tempArray.product.name : ""}</h3>
                        <p className="product-info-price">${tempArray.product.price ? tempArray.product.price : 0}</p>
                        <div className="product-star-review">
                            <ReactStars count={5}
                            size={24}
                            isHalf={true}
                            edit={false}
                            value={3}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"/>
                            <p>| 0 Review</p>
                        </div>
                        <p className="product-info-size-title">Size:</p>
                        <div className="product-size-button-container">
                            {tempArray.availableSize.map(size => <button className={toggleSize == size.size  ? "product-size-button chosen" : "product-size-button"} value={size.size} onClick={(e) => handleChangeSize(e, size.size)}>{size.size}</button>)}
                        </div>
                        <p className="product-info-size-title">Color:</p>
                        <div className="product-color-button">
                            <CirclePicker onChange={handleChangeColor} colors={tempArray.availableColor ? tempArray.availableColor.map(color => color.code) : []}/>
                        </div>
                        <div className="product-quantity-button">
                            <p className="product-info-size-title">Quantity:</p>
                            <QuantityPicker min={1} max={tempArray.product.quantity ?  tempArray.product.quantity - tempArray.product.sold:0} value={quantity} onChange={(valuez => handleChangeQuantity(valuez))}/>
                            <p className="product-info-size-title">in stock: {tempArray.product.quantity ?  tempArray.product.quantity - tempArray.product.sold:0}</p>
                        </div>
                        <button className="product-add-cart" onClick={handleAddCart}>Add to cart</button>
                    </div>
                    <div className="product-item-lower">
                        <p>Product information</p>
                    </div>
                </div>
                {/* <div className="product-many-picture">
                    <img src={process.env.PUBLIC_URL+'/mens.jpg'}></img>
                    <img src={process.env.PUBLIC_URL+'/mens.jpg'}></img>
                    <img src={process.env.PUBLIC_URL+'/mens.jpg'}></img>
                    <img src={process.env.PUBLIC_URL+'/mens.jpg'}></img>
                </div> */}
            </div>
        </div>
    )
}

export default ProductInfo;