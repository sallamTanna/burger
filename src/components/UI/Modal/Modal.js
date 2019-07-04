import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx/Auxx'
import classes from './Modal.css';

class Modal extends Component {

  // componentWillUpdate() {
  //   console.log('Modal componentWillUpdate');
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.show !== this.props.show || nextProps.children !== this.props.children ) {
      return true
    } else {
      return false
    }
  }

  render() {
    return <Auxx>
      <Backdrop  show={this.props.show} hideBackdrop={this.props.hideBackdrop}/>
      <div className={classes.Modal}
          style={{
            transform : this.props.show? 'translateY(0)': 'translateY(-100vh)',
            opacity: this.props.show? '1':'0',
          }}
        >
          {this.props.children}
        </div>
    </Auxx>
  }
}

export default Modal;
