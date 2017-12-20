import React, { Component } from 'react';
import Wrapper from '../../HOC/Wrapper/Wrapper';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be a functional component, does not have to be a class
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(key => {
                return (
                    <li key={key}>
                        <span style={{ textTransform: 'capitalize' }}>{key} </span>: {this.props.ingredients[key]}
                    </li>
                );
            })

        return (
            <Wrapper>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:</strong> {this.props.price.toFixed(2)}</p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Wrapper>
        );
    }
};

export default OrderSummary;