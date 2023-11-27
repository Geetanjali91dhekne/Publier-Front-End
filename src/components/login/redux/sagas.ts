import { REHYDRATE } from 'redux-persist';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { setInterceptor, setJwtToken } from '../../../api/apiServices';
import { HEADERMENU_PATH } from '../../../routes/RoutesURL';
import { RootState } from '../../../store/RootReducer';
import LoginActions from './actions';
import loginTypes, { loginReqAction, UserState, CommonAction } from './types';
import MessageActions from '../../message/redux/actions';
import AdOptDashboardAction from '../../main/dashboard/AdOptimization/redux/actions';
import AdBlockDashboardActions from '../../main/dashboard/AdBlockRecovery/redux/actions';

const getUser = (state: RootState) => state.user;

const loginReq = function* loginReq({ payload }: loginReqAction) {
    try {
        if (!payload.jwtToken) return;
        yield delay(800);
        let userData: UserState = payload;
        yield call(setJwtToken, payload.jwtToken);
        yield put(LoginActions.loginReqSuccess());
        yield put(
            LoginActions.setUserData({
                user: userData.user,
                jwtToken: userData.jwtToken,
            }),
        );
        if (userData.user?.publisher_type === 'super_admin') {
            yield call(window.open, `${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}`, '_self');
        } else {
            yield call(window.open, `https://publir.com/app/login`, '_self'); //TODO we need to remove after client design ready
        }
    } catch (err) {
        yield put(LoginActions.loginReqFailed());
    }
};

const forbiddenTokenIssue = function* forbiddenTokenIssue(action: CommonAction) {
    const apiPayload = action.payload;
    if (apiPayload && parseInt(apiPayload) === 403) {
        let errorMsg = 'Your Token has been expired. Please Login again!!';
        yield put(MessageActions.showMessage({ error: true, text: String(errorMsg) }));
        yield put(LoginActions.removeUserData());
        yield call(window.open, HEADERMENU_PATH.login, '_self');
    }
};

const appInit = function* appInit() {
    yield call(setInterceptor);
    const curPath = window.location.pathname;
    const user: UserState = yield select(getUser);
    let isAuthenticated = false;
    if (user.jwtToken) {
        yield call(setJwtToken, user.jwtToken);
        isAuthenticated = true;
        if (user.user?.publisher_type === 'super_admin') {
            yield put(AdOptDashboardAction.fetchAllSites());
            yield put(AdBlockDashboardActions.fetchAdBlockList());
        }
    }
    if (curPath !== HEADERMENU_PATH.login && !isAuthenticated) {
        yield call(window.open, HEADERMENU_PATH.login, '_self');
    }
};

export default function* sagas() {
    yield takeLatest(loginTypes.LOGIN_REQ, loginReq);
    yield takeLatest(loginTypes.CHECK_AUTH_USER, forbiddenTokenIssue);
    yield takeLatest(REHYDRATE, appInit);
}
