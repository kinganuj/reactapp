import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath:'/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return updateObject(state, { loading: true });
        case actionType.AUTH_FAIL:
            return updateObject(state, { error: action.error, loading: false });
        case actionType.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.authData.idToken,
                userId: action.authData.localId,
                loading: false
            });
        case actionType.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                userId: null,
                error: null,
                loading: false
            });
        case actionType.AUTH_REDIRECT_PATH:
            return updateObject(state, {
                authRedirectPath:action.path
            });
        default:
            return state;
    };
}

export default reducer;