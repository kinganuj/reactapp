import React from "react";
import classes from "./backdrop.module.css"

const backdrop = (props)=>{
    props.show ? <div className={classes.Backdrop}></div>:null
    return (

    );
};

export default backdrop;