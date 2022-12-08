import {React, useState, useRef, useEffect} from 'react';
import Select from 'react-select';
import {addProduct} from '../../../actions/admin';
import axios from 'axios';
import pathApi from '../../../configs/apiPath';
import {useDispatch, useSelector} from 'react-redux';
import QuantityPicker from './QuantityPicker';
import AdminService from "../../../services/user.service";
import {getCart, checkout} from '../../../actions/userService';
import Swal from 'sweetalert2'


function OrderList() {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const [totalPrice, setTotalPrice] = useState(0);

    const handleCheckOut = async () =>{
        const data = {
            product: cart.cart.productList.map(product => ({ 
                product_name: product.name,
                quantity: product.quantity,
                price: product.price,
                color: product.code,
                size: product.size,
            })),
            totalPrice: cart.cart.totalPrice,
        }
        Swal.fire({
            title: 'Are you sure to checkout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(checkout(data)).then(() => {
                    dispatch(getCart()).then(() => {
                        Swal.fire(
                            'Complete!',
                            'Your order has been placed.',
                            'success'
                        )
                    });
                });
            }
          })
    }

    useEffect(async() => {
        await dispatch(getCart());
    },[]);

    return (
        <div>
            <h4>Total</h4>
            <div className="checkout-information">
                <div className="checkout-info-line">
                    <p>Shipping & Handling:</p>
                    <p>Free</p>
                </div>
                <div className="checkout-info-line">
                    <p>Total product:</p>
                    <p>${cart.cart ? (cart.cart.totalPrice ? cart.cart.totalPrice : 0) : 0}</p>
                </div>
                <hr border="1px solid black"/>
                <div className="checkout-info-line">
                    <p><b>Subtotal</b></p>
                    <p><b>${cart.cart ? (cart.cart.totalPrice ? cart.cart.totalPrice : 0) : 0}</b></p>
                </div>
            </div>
            <button className="checkout-button" onClick={handleCheckOut}>Check out</button>
        </div>
    )
}

export default OrderList;