import loginTypes, { LoginActionTypes, removeUserDataAction, forbiddenTokenAction, setUserDataAction, TokenState, UserState, } from './types';

function loginReq(userData: UserState): LoginActionTypes {
    return {
        type: loginTypes.LOGIN_REQ,
        payload: userData,
    };
}

function loginReqSuccess(): LoginActionTypes {
    return {
        type: loginTypes.LOGIN_REQ_SUCCESS,
    };
}

function loginReqFailed(): LoginActionTypes {
    return {
        type: loginTypes.LOGIN_REQ_FAILED,
    };
}

function setUserData(userData: UserState): setUserDataAction {
    return {
        type: loginTypes.SET_USER_DATA,
        payload: userData,
    };
}

function removeUserData(): removeUserDataAction {
    return {
        type: loginTypes.REMOVE_USER_DATA,
    };
}

function forbiddenTokenIssue(errorMessage: TokenState): forbiddenTokenAction {
    return {
        type: loginTypes.CHECK_AUTH_USER,
        payload: errorMessage
    };
}

const LoginActions = {
    loginReq,
    loginReqSuccess,
    loginReqFailed,
    setUserData,
    removeUserData,
    forbiddenTokenIssue
};

export default LoginActions;
