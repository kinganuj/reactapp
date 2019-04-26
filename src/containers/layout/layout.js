import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from "../../hoc/Aux";
import classes from "../layout/layout.module.css"
import Toolbar from "../../components/navigation/toolbar/toolbar"
import SideDrawer from "../../components/navigation/sidedrawer/sidedrawer";

class layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuth}
                    open={this.sideDrawerOpenHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <div >Sidebar</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);