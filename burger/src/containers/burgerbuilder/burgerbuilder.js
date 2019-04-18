import React,{Component} from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/burger/burger";
import BurgerControls from "../../components/burger/burgercontrols/burgercontrols";
import Modal from "../../components/ui/modal/modal"
import OrderSummary from "../../components/burger/ordersummary/ordersummary";
import axios from "../../axios-order";
import Spinner from "../../components/ui/spinner/spinner";
import withErrorHandler from "../../hoc/witherrorhandler/witherrorhandler";

const INGREDIENT_PRICE ={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
};

class burgerbuilder extends Component{
    state = {
        ingredient :null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loaderStatus:false,
        error:false
    };

    componentDidMount(){
        axios.get('https://burger-25bf0.firebaseio.com/ingredient.json')
        .then(response=>{
            this.setState({ingredient:response.data});
        }).catch((error)=>{
            this.setState({error:true});
        });
    }

    updatePurchaseState(ingredient) {
        const sum = Object.keys(ingredient)
                    .map(igKey => ingredient[igKey]).reduce((sum,el)=> sum+el,0)
                    this.setState({purchasable:sum>0});
    }

    addIngerdientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        const updateCount = oldCount + 1;
        const upadteIngredient = {
            ...this.state.ingredient
        }
        upadteIngredient[type] = updateCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,ingredient:upadteIngredient});
        this.updatePurchaseState(upadteIngredient);
    };
    
    removeIngerdientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        const updateCount = oldCount - 1;
        const upadteIngredient = {
            ...this.state.ingredient
        }
        if(updateCount <= -1){
            upadteIngredient[type] = 0;
        }else{
            upadteIngredient[type] = updateCount;            
        }
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice:newPrice,ingredient:upadteIngredient});
        this.updatePurchaseState(upadteIngredient);
    };

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = ()=>{    
    let queryParams = [];
    for(let i in this.state.ingredient){
        queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredient[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?'+ queryString
        });
    }
    render(){
        const disableInfo ={...this.state.ingredient};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let ordersummary = null;                
        let burger = this.state.error?<p>Ingredients can't be loaded!</p>:<Spinner/>;
        if(this.state.ingredient){
         burger = (
                <Aux>
                <Burger 
                ingredients={this.state.ingredient}
                />
                <BurgerControls 
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                Ingredientadded={this.addIngerdientHandler}
                Ingredientremove={this.removeIngerdientHandler}
                disabled={disableInfo}
                OrderSummary={this.purchaseHandler}
                />
                </Aux>
                );
                ordersummary = <OrderSummary 
                    ingredient={this.state.ingredient}
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancel={this.purchaseCancelHandler}
                    price={this.state.totalPrice}/>;
        }             
        if (this.state.loaderStatus) {
            ordersummary = <Spinner/>
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

export default withErrorHandler(burgerbuilder,axios);