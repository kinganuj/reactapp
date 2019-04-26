import * as actionType from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};
export const purchaseBurgerFailed = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = ()=>{
    return {
        type:actionType.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/order.json', orderData)
            .then(response => {
                // console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            });
    };
};

export const purchaseInit = ()=>{
    return {
        type:actionType.PURCHASE_INIT
    };
};

export const fetchOrderStart = ()=>{
    return {
        type:actionType.FETCH_ORDERS_START
    };
};
export const fetchOrderSuccess = (orders)=>{
    return {
        type:actionType.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};
export const fetchOrderFail = (error)=>{
    return {
        type:actionType.FETCH_ORDERS_FAIL,
        error:error
    };
};

export const fetchOrder = (token,userId)=>{
    return dispatch =>{
        dispatch(fetchOrderStart());
        axios.get('/order.json?orderBy="userId"&equalTo="'+userId+'"')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrderFail(error))
        });
    }

}