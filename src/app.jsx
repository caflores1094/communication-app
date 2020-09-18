import React, { useEffect, Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from 'components';
import { Loading } from 'containers';
import { checkIfLoggedIn } from 'actions';
import 'normalize.css/normalize.css';
import 'css/main.scss';

const App = ({ checkIfLoggedIn, zoomIsVisible, children, loading }) => {
    useEffect(() => {
        checkIfLoggedIn();
    }, []);
    useEffect(() => {
        const zoomMeeting = document.getElementById('zmmtg-root');
        if (zoomIsVisible) {
            zoomMeeting.classList.add('visible');
        } else {
            zoomMeeting.classList.remove('visible');
        }
    }, [zoomIsVisible]);
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Loading loading={loading} />
        </div>
    );

};

App.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    location: PropTypes.shape({}),
    checkIfLoggedIn: PropTypes.func,
    loading: PropTypes.arrayOf(PropTypes.string),
    loginChecked: PropTypes.bool,
    requireLogin: PropTypes.bool,
    isFac: PropTypes.bool,
};

const mapStateToProps = ({ inputs, loading, login }) => ({
    loading,
    loginChecked: login.loginChecked,
    requireLogin: login.requireLogin,
    isFac: login.session.isFac,
    zoomIsVisible: !!inputs['zoom-visibility'],
});

const mapDispatchToProps = (dispatch) => ({
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
