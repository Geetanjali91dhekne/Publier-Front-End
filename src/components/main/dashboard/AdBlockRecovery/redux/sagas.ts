import { call, put, takeLatest } from 'redux-saga/effects';
import Apis from '../../../../../api';
import { CommonAction } from '../../../../login/redux/types';
import AdBlockDashboardActions from './actions';
import AdBlockDashboardTypes from './types';
import AdBlockRecoveryUtils from '../utils';
import LoginActions from '../../../../login/redux/actions';
//ad block recovery top cards
const fetchAdBlockTopCard = function* fetchAdBlockTopCard(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockTopCardsApi, apiPayload);
        yield put(AdBlockDashboardActions.setAdBlockTopCard(data?.topcard || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockTopCard(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//ad block recovery pvs graph
const fetchAdBlockPvsGraph = function* fetchAdBlockPvsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockPvsGraphApi, apiPayload);
        const graph = AdBlockRecoveryUtils.parsePvsGraphData(data?.adblockPvsData);
        yield put(AdBlockDashboardActions.setAdBlockPvsGraph(graph || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockPvsGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//ad block recovery percentage user graph
const fetchAdBlockPerUserGraph = function* fetchAdBlockPerUserGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockPerUserGraphApi, apiPayload);
        const graph = AdBlockRecoveryUtils.parsePerUserGraphData(data?.adblockusersData);
        yield put(AdBlockDashboardActions.setAdBlockPerUserGraph(graph || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockPerUserGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//ad block recovery pvs graph
const fetchAdBlockWidgetTable = function* fetchAdBlockWidgetTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockWidgetTableApi, apiPayload);
        yield put(AdBlockDashboardActions.setAdBlockWidgetTable(data?.data || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockWidgetTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//ad block country
const fetchAdBlockCountryTable = function* fetchAdBlockCountryTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockCountryTableApi, apiPayload);
        yield put(AdBlockDashboardActions.setAdBlockCountryTable(data?.data || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockCountryTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//ad device table
const fetchAdBlockDeviceTable = function* fetchAdBlockDeviceTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockDeviceTableApi, apiPayload);
        yield put(AdBlockDashboardActions.setAdBlockDeviceTable(data?.data || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockDeviceTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//ad domain table
const fetchAdBlockDomainTable = function* fetchAdBlockDomainTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockDomainTableApi, apiPayload);
        yield put(AdBlockDashboardActions.setAdBlockDomainTable(data?.data || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockDomainTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//ad domain table
const fetchAdBlockBrowser = function* fetchAdBlockBrowser(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchAdBlockBrowserApi, apiPayload);
        yield put(AdBlockDashboardActions.setAdBlockBrowser(data?.data || []));
    } catch (err) {
        yield put(AdBlockDashboardActions.setAdBlockBrowser(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//adblock list
const fetchAdBlockList = function* fetchAdBlockList(action: CommonAction) {
    try {
        const { data } = yield call(Apis.fetchAdBlockSiteList);
        yield put(AdBlockDashboardActions.setAdBlockList(data?.data || []));
    } catch (error) {
        yield put(AdBlockDashboardActions.setAdBlockList([]));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
export default function* sagas() {
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_TOP_CARD, fetchAdBlockTopCard);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_PVS_GRAPH, fetchAdBlockPvsGraph);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_WIDGET_TABLE, fetchAdBlockWidgetTable);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_PERUSER_GRAPH, fetchAdBlockPerUserGraph);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_COUNTRY_TABLE, fetchAdBlockCountryTable);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_DEVICE_TABLE, fetchAdBlockDeviceTable);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_DOMAIN_TABLE, fetchAdBlockDomainTable);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_BROWSER, fetchAdBlockBrowser);
    yield takeLatest(AdBlockDashboardTypes.FETCH_ADBLOCK_LIST, fetchAdBlockList);
}
