import React from 'react';
import classes from './Logo.css';
import logo from '../../assets/logo.png';

const Logo = (props)=> <div className={classes.Logo}  style={{height: props.height}}>
  <img src={logo} alt="logo" />
</div>

export default Logo;
