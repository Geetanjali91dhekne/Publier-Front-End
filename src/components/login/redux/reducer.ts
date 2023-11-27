import loginTypes, { CommonAction, LoginActionTypes, LoginState, UserState } from './types';

const initialState: LoginState = {
    loading: false,
    error: undefined,
};

export const loginReducer = (state = initialState, action: LoginActionTypes): LoginState => {
    switch (action.type) {
        case loginTypes.LOGIN_REQ:
            return {
                ...state,
                loading: true,
            };
        case loginTypes.LOGIN_REQ_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case loginTypes.LOGIN_REQ_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

const userInitialState: UserState = {
    jwtToken: undefined,
    user: undefined,
};

export const userReducer = (state = userInitialState, action: CommonAction): UserState => {
    switch (action.type) {
        case loginTypes.SET_USER_DATA:
            const userState: UserState = action.payload;
            return userState;
        case loginTypes.REMOVE_USER_DATA:
            return userInitialState;
        default:
            return state;
    }
};
