import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChangeHandler} />;
            break;

        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChangeHandler} />;
            break;

        case ('select'):
            inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.onChangeHandler}>
                {
                    props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
                <option value=""></option>
            </select>
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChangeHandler} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

}

export default input;