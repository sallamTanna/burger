import * as actions from '../actions/action.js';
import { updateObject } from '../utility.js';

let initialState = {
  ingredients: null,
  price: 4,
  error: false,
  built: false,
};

const prices = {
  meat: 1,
  cheese: 2,
  bacon: 3,
  salad: 4,
}

const addIngrediant = (state, action) => {
  const requiredObj = {[action.ingrediantName]: state.ingredients[action.ingrediantName]+1};
  const updatedIngrediant = updateObject(state.ingredients, requiredObj);
  const updateState = {
    ingredients: updatedIngrediant,
    price:  state.price + prices[action.ingrediantName],
    built: true,
  }
  return updateObject(state, updateState)
}

const removeIngrediant = (state, action) => {
  const requiredObj2 = { [action.ingrediantName]: state.ingredients[action.ingrediantName]-1 };
  const updatedIngrediant2 = updateObject(state.ingredients, requiredObj2);
  const updatedState = {
    ingredients: updatedIngrediant2,
    price: state.price - prices[action.ingrediantName],
    built: true,
  }
  return updateObject(state, updatedState)
}

const fetchIngrediants = (state, action) => {
  const updatedState3 = {
    ingredients: action.ingredients,
    error: false,
    price: initialState.price,
    built: false,
  }
  return updateObject(state,updatedState3)
}

const burgerBuilderReducer = (state=initialState, action) => {
  switch(action.type) {
    case(actions.ADD_INGREDIANT): return addIngrediant(state, action)
    case(actions.REMOVE_INGREDIANT): return removeIngrediant(state, action)
    case(actions.FETCH_INGREDIANTS): return fetchIngrediants(state, action)
    case(actions.ERROR_FETCH): return updateObject(state, {error:true})
    default: return state;
  }
}

export default burgerBuilderReducer;
