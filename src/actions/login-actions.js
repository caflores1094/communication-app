import { authHelper } from 'utils';
import {
    CHECKED_LOGIN,
    RECEIVE_USER_SESSION,
    SET_AVAILABLE_GROUPS,
    LOGOUT,
    setError,
    handleLoad,
    getSettings,
} from 'actions';

const handleSessionData = (data) => ({
    type: RECEIVE_USER_SESSION,
    session: data,
});

const handleLoggedIn = (session) => {
    return (dispatch) => {
        dispatch(handleSessionData(session));
        dispatch(getSettings());
    };
};

export function checkIfLoggedIn() {
    return (dispatch) => {
        dispatch({
            type: CHECKED_LOGIN,
            checked: true,
        });

        if (authHelper.isLoggedIn()) {
            return dispatch(handleLoggedIn(authHelper.getSessionData()));
        }
        return Promise.resolve();
    };
}

export function setAvailableGroups(groups) {
    return (dispatch, getState) => {
        /* If it's already empty do not dispatch an action */
        if (!groups.length && !getState().login.availableGroups.length) {
            return;
        }

        dispatch({ type: SET_AVAILABLE_GROUPS, groups });
    };
}

export function login(credentials, group = null) {
    return (dispatch, getState) => {
        const promise = authHelper.login(credentials, group).then(() => {
            return dispatch(handleLoggedIn(authHelper.getSessionData()));
        }).catch((error) => {
            if (error.userGroups && error.userGroups.length) {
                dispatch(setAvailableGroups(error.userGroups));
            } else {
                dispatch(setError(error.status, true));
            }
        });

        return dispatch(handleLoad(promise, 'Logging In'));
    };
}

export function logout() {
    return (dispatch) => {
        return authHelper.logout().then(() => {
            dispatch({
                type: LOGOUT,
            });
        }).catch((error) => {
            console.error(error);
        });
    };
}
