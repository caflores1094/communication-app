import {
    CHECKED_LOGIN,
    RECEIVE_USER_SESSION,
    SET_AVAILABLE_GROUPS,
    LOGOUT,
} from 'actions';

const initialState = {
    availableGroups: [],
    loginChecked: false,    // Flag for check if player is logged in on initial load
    requireLogin: true,     // Flag for redirect on unauthorized routes
    session: {},
};

export function login(state = initialState, action) {
    switch (action.type) {
        case CHECKED_LOGIN:
            return Object.assign({}, state, {
                loginChecked: action.checked,
            });
        case RECEIVE_USER_SESSION:
            return Object.assign({}, state, {
                requireLogin: false,
                session: action.session,
            });
        case SET_AVAILABLE_GROUPS:
            return Object.assign({}, state, {
                availableGroups: action.groups,
            });
        case LOGOUT:
            return Object.assign({}, initialState, {
                loginChecked: true,
            });
        default:
            return state;
    }
}
