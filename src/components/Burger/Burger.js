import React from 'react';
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const Burger = (props)=> {
  let transformedIngredients;

  transformedIngredients = Object.keys(props.ingredients).map(ingredient =>
     [...Array(props.ingredients[ingredient])].map((_, i) => <BurgerIngredients type={ingredient} key={ingredient+i} />))
     .reduce((total, currentValue)=> total=total.concat(currentValue) ,[]);

  if(transformedIngredients.length === 0) {
    transformedIngredients = <div>Please add some ingredients!</div>
  }

  return <div className={classes.Burger}>
    <BurgerIngredients type="bread-top" />
    {transformedIngredients}
    <BurgerIngredients type="bread-bottom" />
  </div>
}

export default Burger;
