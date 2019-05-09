import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const NavigationItems = (props) => <ul className={classes.NavigationItems}>
  <NavigationItem link="/" active='true'> this is link1 </NavigationItem>
  <NavigationItem link="/"> this is link2 </NavigationItem>
</ul>

export default NavigationItems;
