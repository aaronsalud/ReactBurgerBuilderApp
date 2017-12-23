import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import Contact from '../Contact/Contact';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinue={this.checkoutContinueHandler}
                    ingredients={this.props.ingredients} />.
                    <Route path={this.props.match.path + '/contact-data'} component={Contact} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);