import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './textbox.scss';
import { toNumString, toCurrency, removeSymbols } from 'utils';

const whiteListMap = {
    number: '0123456789,.',
    currency: '0123456789,.$',
};

const typeMap = {
    number: 'text',
    currency: 'text',
};
const numericTypes = ['number', 'currency'];

const addSymbols = (type, value, decimals) => {
    switch (type) {
        case 'number': return toNumString(value, decimals);
        case 'currency': return toCurrency(value, decimals);
        default: return value;
    }
};

class Textbox extends Component {
    state = {
        isFocused: false,
        valAtFocus: this.props.value,
    }
    setFocused = (isFocused, val) => {
        const newState = { isFocused };
        if (isFocused) {
            newState.valAtFocus = val;
        }
        this.setState(newState, () => {
            // Highlight contents if you're using numeric input; timeout to make sure update
            // functions do not overwrite it.
            if (isFocused && numericTypes.includes(this.props.type)) {
                setTimeout(() => this.input.select(), 0);
            }
        });
    };

    componentDidUpdate(prevProps, prevState) {
        const isNumeric = numericTypes.includes(this.props.type);
        if (!isNumeric) return;
        if (!prevState.isFocused && this.state.isFocused) {
            this.input.select();
        }

    }


    /* eslint-disable complexity */
    handleChange = (value) => {
        const { handleInput, min, max, type, name } = this.props;
        const isNumeric = numericTypes.includes(type);
        const whitelist = whiteListMap[type] || '';
        const inValidOutput = `${value}`.split('').find((char) => whitelist.split('').indexOf(char) < 0);


        if (!inValidOutput || !whitelist) {
            if (isNumeric && (min || min === 0) && parseFloat(value) < min) {
                handleInput(name, min);
            } else if (isNumeric && (max || max === 0) && parseFloat(value) > max) {
                handleInput(name, max);
            } else {
                handleInput(name, value);
            }
        }
    }
    /* eslint-enable complexity */

    render() {
        const { name, handleInput, handleBlur, handleFocus, type, label, value, decimals, disabled, min } = this.props;
        const isNumeric = numericTypes.includes(type);
        const defaultValue = isNumeric ? addSymbols(type, min || 0, decimals) : '';
        const val = value !== undefined ? value : defaultValue;
        const options = {
            id: name,
            type: typeMap[type] || type,
            onFocus: (e) => {
                if (isNumeric) {
                    const valueToSave = removeSymbols(e.target.value);
                    handleInput(name, valueToSave);
                }
                this.setFocused(true, e.target.value);
                handleFocus();
            },
            onChange: (e) => this.handleChange(e.target.value),
            onBlur: (e) => {
                this.setFocused(false);
                let valueToSave = e.target.value;
                if (isNumeric) {
                    valueToSave = parseFloat(removeSymbols(value), 10);
                    valueToSave = isNaN(valueToSave) ?
                        addSymbols(type, 0, decimals) :
                        addSymbols(type, valueToSave, decimals);
                }
                handleInput(name, valueToSave);
                handleBlur(name, valueToSave, this.state.valAtFocus);
            },
            className: 'input-text',
            value: val,
            ref: (input) => this.input = input,
            disabled,
        };

        return (
            <div className={`input-text-wrapper ${type}`}>
                {label ? <label htmlFor={name} className="input-text-label">{label}</label> : null}
                {type === 'textarea' ?
                    <textarea {...options} /> :
                    <input {...options} />
                }
            </div>
        );
    }
}

Textbox.defaultProps = {
    decimals: 0,
    label: '',
    type: 'text',
    append: '',
    handleBlur: () => undefined,
    handleFocus: () => undefined,
};

Textbox.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    handleInput: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    decimals: PropTypes.number,
    value: PropTypes.string,
    handleBlur: PropTypes.func,
    handleFocus: PropTypes.func,
    append: PropTypes.string,
};

export default Textbox;