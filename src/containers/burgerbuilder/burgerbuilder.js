import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from "../../hoc/Aux";
import Burger from "../../components/burger/burger";
import axios from "../../axios-order";
import BurgerControls from "../../components/burger/burgercontrols/burgercontrols";
import Modal from "../../components/ui/modal/modal"
import OrderSummary from "../../components/burger/ordersummary/ordersummary";
import Spinner from "../../components/ui/spinner/spinner";
import withErrorHandler from "../../hoc/witherrorhandler/witherrorhandler";
import * as burgerBuilderAction from '../../store/actions/index';
import * as orderAction from '../../store/actions/index';


class burgerbuilder extends Component {
    state = {                
        // purchasable: false,
        purchasing: false,
        // loaderStatus: false,
        // error: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredient) {
        const sum = Object.keys(ingredient)
            .map(igKey => ingredient[igKey]).reduce((sum, el) => sum + el, 0)
        // this.setState({ purchasable: sum > 0 });
        return sum > 0;
    }

    // addIngerdientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updateCount = oldCount + 1;
    //     const upadteIngredient = {
    //         ...this.props.ings
    //     }
    //     upadteIngredient[type] = updateCount;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredient: upadteIngredient });
    //     this.updatePurchaseState(upadteIngredient);
    // };

    // removeIngerdientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updateCount = oldCount - 1;
    //     const upadteIngredient = {
    //         ...this.props.ings
    //     }
    //     if (updateCount <= -1) {
    //         upadteIngredient[type] = 0;
    //     } else {
    //         upadteIngredient[type] = updateCount;
    //     }
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredient: upadteIngredient });
    //     this.updatePurchaseState(upadteIngredient);
    // };

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({ purchasing: true });
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        // let queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.onPurchasedInit();
        this.props.history.push('/checkout');
            // {
            // pathname: '/checkout',
            // search: '?' + queryString
        // });
    }
    render() {
        const disableInfo = { ...this.props.ings };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let ordersummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.props.ings}
                    />
                    <BurgerControls
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        Ingredientadded={this.props.onIngredientAdded}
                        Ingredientremove={this.props.onIngredienRemove}
                        disabled={disableInfo}
                        isAuth={this.props.isAuth}
                        OrderSummary={this.purchaseHandler}
                    />
                </Aux>
            );
            ordersummary = <OrderSummary
                ingredient={this.props.ings}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                price={this.props.price} />;
        }
        // if (this.state.loaderStatus) {
        //     ordersummary = <Spinner />
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuth:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
        onIngredienRemove: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderAction.initIngredient()),
        onFetchIngredientsFailed: () => dispatch(burgerBuilderAction.fetchIngredientsFailed()),
        onPurchasedInit: ()=> dispatch(orderAction.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(orderAction.setAuthRedirectPath(path))
    }
}

export default connect(mapStateProps,mapDispatchToProps)(withErrorHandler(burgerbuilder, axios));