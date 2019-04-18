import React ,{Component} from "react";
import axios from "../../axios";
import Post from "../../components/Post/Post";
import classes from "./Posts.module.css";
import {Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component{
    state = {
        posts: [],    
    };    
     componentDidMount(){
        axios.get('/posts')
        .then(response =>{
            const posts = response.data.slice(0, 4);
            const updatePost = posts.map(post=>{
                return {
                    ...post,
                    author: "Max"
                };
            });
            this.setState({posts:updatePost});
            // console.log(response);
        }).catch(error=>{
            console.log(error);
            // this.setState({error:true});
        });
    }
    postSelectHandler = (id) => {
        // this.setState({
        //     slelctedPostId: id
        // });
        this.props.history.push({pathname:'/posts/'+id});        
        // this.props.history.push('/'+id);        
    }
    render(){
        let posts = <p style={{textAlign:"center"}}>Something went wrong</p>
    if(!this.state.error){
             posts = this.state.posts.map(post=>{
                 return (
                //  <Link to={'/'+post.id} key={post.id} >
                    <Post
                    key={post.id}                     
                    title={post.title} 
                    author={post.author}
                    clicked={()=> this.postSelectHandler(post.id)}/>
                    // {/* </Link> */}
                 );
        });
        }
        return(
            <div>
            <section className={classes.Posts}>
                {posts}
            </section>       
            <Route path={this.props.match.url+"/:id"} component={FullPost}/>
            </div>
        );
    }
}

export default Posts;