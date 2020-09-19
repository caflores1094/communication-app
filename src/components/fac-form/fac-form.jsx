import React, { useEffect } from 'react';
import { Textbox } from 'components';
import PropTypes from 'prop-types';
import './fac-form.scss';

const FacForm = ({ setMeetingId, updateInput, meetingId }) => {
    return (
        <div id="fac-form">
            <Textbox
                label="Please Submit a Meeting ID"
                name="meetingId"
                handleInput={updateInput}
                value={meetingId}
            />
            <button onClick={setMeetingId} disabled={!meetingId}>Set Meeting Id</button>
        </div>
    );
};

FacForm.propTypes = {
};

export default FacForm;
