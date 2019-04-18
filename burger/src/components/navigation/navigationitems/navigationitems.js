import React from "react";
import classes from "./navigationitems.module.css";
import NavigationItem from "./navigationitem/navigationitem";

const navigationitems = ()=>(
    <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
    );

export default navigationitems;