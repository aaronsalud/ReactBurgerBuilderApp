import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false,
                valid: false,
                value: ''
            },
            password: {
                type: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                touched: false,
                valid: false,
                value: ''
            }
        }
    };

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

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push(
                {
                    id: key,
                    elementConfig: this.state.controls[key]
                }
            );
        }

        const form = formElementsArray.map(formElement => {
            return <Input key={formElement.id}
                elementType={formElement.elementConfig.type}
                elementConfig={formElement.elementConfig.config}
                value={formElement.elementConfig.value}
                onChangeHandler={event => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.elementConfig.valid}
                shouldValidate={formElement.elementConfig.validation}
                touched={formElement.elementConfig.touched}
            />
        });
        return (
            <div className={classes.Auth}>
                <form action="">
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        );
    }
}

export default Auth;