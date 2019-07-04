import React from 'react';
import classes from './Input.css';

const Input = (props)=> {
  let inputElement = null;
  let inputClasses = [classes.inputElement];
  let errorMessage = null;

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    errorMessage = <p className={classes.ValidationError}>Please check tne entered {props.elementConfig.placeholder}</p>
  }

  switch (props.elementType) {
    case ('input'):
          inputElement = <input onChange={props.onChange} {...props.elementConfig} value={props.value} className={inputClasses.join(' ')}/>;
          break;

    case ('select'):
          inputElement = (<select onChange={props.onChange} className={inputClasses.join(' ')} value={props.value}>
                {props.elementConfig.options.map(option => <option value={option.value}>{option.displayValue}</option>)}
          </select>);
          break;

    case ('textarea'):
          inputElement = <textarea onChange={props.onChange} {...props.elementConfig} value={props.value} className={inputClasses.join(' ')}/>;
          break;

    default:
          inputElement = <input onChange={props.onChange}  {...props.elementConfig} value={props.value} className={inputClasses.join(' ')}/>;
  }

  return <div className={classes.Input}>
    <label>{props.label}</label>
    {inputElement}
    {errorMessage}
  </div>
}

export default Input;
