import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { authStart } from '../../store/actions'
import classes from './Auth.css';

class Auth extends Component {
  state = {
    orderForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder:'Email Address',
          type: 'email',
        },
        value: '',
        validation: {
          require: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          placeholder:'Password',
          type: 'password',
        },
        value: '',
        validation: {
          require: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    showSignUp: true,
  };

  inputOnChange = (e, inputName)=> {
    let updatedOrdersForm = { ...this.state.orderForm };
    let updatedOrder = { ...updatedOrdersForm[inputName] };

    updatedOrder.value = e.target.value;
    updatedOrder.valid = this.checkVelidity(updatedOrder.validation, e.target.value);
    updatedOrder.touched = true;
    updatedOrdersForm[inputName] =updatedOrder;

    this.setState({ orderForm: updatedOrdersForm })
  }


  checkVelidity = (rule, value)=> {
    let isValid = true;

    if(rule && rule.require) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rule && rule.minLength) {
      isValid = value.length >= 6 && isValid;
    }
    if(rule && rule.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.handleForm(this.state.orderForm.email.value, this.state.orderForm.password.value, this.state.showSignUp);
    if(this.props.built) {
      this.props.history.push('/checkout')
    } else {
      this.props.history.push('/')
    }
  }

  changeSignupAndSignin = () => {
    this.setState(prevState => ({
        showSignUp: !prevState.showSignUp
      })
    );
  }

  render() {

    const values = Object.values(this.state.orderForm);
    const keys = Object.keys(this.state.orderForm);
    let errorMesssage = null;
    let inputs = [];
    let form = <Redirect to="/" />;

    for (let i=0; i<values.length; i++) {
      inputs.push(<Input invalid={!values[i].valid}
                         onChange={(e)=> this.inputOnChange(e, keys[i])}
                         elementType={values[i].elementType}
                         elementConfig={values[i].elementConfig}
                         value={values[i].value}
                         shouldValidate = {values[i].validation}
                         touched = {values[i].touched}
                         key={i}
                  />)
    }

    if(this.props.loading) {
      inputs = <Spinner />
    }
    if(this.props.error) {
      errorMesssage = <p>{this.props.error.message}</p>;
    }
    if(!this.props.token) {
      form = <div className={classes.Auth}>
          {errorMesssage}
          <form onSubmit={this.handleFormSubmit} >
          {inputs}
          <Button buttonType="Success">SUBMIT</Button>
          </form>
          <Button buttonType="Danger" onClick={this.changeSignupAndSignin}>Go to {this.state.showSignUp? 'Sign In': 'Sign Up'}</Button>
      </div>
    }
    return form;

  }
}

const mapStatesToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    built: state.burgerBuilder.built,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleForm: (email, password, method) => dispatch(authStart(email, password, method))
  }
}

const NewAuth = connect(mapStatesToProps, mapDispatchToProps)(Auth);

export default NewAuth;
