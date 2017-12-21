import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
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

    render(){
        return(
            <div className={classes.Contact}>
                <h4>Enter your Contact Details</h4>
                <form action="">
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your Stree"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Your Postal"/>
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        );
    }
}

export default Contact;