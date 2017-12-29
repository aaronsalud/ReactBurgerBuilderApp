import React, { Component } from 'react';
import {connect} from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import classes from './Layout.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <Wrapper>
                <Toolbar sideDrawerToggle={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer isAuthenticated={this.props.isAuthenticated} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper >
        );
    }
};

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
};
export default connect(mapStateToProps, null)(Layout);