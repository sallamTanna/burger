import React, { Component } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import { connect } from 'react-redux';

class NavigationItems extends Component {
  render() {
    let ordersLink = null;
    if(this.props.auth) {
      ordersLink = <NavigationItem link="/orders">Orders</NavigationItem>;
    }
    return <ul className={classes.NavigationItems}>
    <NavigationItem link="/" >Burger Builder</NavigationItem>
    { ordersLink }
    {!this.props.auth? <NavigationItem link="/auth">Sign up</NavigationItem>
                     :<NavigationItem link="/logout">Logout</NavigationItem>
    }

    </ul>
  }
}

const mapStatesToProps = (state) => {
  return {
    auth: state.auth.token,
  }
}

const NewNavigationItems = connect(mapStatesToProps)(NavigationItems);

export default NewNavigationItems;
