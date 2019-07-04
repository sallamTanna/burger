import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import { connect } from 'react-redux';
import classes from './BuildControls.css';

const BuildControls = (props) => {
  const labels = [
    {Label: 'salad', type:'salad'},
    {Label: 'bacon', type:'bacon'},
    {Label: 'meat', type:'meat'},
    {Label: 'cheese', type:'cheese'},
  ]

  const orderNowButtonClick = ()=> props.orderNowButtonClick
  let price = props.price;
  if(props.purchased) {
    price=4;
  }

  return <div className={classes.BuildControls}>
    <p>Current Price: <strong>{price}</strong></p>
    {labels.map((label) => <BuildControl disableInfo={props.disableInfo[label.type]}
                                        key={label.type} label={label.Label}
                                        onClickMore={()=>props.onClickMore(label.Label)}
                                        onClickLess={()=> props.onClickLess(label.Label)} />)
    }
    <button onClick={props.showOrderSummary} disabled={props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
  </div>
}

const mapStatesToProps = state => {
  return {
    price: state.burgerBuilder.price,
    purchased: state.order.purchased,
  }
}

const NewBuildControls = connect(mapStatesToProps)(BuildControls);
export default NewBuildControls;
