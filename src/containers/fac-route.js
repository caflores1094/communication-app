import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { parseQuery } from 'utils';

const FacRoute = ({ component: Component, isFac, isLoggedIn, location: { pathname, search }, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isLoggedIn) {
                return <Redirect to="/login" />;
            }
            if (!isFac) {
                return <Redirect to="/" />;
            }
            // Handle Fac specific redirects here
            // For example: Impersonation related redirects

            return <Component {...props} />;
        }}
    />
);

FacRoute.propTypes = {
    isLoggedIn: PropTypes.bool,
    isFac: PropTypes.bool,
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
    }),
};

const mapStateToProps = (state, { location }) => ({
    isLoggedIn: !state.login.requireLogin,
    isFac: state.login.session.isFac,
    location,
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FacRoute));
