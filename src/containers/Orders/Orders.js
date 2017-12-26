import React, { Component } from 'react';
import Order from '../../components/Checkout/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentWillMount() {
        this.props.onInitOrders();
    }

    render() {
        return (
            <div>
                {
                    this.props.orders.map(order => {
                        return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: () => dispatch(actions.initOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));