import { call, put, takeLatest } from 'redux-saga/effects';
import PrebidDashboardAction from './actions';
import PrebidDashboardTypes from './types';
import { CommonAction } from '../../../../login/redux/types';
import LoginActions from '../../../../login/redux/actions';
import Apis from '../../../../../api';
import prebidUploadUtils from '../utils';

/** Fetch  prebid*/
const fetchprebidNetworklReq = function* fetchprebidNetworklReq(action: CommonAction) {
    try {
        const { data } = yield call(Apis.fetchPrebidAllNetwork);
        yield put(PrebidDashboardAction.setPrebidNetworkList(data?.networks || []));
    } catch (err) {
        yield put(PrebidDashboardAction.setPrebidNetworkList());
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchFailedData = function* fetchFailedData(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchPrebidFailedData, payload);
        const combinedData = data?.failed_data.concat(data?.uploaded_data);
        const topCardData = {
            clicks: data?.total_clicks ,
            impressions: data?.total_impressions ,
            revenue: data?.total_revenue ,
        }
        const flagListData =data?.sites_sizes_status;

        yield put(PrebidDashboardAction.setPrebidFailedData(combinedData || []));
        yield put(PrebidDashboardAction.setPrebidFaildTopCardData(topCardData || undefined));
        yield put(PrebidDashboardAction.setPrebidFaildDataFlagList(flagListData || {}));
        
    } catch (err) {
        yield put(PrebidDashboardAction.setPrebidFailedData({}));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchSiteAndSize = function* fetchSiteAndSize(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchPrebidSiteAndSize, payload);
        const formatedData = prebidUploadUtils?.parsePrebidSitesAndSizes(data || []);
        yield put(PrebidDashboardAction.setPrebidDropDownSite(formatedData?.sites || []));
        yield put(PrebidDashboardAction.setPrebidDropDownSize(formatedData?.sizes || []));
    } catch (err) {
        yield put(PrebidDashboardAction.setPrebidDropDownSite([]));
        yield put(PrebidDashboardAction.setPrebidDropDownSize([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

export default function* sagas() {
    yield takeLatest(PrebidDashboardTypes.FETCH_PREBID_FAILED_DATA, fetchFailedData);
    yield takeLatest(PrebidDashboardTypes.FETCH_PREBID_NETWORK_LIST, fetchprebidNetworklReq);
    yield takeLatest(PrebidDashboardTypes.FETCH_PREBID_SITE_AND_SIZE, fetchSiteAndSize);
}