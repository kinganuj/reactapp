import React,{Component} from "react";
import Button from "../../../components/ui/button/button";
import classes from "./contactdata.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/ui/spinner/spinner";
import Input from '../../../components/ui/input/input';

class contactdata extends Component{
    state = {
        orderForm:{            
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },                    
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                }  ,                  
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email'
                    },
                    value:'',  
                    validation: {
                            required: true
                        },
                        valid: false
                },                
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig:{                        
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    value:'',
                    validation:{},
                    valid:true                                    
                }
        },
        formIsValid:false,
        loaderStatus:false
    }
    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loaderStatus:true});
            const formData = {};
            for (let formElementIdentifier in this.state.orderForm) {
                    formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
            console.log(formData);
            const order = {
                ingredients:this.props.ingredient,
                price:this.props.price,  
                orderData:formData              
            };
            axios.post('/order.json',order)
            .then(response=>{
                this.setState({loaderStatus:false});
                this.props.history.push('/');
            })
            .catch(error=>{
                this.setState({loaderStatus:false});
            });
    }
checkValidity(value,rules){
    let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
    return isValid;
}

    inputChangeHandler = (event,inputIdentifier)=>{
       const updatedOrderForm = {
           ...this.state.orderForm
       };
       const updatedFormElement = {
           ...updatedOrderForm[inputIdentifier]
       };
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = this.checkValidity(event.target.value,updatedFormElement.validation);
       updatedFormElement.touched = true;
       updatedOrderForm[inputIdentifier] = updatedFormElement;
       let formIsValid = true;
       for(let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }
       this.setState({
           orderForm: updatedOrderForm,
           formIsValid:formIsValid
       });
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        // console.log(formElementsArray);
        let form = (<form onSubmit={this.orderHandler} className={classes.From}>
                    {
                        formElementsArray.map(formElement =>(
                            <Input 
                            key={formElement.id}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}            
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
                        ))
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
                </form>);
        if(this.state.loaderStatus){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

export default contactdata;