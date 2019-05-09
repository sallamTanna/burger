import React, { Component } from 'react';
import Auxx from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const prices = {
  meat: 1,
  cheese: 2,
  bacon: 3,
  salad: 4,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon:0,
    },
    price: 4,
    purchasable: false,
    showOrderSummary: false,
  }

  onClickMore(label) {
    label = label.toLowerCase();
    const oldIngredientCount = this.state.ingredients[label];
    const newIngredientCount = oldIngredientCount+1;
    const newoldIngredientState = {...this.state.ingredients };
    newoldIngredientState[label] = newIngredientCount;
    const price = prices[label];
    this.setState( presState => ({ingredients: newoldIngredientState, price: presState.price+price}) )
  }

  onClickLess(label) {
    label = label.toLowerCase();
    const oldIngredientCount = this.state.ingredients[label];
    if(oldIngredientCount <=0) {
      return;
    }
    const newIngredientCount = oldIngredientCount-1;
    const newoldIngredientState = {...this.state.ingredients };
    newoldIngredientState[label] = newIngredientCount;
    const price = prices[label];

    this.setState( presState => ({ingredients: newoldIngredientState, price: presState.price-price}) )
  }

   showOrderSummary =  ()=> {
    this.setState(prevState => ({ showOrderSummary: !prevState.showOrderSummary} ))
  }

  continueMsg = () => {alert('You will continue!'); this.showOrderSummary()}


  render() {
    let disableInfo = {...this.state.ingredients};
    for (var key in disableInfo) {
      disableInfo[key]= disableInfo[key] <=0;
    }
    return <Auxx>
      <Burger ingredients={this.state.ingredients} />
      <BuildControls showOrderSummary={this.showOrderSummary} purchasable={this.state.price<=4} price={this.state.price} disableInfo={disableInfo} onClickMore={(label) => this.onClickMore(label)} onClickLess={(label) => this.onClickLess(label)} />
          <Modal show={this.state.showOrderSummary} hideBackdrop={this.showOrderSummary}>
            <OrderSummary price={this.state.price} cancel={this.showOrderSummary} continue={this.continueMsg} ingredients={this.state.ingredients} />
        </Modal>
    </Auxx>
  }
}

export default BurgerBuilder;
