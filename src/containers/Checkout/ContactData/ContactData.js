import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import { postOrderToDatabase } from '../../../store/actions';
import withErrorHandler from '../../../hoc/WithErrorHnadler/WithErrorHnadler';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          placeholder:'Your name',
          type: 'text',
        },
        value: '',
        validation: {
          require: true
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          placeholder:'Street name',
          type: 'text',
        },
        value: '',
        validation: {
          require: true
        },
        valid: false,
        touched: false,

      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          placeholder:'ZIP code',
          type: 'text',
        },
        value: '',
        validation: {
          require: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          placeholder:'Your Country',
          type: 'text',
        },
        value: '',
        validation: {
          require: true
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder:'Email',
          type: 'email',
        },
        value: '',
        validation: {
          require: true
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ],
        },
        value: 'fastest',
        valid: false,
        touched: false,
      }
    },
    ingredients: null,
    price: 0,
  }

  orderHnadler = (e)=> {
    e.preventDefault();
    const keys = Object.keys(this.state.orderForm);
    const values = Object.values(this.state.orderForm);
    let formData = {};

    for(let i=0; i<keys.length; i++) {
        if(!values[i].value) {
        } else {
          formData[keys[i]] = values[i].value;
        }
    }


    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderForm: formData,
      userId: window.localStorage.getItem('userId')
    }

    this.props.postOrderToDatabase(order, this.props.token)
  }

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
      isValid = value.length >= 5 && isValid;
    }
    if(rule && rule.maxLength) {
      isValid = value.length <= 5 && isValid;
    }

    return isValid;
  }

  render() {
    const values = Object.values(this.state.orderForm);
    const keys = Object.keys(this.state.orderForm);
    const inputs = [];

    for (let i=0; i<values.length; i++) {
      inputs.push(<Input invalid={!values[i].valid}
                         onChange={(e)=> this.inputOnChange(e, keys[i])}
                         elementType={values[i].elementType}
                         elementConfig={values[i].elementConfig}
                         value={values[i].value}
                         shouldValidate = {values[i].validation}
                         touched = {values[i].touched}
                  />)
    }

    return this.props.loading? <Spinner />: <div className={classes.ContactData}>
      <h4>Enter your data</h4>
      <form onSubmit={this.orderHnadler}>
        {inputs}
        <Button buttonType="Success">Order Now!</Button>
      </form>
    </div>
  }
}

const mapStatesToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.order.loading,
    token: state.auth.token,
  }
}

const mapDipatchToProps = (dispatch) => {
  return {
    postOrderToDatabase: (order, token) => dispatch(postOrderToDatabase(order, token))
  }
}

const NewContactData = connect(mapStatesToProps, mapDipatchToProps)(withErrorHandler(ContactData, axios))

export default NewContactData;
