import { updateInput, handleLoad } from 'actions';
const MEETING_NUMBER = '7609270355';

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
        const meetingNumber = MEETING_NUMBER; //TODO: Get this from data API? or set it in a world?
        const role = 0; //TODO Base on user type?
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
                    leaveUrl: 'https://forio.com',
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
                            passWord: meetConfig.passWord
                        });
                    },
                    error: (err) => {
                        debugger;
                        console.error(err);
                    },
                });
            });
    };
};
