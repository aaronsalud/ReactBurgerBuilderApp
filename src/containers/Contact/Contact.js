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
                value: ''
            },
            email: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            street: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            postal: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Postal'
                },
                value: ''
            },
            country: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
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
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
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

    render() {

        let form = (
            <form action="">
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Your Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Your Postal" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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