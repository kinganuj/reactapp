import React from "react";
import classes from  "./toolbar.module.css"
import Logo from "../../logo/logo";
import NavigationItems from "../navigationitems/navigationitems";
import DrawerToggle from "../sidedrawer/drawertoggle/drawertoggle";

const toolbar  = (props)=>{
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.open}/>            
            <div className={classes.Logo}>
               <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
};

export default toolbar;