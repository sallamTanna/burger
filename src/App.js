import React, { Component, lazy, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions";

const Auth = lazy(() => import("./containers/Auth/Auth"));
const BurgerBuilder = lazy(() =>
  import("./containers/BurgerBuilder/BurgerBuilder")
);
const CheckoutSummary = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Checkout/Orders/Orders"));
const Logout = lazy(() => import("./containers/Auth/Logout/Logout"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/auth" exact component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" /> //For any unknown route
          </Switch>
        </Suspense>
      </React.StrictMode>
    );

    if (this.props.token) {
      routes = (
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/checkout" component={CheckoutSummary} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStatesToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default withRouter(
  connect(
    mapStatesToProps,
    mapDispatchToProps
  )(App)
);
