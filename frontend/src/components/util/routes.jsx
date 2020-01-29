import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// If user is logged in change their page
const Auth = ({ component: Component, exact, path, loggedIn }) => (
    <Route
        path={path}
        exact={exact}
        render={props => (
            !loggedIn ?
                <Component {...props} /> : <Redirect to="/" />
        )}
    />
)

// If user is logged out in go to login page
const Protected = ({ component: Component, exact, path, loggedIn }) => (
    <Route
        path={path}
        exact={exact}
        render={props => (
            loggedIn ?
                <Component {...props} /> : <Redirect to="/login" />
        )} />
)

const msp = state => ({
    loggedIn: state.auth.isAuthenticated,
});

export const AuthRoute = connect(msp)(Auth);
export const ProtectedRoute = connect(msp)(Protected);