import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { updateInput } from 'actions';
import { access } from 'utils';

/* eslint-disable complexity */

const UserRoute = ({ component: Component, isFac, isLoggedIn, location, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isLoggedIn) {
                return <Redirect to="/login" />;
            } else if (isFac) {
                return <Redirect to="/facilitator" />;
                // Include options / redirects if Fac is allowed to impersonate
            } else {
                // Include Redirects based on Sim Status (Open / Closed / etc)
            }
            return <Component {...props} />;
        }}
    />
);

UserRoute.propTypes = {
    isLoggedIn: PropTypes.bool,
    isFac: PropTypes.bool,
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
    }),
};

const mapStateToProps = (state, { location }) => ({
    isLoggedIn: !state.login.requireLogin,
    isFac: access(state, ['login', 'session', 'isFac'], false),
    location,
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRoute));
