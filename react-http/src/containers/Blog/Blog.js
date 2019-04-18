import React, { Component } from 'react';
// import axios from "axios";
import classes from './Blog.module.css';
import Posts from "../Posts/Posts";
// import NewPost from "../NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
import {Route,NavLink,Switch,Redirect} from "react-router-dom";

const AsyncNewPost = asyncComponent(()=>{
    return import("../NewPost/NewPost");
});

class Blog extends Component {   
    state = {
        auth:false
    }
    render () {                
        return (
            <div>
                <header className={classes.Blog}>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact activeClassName={classes.active}>Home</NavLink></li>
                            <li><NavLink
                            activeClassName={classes.active} 
                            to={{
                                pathname: "new-post",
                                hash:"#submit",
                                search:"?quick-submit=true "
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/"/> */}
                <Switch>
                {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/>:null}
                <Route path="/posts" component={Posts}/>
                        <Route render={()=><h1>not found</h1>}/>
                {/* <Redirect from="/" to="posts"/> */}
                {/* <Route path="/" component={Posts}/> */}
                {/* <Route path="/:id" exact component={FullPost}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;