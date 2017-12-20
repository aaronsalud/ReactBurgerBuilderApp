import React from 'react';

import Wrapper from '../../../hoc/Wrapper';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>{key} </span>: {props.ingredients[key]}
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
            <p>Continue to checkout?</p>
        </Wrapper>
    );
};

export default orderSummary;