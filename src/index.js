import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.js";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ordersReducer from "./store/reducers/order.js";
import burgerBuilderReducer from "./store/reducers/burgerBuilder.js";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import TestComponent from './TestComponent.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  order: ordersReducer,
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


ReactDOM.render(app, document.getElementById("root"));
// ReactDOM.hydrate(<App />, document.getElementById("root"));

export default store;
