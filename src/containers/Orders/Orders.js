import React, { Component } from 'react';
import Order from '../../components/Checkout/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/HOC/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class Orders extends Component {

    componentDidMount() {
        this.props.onInitOrders(this.props.token);
    }

    render() {

        let ordersView = (
            <div>
                {
                    this.props.orders.map(order => {
                        return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                    })
                }
            </div>);

        if (this.props.loading) {
            ordersView = <Spinner />;
        }

        if (this.props.error) {
            ordersView = <p>ERROR: Failed to fetch orders data</p>
        }

        return (ordersView);
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: (token) => dispatch(actions.initOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));