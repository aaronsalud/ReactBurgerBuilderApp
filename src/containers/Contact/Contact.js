import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Contact.css';
import Input from '../../components/UI/Input/Input';

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
                value: 'fastest'
            }
        },
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key]['value'];
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
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
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({ orderForm: updatedOrderForm });
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
                        shouldValidate={formElement.elementConfig.validation}/>
                ))}
                <Button btnType="Success">Order</Button>
            </form>
        );

        if (this.state.loading) {
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

export default Contact;