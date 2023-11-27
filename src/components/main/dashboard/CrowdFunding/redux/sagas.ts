import { call, put, takeLatest } from 'redux-saga/effects';
import Apis from '../../../../../api';
import LoginActions from '../../../../login/redux/actions';
import { CommonAction } from '../../../../login/redux/types';
import CrowdFundUtils from '../utils';
import CrowdFundingDashboardActions from './actions';
import CrowdFundingDashboardTypes from './types';

//for crowdfunding=============
// crowdfunding dashboard page top cards
const fetchCrowdFundTopCard = function* fetchCrowdFundTopCard(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunTopCardsApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundTopCard(data?.topcard || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundTopCard(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

// crowdfunding dashboard page widget table
const fetchCrowdFundWidgetTable = function* fetchCrowdFundWidgetTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunWidgetTableApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundWidgetTable(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundWidgetTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfunding dashboard earning graph
const fetchCrowdFundEarningGraph = function* fetchCrowdFundEarningGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunEarningGraphApi, apiPayload);
        const graph = CrowdFundUtils.parseEarningGraphData(data?.crowEarnData);
        yield put(CrowdFundingDashboardActions.setCrowdFundEarningGraph(graph || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundEarningGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard donor graph
const fetchCrowdFundDonorGraph = function* fetchCrowdFundDonorGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunDonorGraphApi, apiPayload);
        const graph = CrowdFundUtils.parseDonorGraphData(data?.crowdonorsData);
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorGraph(graph || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard fundraiser graph
const fetchCrowdFundFundraiserGraph = function* fetchCrowdFundFundraiserGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunFundraiserGraphApi, apiPayload);
        const graph = CrowdFundUtils.parseFundraiserGraphData(data?.fundViews);
        yield put(CrowdFundingDashboardActions.setCrowdFundFundraiserGraph(graph || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundFundraiserGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard earning by country pie chart
const fetchCrowdFundEarningByCountryPieChart = function* fetchCrowdFundEarningByCountryPieChart(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunEarnByCountryPieApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundEarningByCountryPieGraph(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundEarningByCountryPieGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard earning by devices pie chart
const fetchCrowdFundEarningByDevicesPieChart = function* fetchCrowdFundEarningByDevicesPieChart(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunEarnByDevicesPieApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundEarningByDevicesPieGraph(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundEarningByDevicesPieGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard donor by country pie chart
const fetchCrowdFundDonorByCountryPieChart = function* fetchCrowdFundDonorByCountryPieChart(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunDonorByCountryPieApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorByCountryPieGraph(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorByCountryPieGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard donor by devices pie chart
const fetchCrowdFundDonorByDevicesPieChart = function* fetchCrowdFundDonorByDevicesPieChart(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunDonorByDevicesPieApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorByDevicesPieGraph(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorByDevicesPieGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard avg donation graph
const fetchCrowdFundAvgDonationGraph = function* fetchCrowdFundAvgDonationGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunAvgDonationGraphApi, apiPayload);
        const graph = CrowdFundUtils.parseAvgDonationGraphData(data?.data);
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorAvgDonationGraph(graph || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundDonorAvgDonationGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin dashboard ecpm graph
const fetchCrowdFundEcpmGraph = function* fetchCrowdFundEcpmGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunEcpmGraphApi, apiPayload);
        const graph = CrowdFundUtils.parseEcpmGraphData(data?.data);
        yield put(CrowdFundingDashboardActions.setCrowdFundEcpmGraph(graph || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundEcpmGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin domain table
const fetchCrowdFundDomainTable = function* fetchCrowdFundDomainTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunDomainTableApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundDomainTable(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundDomainTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin country table
const fetchCrowdFundCountryTable = function* fetchCrowdFundCountryTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunCountryTableApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundCountryTable(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundCountryTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin device table
const fetchCrowdFundDeviceTable = function* fetchCrowdFundDeviceTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunDeviceTableApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundDeviceTable(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundDeviceTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//crowdfungin pages table
const fetchCrowdFundPagesTable = function* fetchCrowdFundPagesTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCrowdFunPagesTableApi, apiPayload);
        yield put(CrowdFundingDashboardActions.setCrowdFundPagesTable(data?.data || []));
    } catch (err) {
        yield put(CrowdFundingDashboardActions.setCrowdFundPagesTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};
export default function* sagas() {
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_TOP_CARD, fetchCrowdFundTopCard);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_WIDGET_TABLE, fetchCrowdFundWidgetTable);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARNING_GRAPH, fetchCrowdFundEarningGraph);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_GRAPH, fetchCrowdFundDonorGraph);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_FUNDRAISER_GRAPH, fetchCrowdFundFundraiserGraph);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH, fetchCrowdFundEarningByCountryPieChart);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH, fetchCrowdFundEarningByDevicesPieChart);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH, fetchCrowdFundDonorByCountryPieChart);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH, fetchCrowdFundDonorByDevicesPieChart);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_AVG_DONATION_GRAPH, fetchCrowdFundAvgDonationGraph);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_ECPM_GRAPH, fetchCrowdFundEcpmGraph);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_DOMAIN_TABLE, fetchCrowdFundDomainTable);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_COUNTRY_TABLE, fetchCrowdFundCountryTable);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_DEVICE_TABLE, fetchCrowdFundDeviceTable);
    yield takeLatest(CrowdFundingDashboardTypes.FETCH_CROWDFUND_PAGES_TABLE, fetchCrowdFundPagesTable);
}
