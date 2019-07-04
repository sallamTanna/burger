import * as actions from './action.js'
import axios from '../../axios-orders';

export const  postOrderActionCreator = (data) => {
  return {
    type: actions.POST_ORDER,
    data: data
  }
}

export const postOrderSuccess = (order) => {
  return {
      type: actions.POST_ORDER_SUCCESS,
      order: order,
  }
}

export const postOrderFail = () => {
  return {
    type: actions.POST_ORDER_FAIL
  }
}

export const purchasingBurgerStart = () => {
  return {
    type: actions.PURCHASING_BURGER_START
  }
}

export const purchased = () => {
  return {
    type: actions.PURCHASED
  }
}

export const changeIsUserOrdersFetched = () => {
  return {
    type: actions.CHANGE_IS_USER_ORDER_FETCHED,
  }
}

export const postOrderToDatabase = (order, token) => {
  return (dispatch) => {
    dispatch(purchasingBurgerStart())
    axios.post('/orders.json?auth='+token, order)
      .then(res => {
          if(res.data) {
            return dispatch(postOrderSuccess(order))
          }
        }
      )
      .catch(err => dispatch(postOrderFail()))
  }
}

export const getOrdersFromDatabaseActionCreator = (orders) => {
    return {
      type: actions.GET_ORDERS_FROM_DATABASE,
      orders: orders
    }
}

export const getOrdersFromDatabase = (token) => {
  const userId = window.localStorage.getItem('userId')
  return dispatch => {
    axios.get('https://react-my-burger-591cf.firebaseio.com/orders.json?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"')
      .then(res => dispatch(getOrdersFromDatabaseActionCreator(res.data)))
      .catch(err => console.log('erorr'))
  }
}

export const emptyOrdersState = () => {
  return {
    type: actions.EMPTY_ORDERS_STATE,
  }
}
