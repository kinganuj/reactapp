import React , {Component} from "react";
import {Route} from 'react-router-dom';

import ContactForm from '../../containers/checkout/contactData/contactdata';
import CheckoutSummary from "../../components/order/checkoutsummary/checkoutsummery";

class checkout extends Component{
    state = {
        ingredient:null,        
        totalPrice:null
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredient[param[0]] = +param[1];
            }
        }
        this.setState({ingredient:ingredient,totalPrice:price});
    }

    checkoutCanclledHandler=()=>{
    this.props.history.goBack();
    }

    checkoutContinuedHandler =()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredient={this.state.ingredient}
                checkoutCanclledHandler={this.checkoutCanclledHandler}
                checkoutContinuedHandler = {this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path+'/contact-data'} render={(props)=>(<ContactForm ingredient={this.state.ingredient} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
};

export default checkout;