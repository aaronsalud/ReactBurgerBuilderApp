import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import Contact from '../Contact/Contact';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }

        this.setState({ ingredients: ingredients })
    }

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
                    ingredients={this.state.ingredients} />.
                    <Route path={this.props.match.path + '/contact-data'} component={Contact}/>
            </div>
        );
    }
}

export default Checkout;