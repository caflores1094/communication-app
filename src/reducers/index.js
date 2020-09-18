import { errors } from 'reducers/error-reducer';
import { loading } from 'reducers/loading-reducer';
import { inputs } from 'reducers/input-reducer';
import { login } from 'reducers/login-reducer';
import { facilitator } from 'reducers/facilitator-reducer';

const reducerList = {
    errors,
    facilitator,
    loading,
    inputs,
    login,
};

export default reducerList;
