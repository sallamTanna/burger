import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { withRouter } from 'react-router';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { purchased } from '../../store/actions'

class Checkout extends Component {


  checkoutCancel = ()=> this.props.history.goBack()

  checkoutContinue = ()=> this.props.history.replace('/checkout/contact-data')

  render() {
    let summery = <Redirect to="/" />;
    if(this.props.ingredients) {
      const purchased = this.props.purchased? <Redirect to="/" />: null;
      summery=<div>
      { purchased }
        <CheckoutSummary price={this.props.price}
                         ingredients={this.props.ingredients}
                         checkoutCancel={this.checkoutCancel}
                         checkoutContinue={this.checkoutContinue}
                         />
        <Route path={`${this.props.match.path}/contact-data`}
               component = {ContactData} />
      </div>
    }
    return summery
  }

}

const mapStatesToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    purchased: state.order.purchased,
  }
}

const NewCheckout = connect(mapStatesToProps)(Checkout)

export default (NewCheckout);
