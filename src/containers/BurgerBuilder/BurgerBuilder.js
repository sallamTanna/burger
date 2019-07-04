import React, { Component } from 'react';
import Auxx from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHnadler from '../../hoc/WithErrorHnadler/WithErrorHnadler';
import { connect } from 'react-redux';
import { addIngrediant, removeIngrediant, fetchIngrediantsfromDatabase, purchased } from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    showOrderSummary: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    this.props.fetchIngrediants()
  }

  showOrderSummary = ()=> {
    if(this.props.token) {
       this.setState( {showOrderSummary: true} )
    } else {
      alert('Sign in to continue!')
    }
  }

  cancelShowOrderSummary = () => this.setState( {showOrderSummary: false} )

  continueShowOrderSummary = () => {
       this.props.purchased()
       this.props.history.push({
         pathname: '/checkout',
       })
  }


  render() {
    let disableInfo = {...this.props.ingredients};
    for (var key in disableInfo) {
      disableInfo[key]= disableInfo[key] <=0;
    }

    let orderSummary = null;

    let burger = this.props.error? <p style={{textAlign: 'center'}}>ingredients cannot bee loaded!</p>:<Spinner />;

    if(this.props.ingredients) {
      burger = (<Auxx>
                      <Burger ingredients={this.props.ingredients} />
                      <BuildControls  showOrderSummary={this.showOrderSummary}
                                      purchasable={this.props.price<=4}
                                      price={this.props.price}
                                      disableInfo={disableInfo}
                                      onClickMore={this.props.onClickMore}
                                      onClickLess={this.props.onClickLess} />
                      </Auxx>);
      orderSummary = <OrderSummary price={this.props.price}
                                   cancel={this.cancelShowOrderSummary}
                                   continue={this.continueShowOrderSummary}
                                   ingredients={this.props.ingredients} />

    }

    if(this.props.loading) {
      orderSummary = <Spinner />
    }

    return <Auxx>
          <Modal show={this.state.showOrderSummary} hideBackdrop={this.showOrderSummary}>
            {orderSummary}
          </Modal>
          {burger}
    </Auxx>
  }
}

const mapStatesToProps = state => {
  return {
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.price,
  console: state.burgerBuilder.error,
  loading: state.order.loading,
  token: state.auth.token,
  }
}

const mapDispatchToProps =  dispatch => {
  return {
    onClickMore: (name)=> dispatch(addIngrediant(name)),
    onClickLess: (name)=> dispatch(removeIngrediant(name)),
    fetchIngrediants: ()=> dispatch(fetchIngrediantsfromDatabase()),
    purchased: () => dispatch(purchased()),
  }
}

export default connect(mapStatesToProps, mapDispatchToProps)(withErrorHnadler(BurgerBuilder, axios))
