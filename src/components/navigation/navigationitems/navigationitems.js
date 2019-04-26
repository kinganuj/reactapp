import React from "react";
import classes from "./navigationitems.module.css";
import NavigationItem from "./navigationitem/navigationitem";

const navigationitems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        { props.isAuth ?<NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuth ? 
        <NavigationItem link="/auth">Authenticate</NavigationItem> : 
        <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationitems;