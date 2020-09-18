import { connect } from 'react-redux';
import { Loading } from 'components';

const mapStateToProps = (state) => ({
    loading: state.loading,
    ignoreLoadScreen: state.loading.every(({ ignoreLoadScreen }) => !!ignoreLoadScreen),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
