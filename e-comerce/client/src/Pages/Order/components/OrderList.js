import {React, useState, useRef, useEffect} from 'react';
import Select from 'react-select';
import {useDispatch, useSelector} from 'react-redux';
import QuantityPicker from './QuantityPicker';
import {getCart, removeProduct} from '../../../actions/userService';
import Swal from 'sweetalert2'


function OrderList(props) {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);


    const handleRemove = async (product_id) => {
        Swal.fire({
            title: 'Are you sure to remove this item ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Yes, removed it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeProduct(product_id)).then(() => {
                    dispatch(getCart()).then(() => {
                        Swal.fire(
                            'Removed!',
                            'Your product has been removed.',
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
        <table className="order-list-container">
          <tr className="order-list-row">
              <th className="order-list-column first-column" ><h4>Product</h4></th>
              <th className="order-list-column"><h4>Color</h4></th>
              <th className="order-list-column"><h4>Size</h4></th>
              <th className="order-list-column"><h4>Quantity</h4></th>
              <th className="order-list-column last-column"><h4>Amount</h4></th>
          </tr>
          
            {cart.cart ? (cart.cart.productList ? cart.cart.productList.map(product=> (
            <tr className="order-list-row">
                <td className="order-list-column first-column">
                    <div className="order-product-info">
                        <img src={product.photos[0]}/>
                        <div className="order-product-specific">
                            <p>{product.name}</p>
                            <div className="order-product-specific-link">
                            <button ><p>Change</p></button>
                            <p>|</p>
                            <button onClick={handleRemove.bind(this,product.product_id)}><p>Remove</p></button>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="order-list-column"><div style={{backgroundColor: product.code}} className="order-color"></div></td>
                <td className="order-list-column"><p className="order-product-size">{product.size}</p></td>
                <td className="order-list-column"><QuantityPicker default={product.quantity} min={1} max={1000} product_id={product.product_id}/></td>
                <td className="order-list-column last-column"><p className="order-product-price">${product.price}</p></td>
            </tr>)): ""): ""}
        </table>
    )
}

export default OrderList;