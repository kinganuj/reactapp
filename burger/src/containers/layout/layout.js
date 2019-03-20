import React,{Component} from "react";
import Aux from "../../hoc/Aux";
import classes from "../layout/layout.module.css"
import Toolbar from "../../components/navigation/toolbar/toolbar"
import SideDrawer from "../../components/navigation/sidedrawer/sidedrawer";

class layout extends Component{
    state = {
        showSideDrawer:false
    };

    sideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer:false});
    }
     sideDrawerOpenHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
     render() {
       return (
         <Aux>
         <Toolbar open={this.sideDrawerOpenHandler} />
         <SideDrawer 
         open={this.state.showSideDrawer}        
         closed={this.sideDrawerClosedHandler}/>
         <div >Sidebar</div>
         <main className={classes.Content}>
             {this.props.children}
         </main>
        </Aux>        
       )
     }
};

export default layout;