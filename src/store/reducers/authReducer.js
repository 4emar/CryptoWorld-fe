import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    username: null,
    role: null,
    roles: [],
    error: false
};

const authFail = (state, action) => {
    return updateObject(state, {error: true});
}

const authLogin = (state, action) => {
    return updateObject(state, {
        token: action.token,
        username: action.username,
        role: action.role,
        error: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        role: null,
        error: false
    })
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return authLogin(state, action);
        case actionTypes.LOGIN_ERROR:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);

        default:
            return state;
    }
};

export default authReducer;
