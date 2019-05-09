import React from 'react';
import classes from './Backdrop.css';

const Backdrop = (props) => props.show? <div onClick={props.hideBackdrop} className={classes.Backdrop}></div>: null

export default Backdrop;
