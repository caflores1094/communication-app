import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './login.scss';

class Login extends React.Component {

    render() {
        const { inputs, updateInput, requireLogin, availableGroups, errorMessage } = this.props;

        return (
            !requireLogin ? <Redirect to="/"/> : (
                <div id="login">
                    <h1>Congrats! You did a build!</h1>
                    <p>Eventually, this will be the build's login page.</p>
                    <p>You can build the login page in login.jsx, or fiddle with app.jsx to get past it</p>
                    <br />
                    <p>Have a parrot</p>
                    <div><iframe src="https://giphy.com/embed/l3q2zVr6cu95nF6O4" ></iframe></div><p><a href="https://giphy.com/gifs/producthunt-party-parrot-parrots-l3q2zVr6cu95nF6O4">via GIPHY</a></p>
                </div>)
        );
    }
}

Login.propTypes = {
    inputs: PropTypes.objectOf(PropTypes.string),
    availableGroups: PropTypes.arrayOf(PropTypes.object),
    updateInput: PropTypes.func,
    handleLogin: PropTypes.func,
    resetLoginErrors: PropTypes.func,
    requireLogin: PropTypes.bool,
    errorMessage: PropTypes.string,
};

export default Login;
