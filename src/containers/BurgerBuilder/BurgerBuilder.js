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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasable: false,
        checkingOut: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(
        //     response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }
    purchaseHandler = () => {
        this.setState({ checkingOut: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ checkingOut: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    updateCheckoutState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.props.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updateCheckoutState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount - 1;

        if (oldCount <= 0) {
            return;
        }

        const updatedIngredients = {
            ...this.props.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updateCheckoutState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Failed to fetch ingredients</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Wrapper>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Wrapper>
            );
            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

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
        ingredients: state.ingredients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredient) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredient }),
        onIngredientRemoved: (ingredient) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredient })
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));