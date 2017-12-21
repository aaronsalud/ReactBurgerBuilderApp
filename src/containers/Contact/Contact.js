import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Contact.css';

class Contact extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: ''
        }
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
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Stree" />
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal" />
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