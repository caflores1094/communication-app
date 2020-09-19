import { connect } from 'react-redux';
import { FacForm } from 'components';
import { updateInput, setMeetingId } from 'actions';

const mapStateToProps = (state) => ({
    meetingId: state.inputs.meetingId,
});

const mapDispatchToProps = (dispatch) => ({
    setMeetingId: () => dispatch(setMeetingId()),
    updateInput: (key, value) => dispatch(updateInput(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacForm);
