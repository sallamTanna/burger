import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props)=> {
  return <div className={classes.CheckoutSummary}>
    <h1>We hope it tasts well</h1>
    <div style={{width:'100%', margin:'auto'}}>
      <Burger ingredients={props.ingredients} />
      <h4>Price: {props.price}</h4>
    </div>
    <Button buttonType='Danger' onClick={props.checkoutCancel}>Cancel</Button>
    <Button buttonType='Success' onClick={props.checkoutContinue}>Continue</Button>
  </div>
}

export default CheckoutSummary;
