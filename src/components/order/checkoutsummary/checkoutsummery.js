import React from "react";
import Burger from "../../burger/burger";
import Button from "../../ui/button/button";
import classes from "./checkoutsummery.module.css";

const checkoutsummery =(props)=>{
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div>
            <Burger ingredients={props.ingredient}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCanclledHandler}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinuedHandler}>CONTINUE</Button>
        </div>
    );
};

export default checkoutsummery;