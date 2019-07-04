import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxx from '../Auxx/Auxx';

const withErrorHnadler = (WrappedComponent, axios)=> {
  return class extends Component{

    state = {
      error: null,
    }

    componentWillMount() {
      this.requestInterceptors =  axios.interceptors.request.use( req => {this.setState( {error: null} ); return req; });
      this.responseInterceptors = axios.interceptors.response.use(res=>res, err=> {this.setState( {error: err} ) });
    }

    // To remove the interceptors when we do not need the component
    coponentWillUnmount() {
        axios.interceptors.request.eject(this.requestInterceptors);
        axios.interceptors.response.eject(this.responseInterceptors);
    }

    errorConfirmedHandler = ()=> this.setState( {error: null} )

    render() {
      return <Auxx>
      <Modal show={this.state.error} hideBackdrop={this.errorConfirmedHandler}>{this.state.error? this.state.error.message: null}</Modal>
        <WrappedComponent {...this.props} />
      </Auxx>
    }
  }
}

export default withErrorHnadler;
