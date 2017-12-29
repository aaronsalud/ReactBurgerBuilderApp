import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateState(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateState(state, { error: null, loading: false, token: action.token, userId: action.userId });
};

const authFailed = (state, action) => {
    return updateState(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action);
        default:
            return state;

    }
};

export default reducer;