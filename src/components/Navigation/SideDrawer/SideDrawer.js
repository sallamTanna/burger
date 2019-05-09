import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx/Auxx'

class SideDrawer extends Component {
  render() {
    let SideDrawerClasses = [classes.SideDrawer , classes.Close];

    if(this.props.open) {
      SideDrawerClasses = [classes.SideDrawer, classes.Open]
    }

    return <Auxx>
      <Backdrop show={this.props.open} hideBackdrop={this.props.closed}/>
      <div className={SideDrawerClasses.join(' ')}>
        <Logo  height='11%'/>
        <nav><NavigationItems /></nav>
      </div>
    </Auxx>
  }
}

export default SideDrawer;
