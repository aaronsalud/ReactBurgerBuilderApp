import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../components/HOC/Wrapper/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        checkingOut: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }
    purchaseHandler = () => {
        this.setState({ checkingOut: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ checkingOut: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    updateCheckoutState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Failed to fetch ingredients</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Wrapper>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updateCheckoutState(this.props.ingredients)}
                        ordered={this.purchaseHandler} />
                </Wrapper>
            );
            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice} />;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Wrapper>
                <Modal show={this.state.checkingOut} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients())
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));