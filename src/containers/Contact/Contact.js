import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Contact.css';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../components/HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Contact extends Component {
    state = {
        orderForm: {
            name: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
                value: ''
            },
            email: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
                value: ''
            },
            street: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
                value: ''
            },
            postal: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Postal'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                },
                touched: false,
                valid: false,
                value: ''
            },
            country: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
                value: ''
            },
            deliveryMethod: {
                type: 'select',
                config: {
                    options: [
                        { value: 'fastest', label: 'Fastest' },
                        { value: 'cheapest', label: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false,
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key]['value'];
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // Do a deep clone of form element
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key]['valid'] && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push(
                {
                    id: key,
                    elementConfig: this.state.orderForm[key]
                }
            );
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id} elementType={formElement.elementConfig.type}
                        elementConfig={formElement.elementConfig.config}
                        value={formElement.elementConfig.value}
                        onChangeHandler={event => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.elementConfig.valid}
                        shouldValidate={formElement.elementConfig.validation}
                        touched={formElement.elementConfig.touched} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.Contact}>
                <h4>Enter your Contact Details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contact, axios));