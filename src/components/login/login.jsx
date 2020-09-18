import React from 'react';
import PropTypes from 'prop-types';
import { Textbox } from 'components';
import { Redirect } from 'react-router-dom';
import './login.scss';

class Login extends React.Component {

    render() {
        const { handleLogin, inputs, updateInput, requireLogin, availableGroups, errorMessage } = this.props;
        const { username, password, group } = inputs;
        return (
            !requireLogin ? <Redirect to="/"/> : (
                <div id="login">
                    <form
                        id="login-form"
                        onSubmit={(e) => handleLogin({ username, password }, group, e)}
                    >
                        <Textbox
                            label="Username"
                            handleInput={updateInput}
                            name="username"
                            value={username}
                        />
                        <Textbox
                            label="Password"
                            type="password"
                            handleInput={updateInput}
                            name="password"
                            value={password}
                        />
                        {availableGroups.length ? (
                            <div>
                                <label htmlFor="group">
                                    Select Class:
                                </label>
                                <select defaultValue="select-one" name="group" id="group" onChange={(e) => updateInput('group', e.target.value)}>
                                    <option disabled value="select-one">Please select a class</option>
                                    {availableGroups.map(({ id, text }) => (
                                        <option key={id} value={id}>{text}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null}
                        <button type="submit" aria-describedby="login-error">Login</button>
                        {errorMessage ? <p id="login-error">{errorMessage}</p> : null}
                    </form>
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
