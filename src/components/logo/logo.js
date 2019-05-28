import React from "react";
import classes from "./logo.module.css";

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img scr={
                require("./burgerLogo.png")
            }
                alt="Burger_logo" />
        </div>
    );
}

export default logo;