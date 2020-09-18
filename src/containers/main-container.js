import { connect } from 'react-redux';
import { Main } from 'components';
import { updateInput } from 'actions';

const mapStateToProps = (state) => ({
    userName: state.login.session.userName,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
