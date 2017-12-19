import React, { Component } from 'react';
import classes from './Ingredient.css';
import PropTypes from 'prop-types';

class Ingredient extends Component {

    render() {
        let burgerIngredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                burgerIngredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                burgerIngredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                burgerIngredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                burgerIngredient = <div className={classes.Cheese}></div>;
                break;
            case ('salad'):
                burgerIngredient = <div className={classes.Salad}></div>;
                break;
            case ('bacon'):
                burgerIngredient = <div className={classes.Bacon}></div>;
                break;
            default:
                burgerIngredient = null;
        }

        return burgerIngredient;
    }

}

Ingredient.PropTypes = {
    type: PropTypes.string.isRequired
}

export default Ingredient;