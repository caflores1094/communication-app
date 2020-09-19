import { handleLoad, SET_SIM_SETTINGS, IMPERSONATE_USER, CLEAR_IMPERSONATION } from 'actions';
import { settingsHelper } from 'utils';

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

export const createNewSettings = (settingsToSave = {}) => (dispatch, getState) => {
    const service = settingsHelper.createManager().settings;
    const promise = service.saveAndActivate({
        ...settingsToSave,
    }).then((res) => dispatch(setSettings(res)));
    return dispatch(handleLoad(promise, 'Create new settings'));
};

export const getSettings = () => (dispatch) => {
    const service = settingsHelper.createManager().settings;
    const promise = service.getCurrentActive().then((settings) => {
        if (settings) {
            return dispatch(setSettings(settings));
        }
        return dispatch(createNewSettings());
    });

    return dispatch(handleLoad(promise, 'Getting current settings'));
};

export const updateActiveSettings = (name, value) => (dispatch, getState) => {
    const { facilitator } = getState();
    const service = settingsHelper.createManager().settings;
    const partial = { [name]: value };
    const promise = service.updateActive({
        ...facilitator.settings.current,
        ...partial,
    }).then((res) => dispatch(setSettings('current', res)));
    return dispatch(handleLoad(promise, `Update active setting: ${name}`));
};

export const setMeetingId = () => (dispatch, getState) => {
    const state = getState();
    const id = state.inputs.meetingId;
    return dispatch(updateActiveSettings('meetingId', id));
};
