import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Wrapper from '../../HOC/Wrapper/Wrapper';

const navigationItems = (props) => {
    let authLinks = (
        <Wrapper>
            <NavigationItem link="/auth">Sign In</NavigationItem>
        </Wrapper>
    );

    if (props.isAuthenticated) {
        authLinks = (
            <Wrapper>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </Wrapper>
        );
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {authLinks}
        </ul>
    );
};

export default navigationItems;