import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { logout } from 'actions';
import PropTypes from 'prop-types';

const PublicRoute = ({ component: Component, isFac, isLoggedIn, location, logout, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            const currentPath = location.pathname;
            if (currentPath === '/login' && isLoggedIn) {
                // Don't let the user go to login page if theyre logged in
                // return isFac ? <Redirect to="/facilitator" /> : <Redirect to="/" />;
                return <Redirect to="/" />;
            } else if (currentPath === '/logout' && isLoggedIn) {
                logout()
                return <Redirect to="/login" />;
            } else {
                // Show the page if any public page other than login page
                return <Component {...props} />;
            }
        }}
    />
);

PublicRoute.propTypes = {
    isFac: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    currentPath: PropTypes.string,
};

const mapStateToProps = (state, { location }) => ({
    isLoggedIn: !state.login.requireLogin,
    isFac: state.login.session.isFac,
    location,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicRoute));
