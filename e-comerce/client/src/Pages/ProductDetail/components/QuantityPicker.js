import React, { useState } from 'react';

export default function QuantityPicker(props) {


  const [value, setValue] = useState(props.min);
  const [disableDec, setDisDec] = useState(true);
  const [disableInc, setDisInc] = useState(true);

  const increment =() => {
    const plusState = value + 1;
    if (value < props.max){
      
        setValue(plusState);
        props.onChange(plusState);
        setDisInc(false);
    }
    if (value == (props.max - 1)) {
        setDisInc(true);
    }
    if (value == props.min) {
        setDisDec(false);
    }
  }

  const decrement = () => {
    const minusState = value - 1;
    if (value > props.min) {
        setValue(minusState);
        props.onChange(minusState);
      if (value == props.min + 1) {
        setDisDec(true);
      }
    } else {
        setValue( props.min);
        props.onChange(props.min);
    }
    if (value == props.max) {
        setDisInc(false);
    }
  }


    return (
      <span className="quantity-picker">
        <button className={`${disableDec ? 'mod-disable ' : ''}quantity-modifier modifier-left`} onClick={decrement}>&ndash;</button>
        <input className="quantity-display" type="text" value={props.value} readOnly />
        <button className={`${disableInc ? 'mod-disable ' : ''}quantity-modifier modifier-right`} onClick={increment}>&#xff0b;</button>
      </span>
    );
}