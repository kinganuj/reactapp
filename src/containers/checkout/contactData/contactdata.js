import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "../../../components/ui/button/button";
import classes from "./contactdata.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/ui/spinner/spinner";
import Input from '../../../components/ui/input/input';
import withErrorHandler from '../../../hoc/witherrorhandler/witherrorhandler';
import * as actions from '../../../store/actions/index';
import {checkValidity } from '../../../shared/utility';

class contactdata extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false        
    }
    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loaderStatus: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // console.log(formData);
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId:this.props.userId
        };
        this.props.onOrderBurger(order,this.props.token);
        // axios.post('/order.json', order)
        //     .then(response => {
        //         this.setState({ loaderStatus: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({ loaderStatus: false });
        //     });
    }    

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        // console.log(formElementsArray);
        let form = (<form onSubmit={this.orderHandler} className={classes.From}>
            {
                formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                ))
            }
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token)),
        // onOrderBurger: (orderData)=> dispatch(actions.purchaseBurgerSuccess(orderData)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactdata,axios));