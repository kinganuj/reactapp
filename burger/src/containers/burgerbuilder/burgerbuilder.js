import React,{Component} from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/burger/burger";
import BurgerControls from "../../components/burger/burgercontrols/burgercontrols";
import Modal from "../../components/ui/modal/modal"
import OrderSummary from "../../components/burger/ordersummary/ordersummary"

const INGREDIENT_PRICE ={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
};

class burgerbuilder extends Component{
    state = {
        ingredient :{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    };

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
        alert("You continue!");
    }
    render(){
        const disableInfo ={...this.state.ingredient};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredient={this.state.ingredient}
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancel={this.purchaseCancelHandler}
                    price={this.state.totalPrice}/>
                </Modal>
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
    };
}

export default burgerbuilder;