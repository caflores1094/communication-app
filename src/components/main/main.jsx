import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FacForm } from 'containers';
const ZoomMtg = window.ZoomMtg;

import './main-page.scss';

const Main = ({ startMeeting, userName, isFac, meetingId }) => {
    useEffect(() => {
        ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.8.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }, []);

    return (
        <div id="main-page">
            <h2>Welcome, {userName}</h2>
            {isFac ? <FacForm /> : null}
            <strong>Meeting ID: {meetingId || 'none'}</strong>
            <button disabled={!meetingId} onClick={() => startMeeting()}>{isFac ? 'Start' : 'Join'} Meeting</button>
        </div>
    );
};

Main.propTypes = {
};

export default Main;
