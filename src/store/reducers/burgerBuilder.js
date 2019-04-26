import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const initialState = {
    ingredient: null,
    totalPrice: 4,
    loaderStatus: false,
    error: false,
    building:false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updateIngredient = { [action.ingredientName]: state.ingredient[action.ingredientName] + 1 };
            const updateIngredients = updateObject(state.ingredient, updateIngredient);
            const updateState = {
                ingredient: updateIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building:true
            };
            return updateObject(state, updateState);
        case actionTypes.REMOVE_INGREDIENT:
            const updateIng = { [action.ingredientName]: state.ingredient[action.ingredientName] - 1 };
            const updateIngs = updateObject(state.ingredient, updateIng);
            const updateSt = {
                ingredient: updateIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building:true
            };
            return updateObject(state, updateSt);
        case actionTypes.SET_INGREDIENTS:
        const setIngredients = {
            ingredient: action.ingredients,
            totalPrice: 4,
            error: false,
            building: false
        };
            return updateObject(state,setIngredients);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true});
        default:
            return state;
    }
}

export default reducer;