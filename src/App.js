import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutSummary from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Logout from './containers/Auth/Logout/Logout'
import Auth from './containers/Auth/Auth';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { authCheckState } from './store/actions'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = <Switch>
        <Route path='/auth' exact component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' /> //For any unknown route
      </Switch>;

    if(this.props.token) {
      routes = <Switch>
        <Route path='/checkout' component={CheckoutSummary} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    }

    return <Layout>
            {routes}
          </Layout>
  }
}

const mapStatesToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(App));
