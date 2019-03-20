import React from "react";
// import Logo from "../../../assets/images/burgerLogo.png";
import NavigaionItems from "../navigationitems/navigationitems";
import classes from "./sidedrawer.module.css";
import Backdrop from "../../ui/backdrop/backdrop";
import Aux from "../../../hoc/Aux";

const sidedrawer = (props)=>{
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
            {/* <Logo/> */}
        </div>
            <nav>
                <NavigaionItems/>
            </nav>
        </div>
        </Aux>
    );
};

export default sidedrawer;