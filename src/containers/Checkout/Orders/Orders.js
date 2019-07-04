import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import withErrorHnadler from '../../../hoc/WithErrorHnadler/WithErrorHnadler';
import axios from '../../../axios-orders.js';
import classes from './Orders.css';
import { connect } from 'react-redux';
import { getOrdersFromDatabase, emptyOrdersState } from '../../../store/actions';
const style = {
  textAlign:'center',
  fontWeight:'bold',
  fontSize:'20px',
};

class Orders extends Component {

  componentDidMount() {
      this.props.getOrdersFromDatabase(this.props.token);
  }

  render() {
    const userId = window.localStorage.getItem('userId');
    let orders = <p style={style}>There is no orders yet!</p>
    if(this.props.orders[0] !== null) {
      orders = <div>{this.props.orders.map(order => {
                                              let orders = Object.values(order)
                                              return orders.map(order => <Order price={order.price} ingredients={order.ingredients} />)
                                            })}</div>
    }
    return orders;
  }
}

const mapStatesToProps = (state) => {
  return {
    orders: state.order.orders,
    token: state.auth.token,
    isUserOrdersFetched: state.order.isUserOrdersFetched,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersFromDatabase: (token) => dispatch(getOrdersFromDatabase(token)),
  }
}

const NewOrders = connect(mapStatesToProps, mapDispatchToProps)(Orders)

export default withErrorHnadler(NewOrders, axios);
