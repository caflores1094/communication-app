import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
const ZoomMtg = window.ZoomMtg;

import './main-page.scss';

const Main = ({ startMeeting, userName, isFac }) => {
    useEffect(() => {
        ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.8.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }, []);

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
