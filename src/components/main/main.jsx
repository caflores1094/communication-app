import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
const ZoomMtg = window.ZoomMtg;

import './main-page.scss';

// const joinMeeting = (signature, meetConfig) => {
//     console.warn('trying init now');
//     ZoomMtg.init({
//         debug: true,
//         leaveUrl: meetConfig.leaveUrl,
//         isSupportAV: true,
//         success: () => {
//             console.warn('SUCCESS');
//             ZoomMtg.join({
//                 signature,
//                 apiKey: meetConfig.apiKey,
//                 meetingNumber: meetConfig.meetingNumber,
//                 userName: meetConfig.userName,
//                 passWord: meetConfig.passWord
//             });
//         },
//         error: (err) => {
//             debugger;
//             console.error(err);
//         },
//     });
// };

const Main = ({ startMeeting, userName }) => {
    useEffect(() => {
        ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.8.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }, []);

    // const initMeeting = () => {
    //     startMeeting().then((meetConfig) => {
    //         console.warn(meetConfig);
    //         ZoomMtg.generateSignature({
    //             meetingNumber: meetConfig.meetingNumber,
    //             apiKey: meetConfig.apiKey,
    //             apiSecret: meetConfig.signature,
    //             role: meetConfig.role,
    //             success: function(res) {
    //                 console.log('res', res);
    //
    //                 setTimeout(() => {
    //                     joinMeeting(res.result, meetConfig);
    //                 }, 1000);
    //             },
    //         });
    //     });
    // };
    return (
        <div id="main-page">
            <h2>Welcome, {userName}</h2>
            <button onClick={() => startMeeting()}>Start Meeting</button>
        </div>
    );
};

Main.propTypes = {
};

export default Main;
