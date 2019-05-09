import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle.js';

const Toolbar = (props) => <header className={classes.Toolbar}>
  <DrawerToggle clicked={props.DrwaerToggleClicked} />
  <Logo height='80%'/>
  <nav className={classes.desktopView}>
    <NavigationItems />
  </nav>
</header>

export default Toolbar;
