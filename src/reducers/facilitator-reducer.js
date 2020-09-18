import {
    SET_SIM_SETTINGS,
    IMPERSONATE_USER,
    CLEAR_IMPERSONATION
} from 'actions';

const initialState = {
    settings: {
        runGroupings: [],
        simStatus: null,
    },
    members: [],
    runs: {},
    impersonating: null,
    viewingGrouping: null,
};

export function facilitator(state = initialState, action) {
    switch (action.type) {
        case SET_SIM_SETTINGS:
            return Object.assign({}, state, { settings: action.settings });
        case IMPERSONATE_USER:
            return Object.assign({}, state, {
                impersonating: action.runId,
            });
        case CLEAR_IMPERSONATION:
            return Object.assign({}, state, {
                impersonating: null,
            });
        default:
            return state;
    }
}
