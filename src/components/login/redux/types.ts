/* Action Tyes */
const loginTypes = {
    LOGIN_REQ: 'LOGIN_REQ',
    LOGIN_REQ_SUCCESS: 'LOGIN_REQ_SUCCESS',
    LOGIN_REQ_FAILED: 'LOGIN_REQ_FAILED',
    SET_USER_DATA: 'SET_USER_DATA',
    REMOVE_USER_DATA: 'REMOVE_USER_DATA',
    CHECK_AUTH_USER: 'CHECK_AUTH_USER'
};

export default loginTypes;

export interface CommonAction {
    type: string;
    payload: any;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface LoginState {
    loading: boolean;
    error?: string;
}

export type role = 'super_admin' | 'user';

export interface User {
    id: string;
    publisher_id: string;
    full_name: string;
    email: string;
    referral_code?: string;
    publisher_type: role;
    access_type?: string;
    show_network_level_data: 'Y' | 'N';
    verification_link?: string;
    profile_pic?: string;
    parent_gam_id?: string;
    gam_api_name?: string;
    gam_api_email?: string;
    gam_api_passcode?: string;
    gam_api_status?: 'Y' | 'N';
    created_at: string;
    verified_at?: string;
    lastlogin_at: string;
    status: 'Y' | 'N';
    updated_at: string;
}

export interface UserState {
    jwtToken?: string;
    user?: User;
}

/*  actions protocals */
export interface loginReqAction {
    type: typeof loginTypes.LOGIN_REQ;
    payload: UserState;
}

export interface loginReqSuccessAction {
    type: typeof loginTypes.LOGIN_REQ_SUCCESS;
}

export interface loginReqFailedAction {
    type: typeof loginTypes.LOGIN_REQ_FAILED;
}

export interface setUserDataAction {
    type: typeof loginTypes.SET_USER_DATA;
    payload: UserState;
}

export interface removeUserDataAction {
    type: typeof loginTypes.REMOVE_USER_DATA;
}

// For Token expire 403 error handling...

export interface TokenState {
    errorMessage?: any;
}

export interface forbiddenTokenAction {
    type: typeof loginTypes.CHECK_AUTH_USER;
    payload: TokenState;
}

export type LoginActionTypes = loginReqAction | loginReqSuccessAction | loginReqFailedAction;
