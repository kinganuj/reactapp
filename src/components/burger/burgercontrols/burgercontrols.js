import React from 'react';
import BurgerControl from "./burgercontrol/burgercontrol";
import classes from "./burgercontrols.module.css"
const controls = [
    {label:"Salad", type:'salad'},
    {label:"Bacon", type:'bacon'},
    {label:"Cheese", type:'cheese'},
    {label:"Meat", type:'meat'}
];

const burgercoltrols = (props)=>{
    return (
        <div className={classes.BurgerControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctl =>(
            <BurgerControl 
            key={ctl.label} 
            label={ctl.label}
            added={()=>props.Ingredientadded(ctl.type)}
            remove={()=>props.Ingredientremove(ctl.type)}
            disabled={props.disabled[ctl.type]}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.OrderSummary}
        >{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
        </div>
    );
};

export default burgercoltrols;