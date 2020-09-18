import { connect } from 'react-redux';
import { Main } from 'components';
import { startMeeting, updateInput } from 'actions';

const mapStateToProps = (state) => ({
    userName: state.login.session.userName,
});

const mapDispatchToProps = (dispatch) => ({
    startMeeting: (ZoomMtg) => dispatch(startMeeting(ZoomMtg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
