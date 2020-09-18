import React from 'react';
import PropTypes from 'prop-types';
import './main-page.scss';

class Test extends React.Component {
    render() {
        const { userName } = this.props;
        return (
            <div id="main-page">
                Welcome, {userName}
            </div>
        );
    }
}

Test.propTypes = {

}

export default Test;
