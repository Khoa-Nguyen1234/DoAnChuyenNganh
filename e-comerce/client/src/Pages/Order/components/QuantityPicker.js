import React, { useState } from 'react';

import {useDispatch} from 'react-redux';
import {increaseProduct, decreaseProduct, getCart} from '../../../actions/userService';


export default function QuantityPicker(props) {
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    const resultIncrease = await dispatch(increaseProduct(product_id));
    setValue(resultIncrease.result);
    await dispatch(getCart());
  }

  const handleDecrease = async () => {
    await dispatch(decreaseProduct(product_id));
    await dispatch(getCart());
  }

  const product_id = props.product_id;
  const [value, setValue] = useState(props.default);
  const [disableDec, setDisDec] = useState(true);
  const [disableInc, setDisInc] = useState(true);

  const increment = async () => {
    const plusState = value + 1;
    if (value < props.max){
        handleIncrease();
        setDisInc(false);
    }
    if (value == (props.max - 1)) {
        setDisInc(true);
    }
    if (value == props.min) {
        setDisDec(false);
    }
  }

  const decrement = async () => {
    const minusState = value - 1;
    if (value > props.min) {
      handleDecrease();
      setValue(minusState);
      if (value == props.min + 1) {
        setDisDec(true);
      }
    } else {
        setValue( props.min);
    }
    if (value == props.max) {
        setDisInc(false);
    }
  }


    return (
      <span className="quantity-picker">
        <button className={`${disableDec ? 'mod-disable ' : ''}quantity-modifier modifier-left`} onClick={decrement}>&ndash;</button>
        <input className="quantity-display" type="text" value={value} readOnly />
        <button className={`${disableInc ? 'mod-disable ' : ''}quantity-modifier modifier-right`} onClick={increment}>&#xff0b;</button>
      </span>
    );
}