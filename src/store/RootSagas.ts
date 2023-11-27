import { takeEvery, all, fork, SelectEffect, select } from 'redux-saga/effects';
import loginSagas from '../components/login/redux/sagas';
import adOptDashboardSagas from '../components/main/dashboard/AdOptimization/redux/sagas';
import subsDashboardSagas from '../components/main/dashboard/Subscriptions/redux/sagas';
import crowdFundingSagas from '../components/main/dashboard/CrowdFunding/redux/sagas';
import adBlockSagas from '../components/main/dashboard/AdBlockRecovery/redux/sagas';
import quickShopSagas from '../components/main/dashboard/QuickShop/redux/sagas';
import setupAdBlockRecoverySagas from '../components/main/setup/SetupAdBlockRecovery/redux/sagas';
import prebidSagas from '../components/main/prebidUpload/NetwrokUpload/redux/sagas';
import onboardingSagas from '../components/main/onboarding/redux/sagas';
import networkSettingSagas from '../components/main/prebidUpload/NetworkSettings/redux/sagas';

function* watchAndLog() {
    yield takeEvery('*', function* logger(action) {
        const state: SelectEffect = yield select();
        console.debug('action', action);
        console.debug('state after', state);
    });
}

export default function* root() {
    const allForks = [fork(loginSagas), fork(adOptDashboardSagas), fork(subsDashboardSagas), fork(crowdFundingSagas), fork(adBlockSagas), fork(quickShopSagas), fork(setupAdBlockRecoverySagas), fork(prebidSagas), fork(onboardingSagas), fork(networkSettingSagas)];
    if (process.env.NODE_ENV === 'development') {
        allForks.unshift(fork(watchAndLog));
    }
    yield all(allForks);
}
