import React from 'react';
import PropTypes from 'prop-types';
import './facilitator.scss';

class Facilitator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="facilitator">
                <h2>Hello Facilitator</h2>
            </div>
        );
    }
}

Facilitator.propTypes = {

};

export default Facilitator;
