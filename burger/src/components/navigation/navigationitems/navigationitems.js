import React from "react";
import classes from "./navigationitems.module.css";
import NavigationItem from "./navigationitem/navigationitem";

const navigationitems = ()=>(
    <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
    );

export default navigationitems;