import React, { Component } from 'react';
import Auxx from '../../../hoc/Auxx/Auxx';
import Button from '../../UI/Button/Button';
import { NavLink } from 'react-router-dom';

class OrderSummary extends Component {
  render() {
    let ingredients = Object.keys(this.props.ingredients).map(ingredient => <li key={ingredient}><span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {this.props.ingredients[ingredient]}</li>);
    return <Auxx>
      <h3>order summary</h3>
      <p>Price: <strong>{this.props.price}</strong></p>
      <p>Nice burger with the following ingredient:</p>
      <ul>
        {ingredients}
      </ul>
      <Button onClick={this.props.cancel} buttonType='Danger'>CANCEL</Button>
      <Button onClick={this.props.continue} buttonType='Success'><NavLink href="/checkout">CONTINUE</NavLink></Button>
    </Auxx>
  }
}

export default OrderSummary;
