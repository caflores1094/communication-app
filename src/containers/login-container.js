import { connect } from 'react-redux';
import { login, updateInput, setError } from 'actions';
import { Login } from 'components';

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const LOGIN_ERRORS = {
    [UNAUTHORIZED]: '',
    [FORBIDDEN]: '',
};

const getErrorMessage = (errors) => {
    if (!errors.length) {
        return null;
    }

    // find the first error in the errors array that we have a message for
    return LOGIN_ERRORS[errors.find((name) => LOGIN_ERRORS[name])];
};


const mapStateToProps = (state) => ({
    inputs: state.inputs,
    requireLogin: state.login.requireLogin,
    errorMessage: getErrorMessage(state.errors),
    availableGroups: state.login.availableGroups.map((group) => ({ id: group.id, text: group.name })),
});

const mapDispatchToProps = (dispatch) => ({
    handleLogin: (credentials, group = null, e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(login(credentials, group));
    },
    updateInput: (name, value) => dispatch(updateInput(name, value)),
    resetLoginErrors: () => {
        dispatch(setError(UNAUTHORIZED, false));
        dispatch(setError(FORBIDDEN, false));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
