import * as actions from './action.js';
import axios from '../../axios-orders';


export const addIngrediant = ingrediantName => {
  return {
    type: actions.ADD_INGREDIANT,
    ingrediantName: ingrediantName,
  }
}

export const removeIngrediant = ingrediantName => {
  return {
    type: actions.REMOVE_INGREDIANT,
    ingrediantName: ingrediantName,
  }
}

export const fetchIngrediantsfromDatabaseActionCreator = ingredients => {
  return {
    type: actions.FETCH_INGREDIANTS,
    ingredients: ingredients
  }
}

export const errorFetch = () => {
  return {
    type: actions.ERROR_FETCH
  }
}

export const fetchIngrediantsfromDatabase = () => {
  return (dispatch) => {
    axios.get('https://react-my-burger-591cf.firebaseio.com/ingredients.json')
          .then(res => dispatch(fetchIngrediantsfromDatabaseActionCreator(res.data)))
          .catch(err=> dispatch(errorFetch()))
  }
}
