import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './loading.scss';

const Loading = ({ loading, ignoreLoadScreen }) => (
    <div className="loading">
        <span className="accessibility-text" aria-live="polite" aria-atomic>{loading.length ? 'Loading' : 'Finished Loading'}</span>
        {!ignoreLoadScreen && loading.length > 0 ? (<Fragment>
            <div className="loading-background-cover" />
            <span className="pulse-loading" />
        </Fragment>) : null}
    </div>
);


Loading.propTypes = {
    loading: PropTypes.arrayOf(PropTypes.object),
    ignoreLoadScreen: PropTypes.bool,
};

export default Loading;
