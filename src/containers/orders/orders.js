import React, { Component } from 'react';
import Order from '../../components/order/order';
import axios from '../../axios-order';
import { connect } from 'react-redux';
import * as orderAction from '../../store/actions/index';
import withErrorHandler from '../../hoc/witherrorhandler/witherrorhandler';
import Spinner from '../../components/ui/spinner/spinner';

class orders extends Component {
    componentDidMount() {
        // console.log(this.props.userId);
        this.props.onFetchOrders(this.props.token,this.props.userId);
        // axios.get('/order.json')
        // .then(res =>{
        //     const fetchedOrders = [];
        //     for(let key in res.data){
        //         fetchedOrders.push({
        //             ...res.data[key],
        //         id:key
        //         });
        //     }
        //     this.setState({loading:false,orders:fetchedOrders});
        // })
        // .catch(err => {
        //     this.setState({loading:false});
        // });
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders =
                this.props.orders.map(order => (
                    <Order key={order.id}
                        ingredient={order.ingredients}
                        price={+order.price} />
                ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(orderAction.fetchOrder(token,userId))
    };
};

export default connect(mapStateProps, mapDispatchToProps)(withErrorHandler(orders, axios));