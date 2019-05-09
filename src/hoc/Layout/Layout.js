import React, { Component } from 'react';
import Auxx from '../../hoc/Auxx/Auxx';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

  state = {
    showSideDrawer: false,
  }

 closeSideDrawer = ()=> this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}) )
 openSideDrawer = ()=> this.setState( prevState=> ({showSideDrawer: !prevState.showSideDrawer}))

  render() {return <Auxx>
      <Toolbar DrwaerToggleClicked={this.openSideDrawer}/>
      <SideDrawer  open={this.state.showSideDrawer} closed={this.closeSideDrawer}/>
      <div className={classes.container}></div>
      <main>{this.props.children}</main>
    </Auxx>
  }
}

export default Layout;
