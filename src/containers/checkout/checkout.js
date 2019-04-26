import React , {Component} from "react";
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from "../../components/order/checkoutsummary/checkoutsummery";
import contactdata from "../../containers/checkout/contactData/contactdata";

class checkout extends Component{
    // state = {
    //     ingredient:null,        
    //     totalPrice:null
    // }

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredient = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }else{
    //             ingredient[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredient:ingredient,totalPrice:price});
    // }

    // componentWillMount(){
    //     this.props.onPurchaseInit()
    // }

    checkoutCanclledHandler=()=>{
    this.props.history.goBack();
    }

    checkoutContinuedHandler =()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredient={this.props.ings}
                        checkoutCanclledHandler={this.checkoutCanclledHandler}
                        checkoutContinuedHandler={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        // render={(props)=>(<ContactForm ingredient={this.props.ings} price={this.props.price} {...props}/>)}
                        component={contactdata}
                    />
                </div>
            ); 
        }
        return summary;
    }
};

const mapStateToProps = (state)=>{
    return {
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);