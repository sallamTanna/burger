import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { logout, emptyOrdersState, changeIsUserOrdersFetched } from '../../../store/actions'
import { connect } from 'react-redux';

class Logout extends Component {

  componentDidMount() {
    this.props.handleLogout();
    this.props.changeIsUserOrdersFetched();
    this.props.emptyOrdersState();
  }

  render() {
    return <div>
      <Redirect to='/' />
    </div>
  }
}

const mapDispatchToProps = () => {
  return dispatch => {
    return {
      handleLogout: () => dispatch(logout()),
      emptyOrdersState: () => dispatch(emptyOrdersState()),
      changeIsUserOrdersFetched: () => dispatch(changeIsUserOrdersFetched())
    }
  }
}

const NewLogout = connect(null, mapDispatchToProps)(Logout)

export default NewLogout;
