import { UPDATE_INPUT, UPDATE_INPUTS, LOGOUT } from 'actions';

const initialState = {};

export function inputs(state = initialState, action) {
    switch (action.type) {
        case UPDATE_INPUT:
            return Object.assign({}, state, { [action.name]: action.value });
        case UPDATE_INPUTS:
            return Object.assign({}, state, action.inputs);
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
