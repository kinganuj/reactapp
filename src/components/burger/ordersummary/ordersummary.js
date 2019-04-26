import React from "react";
import Aux from "../../../hoc/Aux"
import Button from "../../ui/button/button";

const ordersummary = (props)=>{
    const ingredientSummary = Object.keys(props.ingredient)
            .map((igKey)=>{
                return (
                    <li key={igKey}>
                        <span style={{textTransform:"capitalize"}}>
                        {igKey}
                        </span>:
                        {props.ingredient[igKey]}
                    </li>
                );
            });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredient:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default ordersummary;