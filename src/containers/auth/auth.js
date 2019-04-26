import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';
import classes from './auth.module.css'
import * as action from '../../store/actions/index';
import Spinner from '../../components/ui/spinner/spinner';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: true
    };
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }    

    switchAuthHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        });
    }
    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedControls[controlName]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedControls[controlName] = updatedFormElement;
        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (<form onSubmit={this.submitHandler} className={classes.Form} >
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
            <Button btnType="Success">Submit</Button>
        </form>
        );
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }
        if (this.props.loading) {
            form = <Spinner />;
        }
        let authRedirect = null;
        if (this.props.isAuth) {            
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <div className={classes.AuthData}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button
                    clicked={this.switchAuthHandler}
                    btnType="Danger">Switch To {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        onSetAuthRedirectPath:()=>dispatch(action.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 