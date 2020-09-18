import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from 'actions';

class Logout extends Component {
    componentWillMount() {
        this.props.logout();
    }

    render() {
        return <div><Redirect to="/login" /></div>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

Logout.propTypes = {
    logout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Logout);
