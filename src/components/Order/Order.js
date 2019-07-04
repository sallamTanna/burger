import React, { Component } from 'react';
import classes from './Order.css';

class Order extends Component {
  render() {
    const keys = Object.keys(this.props.ingredients);
    const values = Object.values(this.props.ingredients);

    let ingredients = [];

    for(let i=0; i<keys.length; i++) {
      ingredients.push(`${keys[i]}: ${values[i]}, `)
    }

    return <div className={classes.Order}>
      <strong>ingredients:</strong><br/>
      {ingredients}<br/> <br/>
      <strong>Price:</strong>{this.props.price}
    </div>
  }
}

export default Order;
