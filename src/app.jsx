import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from 'components';
import { Loading } from 'containers';
import { checkIfLoggedIn } from 'actions';
import 'normalize.css/normalize.css';
import 'css/main.scss';

class App extends Component {
    componentWillMount() {
        this.props.checkIfLoggedIn();
    }

    render() {
        const { children, loading } = this.props;
        return (
            <div>
                <Header />
                <main>
                    {children}
                </main>
                <Loading loading={loading} />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    location: PropTypes.shape({}),
    checkIfLoggedIn: PropTypes.func,
    loading: PropTypes.arrayOf(PropTypes.string),
    loginChecked: PropTypes.bool,
    requireLogin: PropTypes.bool,
    isFac: PropTypes.bool,
};

const mapStateToProps = ({ loading, login }) => ({
    loading,
    loginChecked: login.loginChecked,
    requireLogin: login.requireLogin,
    isFac: login.session.isFac,
});

const mapDispatchToProps = (dispatch) => ({
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
