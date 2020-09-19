import { updateInput, handleLoad } from 'actions';
import { access } from 'utils';

export const getZoomSignatureDetails = (meetingNumber, role) => {
    return (dispatch, getState) => {
        const promise = fetch(`zoom-signature?role=${role}&meetingNumber=${meetingNumber}`).then((d) => d.json());

        return dispatch(handleLoad(promise, 'fetching-zoom-signature'));
    };
};

export const startMeeting = (ZoomMtg) => {
    return (dispatch, getState) => {
        const state = getState();
        const userName = state.login.session.userName;
        const meetingNumber = access(state, ['facilitator', 'settings', 'meetingId']);
        if (!meetingNumber) {
            return console.error('No meeting id set!');
        }
        const role = Number(state.login.session.isFac);
        return dispatch(getZoomSignatureDetails(meetingNumber, role))
            .then(({ signature, apiKey }) => {
                dispatch(updateInput('zoom-visibility', true));
                const meetConfig = {
                    apiKey,
                    userName,
                    meetingNumber,
                    role,
                    signature,
                    userEmail: `${userName}@forio.com`, //TODO: Make this an input? idk
                    leaveUrl: 'forio.com',
                    passWord: 'flores2020', // if required
                };

                const ZoomMtg = window.ZoomMtg;
                ZoomMtg.init({
                    leaveUrl: meetConfig.leaveUrl,
                    isSupportAV: true,
                    success: () => {
                        console.warn('Successful ZoomMtg Init!');
                        ZoomMtg.join({
                            signature,
                            apiKey,
                            meetingNumber: meetConfig.meetingNumber,
                            userName: meetConfig.userName,
                            passWord: meetConfig.passWord,
                        });
                    },
                    error: (err) => {
                        console.error(err);
                    },
                });
            });
    };
};
