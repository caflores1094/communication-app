import { connect } from 'react-redux';
import { Main } from 'components';
import { startMeeting } from 'actions';

const mapStateToProps = (state) => ({
    userName: state.login.session.userName,
    isFac: state.login.session.isFac,
    meetingId: state.facilitator.settings.meetingId,
});

const mapDispatchToProps = (dispatch) => ({
    startMeeting: (ZoomMtg) => dispatch(startMeeting(ZoomMtg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
