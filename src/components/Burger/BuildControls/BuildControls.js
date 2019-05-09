import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const BuildControls = (props) => {
  const labels = [
    {Label: 'Salad', type:'salad'},
    {Label: 'Bacon', type:'bacon'},
    {Label: 'Meat', type:'meat'},
    {Label: 'Cheese', type:'cheese'},
  ]

  const orderNowButtonClick = ()=> props.orderNowButtonClick

  return <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price}</strong></p>
    {labels.map((label) => <BuildControl disableInfo={props.disableInfo[label.type]}
                                        key={label.type} label={label.Label}
                                        onClickMore={()=>props.onClickMore(label.Label)}
                                        onClickLess={()=> props.onClickLess(label.Label)} />)
    }
    <button onClick={props.showOrderSummary} disabled={props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
  </div>
}

export default BuildControls;
