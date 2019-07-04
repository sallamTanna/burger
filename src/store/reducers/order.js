import * as actions from '../actions/action.js';
import { updateObject } from '../utility.js';

let initialState = {
  loading: false,
  orders: [],
  purchased: false,
  isUserOrdersFetched: false,
};

const postOrderSuccess = (state, action) => {
  const updateState = {
    loading: false,
    purchased: true,
  }
  return updateObject(state,updateState)
}

const getOrdersFromDatabase = (state, action) => {
  const orders = Object.values(action.orders)
  console.log('ordesssssssssss from database', orders);
  const updatedOrders = {
    orders: [orders],
    isUserOrdersFetched: true,
  }
  return updateObject(state, updatedOrders)
}

const ordersReducer = (state=initialState, action) => {
  switch(action.type) {

    case(actions.POST_ORDER_SUCCESS): return postOrderSuccess(state, action)
    case(actions.POST_ORDER_FAIL): return updateObject(state, {loading: true})
    case(actions.PURCHASING_BURGER_START): return updateObject(state, {loading: true})
    case(actions.PURCHASED): return updateObject(state, {purchased: false,})
    case(actions.GET_ORDERS_FROM_DATABASE): return getOrdersFromDatabase(state, action)
    case(actions.EMPTY_ORDERS_STATE): return updateObject(state, {orders: []})
    case(action.CHANGE_IS_USER_ORDER_FETCHED): return updateObject(state, {isUserOrdersFetched: false})

    default: return state;
  }
}

export default ordersReducer;
