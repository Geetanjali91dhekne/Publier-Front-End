import { call, put, takeLatest } from 'redux-saga/effects';
// import { CommonAction } from '../../../login/redux/types';
import Apis from '../../../../api';
import OnboardActions from './actions';
import LoginActions from '../../../login/redux/actions';
import OnboardingTypes from './types';
import onboardingUtils from '../utils';
import { CommonAction } from '../../../login/redux/types';

//onboarding all sites list
const fetchOnboardAllSitesList = function* fetchOnboardAllSitesList() {
    try {
        const { data } = yield call(Apis.fetchallSiteListOnboardApi);
        const newData = onboardingUtils?.parsefilterData(data?.data, 'site');
        yield put(OnboardActions.setOnboardAllSiteList(newData || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardAllSiteList([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding publisher list
const fetchOnboardPublisherList = function* fetchOnboardPublisherList() {
    try {
        const { data } = yield call(Apis.fetchpublisherListOnboardApi);
        const newData = onboardingUtils?.parsefilterData(data?.data, 'publisher');
        yield put(OnboardActions.setOnboardPublisherList(newData || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardPublisherList([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding prebid list
const fetchOnboardPrebidList = function* fetchOnboardPrebidList() {
    try {
        const { data } = yield call(Apis.fetchprebidListOnboardApi);
        const newData = onboardingUtils?.parsefilterData(data?.data, 'version');
        yield put(OnboardActions.setOnboardPrebidList(newData || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardPrebidList([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding account manager list
const fetchOnboardAccountManagerList = function* fetchOnboardAccountManagerList() {
    try {
        const { data } = yield call(Apis.fetchaccountManagerListOnboardApi);
        const newData = onboardingUtils?.parsefilterData(data?.data, 'account_manager');
        yield put(OnboardActions.setAccountManagerList(data?.data || []));
        yield put(OnboardActions.setOnboardAccountManagerList(newData || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardAccountManagerList([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding All Site Data
const fetchOnboardAllSiteTableData = function* fetchOnboardAllSiteTableData(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchallSiteDetailesOnboardApi, payload);
        yield put(OnboardActions.setOnboardAllSiteTableData(data.sites || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardAllSiteTableData([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding Recent Data
const fetchOnboardRecentTableData = function* fetchOnboardRecentTableData(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchallRecentOnboardApi, payload);
        yield put(OnboardActions.setOnboardRecentTableData(data.recent || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardRecentTableData([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding Favorites Data
const fetchOnboardFavoritesTableData = function* fetchOnboardFavoritesTableData(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchallfavoritesOnboardApi, payload);
        yield put(OnboardActions.setOnboardFavoritesTableData(data.favorites || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardFavoritesTableData([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding Archive Data
const fetchOnboardArchievsTableData = function* fetchOnboardArchiveTableData(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchallArchivesitesOnboardApi, payload);
        yield put(OnboardActions.setOnboardArchivesTableData(data.archive || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardArchivesTableData([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//onboarding get Site Data
const fetchSiteDetailsData = function* fetchSiteDetailsData(action: CommonAction) {
    try {
        const { siteId } = action.payload;
        const { data } = yield call(Apis.fetchgetSiteDetailsOnboardApi, siteId);
        yield put(OnboardActions.setOnboardGetSiteDetails(data?.data || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardGetSiteDetails(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//onboarding get Publisher Data
const fetchPublisherDetailsData = function* fetchPublisherDetailsData(action: CommonAction) {
    try {
        const { publisherId } = action.payload;
        const { data } = yield call(Apis.fetchgetPublisherDetailsOnboardApi, publisherId);
        yield put(OnboardActions.setOnboardGetPublisherDetails(data.data || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardGetPublisherDetails(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//onboarding get general tab Data
const fetchGeneralTabData = function* fetchGeneralTabData(action: CommonAction) {
    try {
        const { siteId } = action.payload;
        const { data } = yield call(Apis.fetchgetGeneralTabDetailsOnboardApi, siteId);
        yield put(OnboardActions.setOnboardGetGeneralTabDetails(data || []));
    } catch (err) {
        yield put(OnboardActions.setOnboardGetGeneralTabDetails(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

export default function* sagas() {
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_SITE_LIST, fetchOnboardAllSitesList);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_PUBLISHER_LIST, fetchOnboardPublisherList);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_PREBID_LIST, fetchOnboardPrebidList);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_ACCOUNT_MANAGER_LIST, fetchOnboardAccountManagerList);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_ALL_SITE_DATA, fetchOnboardAllSiteTableData);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_RECENT_DATA, fetchOnboardRecentTableData);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_FAVORITES_DATA, fetchOnboardFavoritesTableData);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_ARCHIVES_DATA, fetchOnboardArchievsTableData);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_SITE_DETAILS, fetchSiteDetailsData);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_PUBLISHER_DETAILS, fetchPublisherDetailsData);
    yield takeLatest(OnboardingTypes.FETCH_ONBOARD_GENERAL_TAB_DETAILS, fetchGeneralTabData);
}
