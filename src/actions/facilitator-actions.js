import { SET_SIM_SETTINGS, IMPERSONATE_USER, CLEAR_IMPERSONATION } from 'actions';

export const setSettings = (settings) => ({
    type: SET_SIM_SETTINGS,
    settings,
});

export function impersonateIndividualUser(runId) {
    return {
        type: IMPERSONATE_USER,
        runId,
    };
}
export function clearImpersonation() {
    return {
        type: CLEAR_IMPERSONATION,
    };
}
