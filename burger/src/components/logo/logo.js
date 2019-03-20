import React from "react";
import burgerLogo from "../../assets/images/burgerLogo.png"
import classes from "./logo.module.css";

const logo = ()=>{
    return (
        <div className={classes.Logo}>
            <img scr={burgerLogo} alt="Burger_logo"/>
        </div>
    );
}

export default logo;