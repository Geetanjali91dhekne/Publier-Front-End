import { call, put, takeLatest } from 'redux-saga/effects';
import Apis from '../../../../../api';
import { CommonAction } from '../../../../login/redux/types';
import SubsDashboardUtils from '../utils';
import SubsDashboardAction from './actions';
import SubsDashboardTypes from './types';
import LoginActions from '../../../../login/redux/actions';

//for subscriptions=============
// subscription dashboard page top cards
const fetchSubscriptionTopCard = function* fetchSubscriptionTopCard(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionTopCardApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionTopCard(data?.topcard || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionTopCard(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard  page widget table
const fetchSubscriptionWidgetOneTable = function* fetchSubscriptionWidgetOneTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionWidgetOneApi, apiPayload);

        yield put(SubsDashboardAction.setSubscriptionWidget1Table(data?.subWidget1Data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionWidget1Table(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard page domain table
const fetchSubscriptionDomainTable = function* fetchSubscriptionDomainTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionDomainTableApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionDomainTable(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionDomainTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard page revenue bar graph
const fetchSubscriptionRevenueGraph = function* fetchSubscriptionRevenueGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionRevenueGraphApi, apiPayload);
        const graphData = SubsDashboardUtils.parseRevenueGraphData(data?.data);
        yield put(SubsDashboardAction.setSubscriptionRevenueGraphTable(graphData || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionRevenueGraphTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard page active subs bar graph
const fetchSubscriptionActiveSubsGraph = function* fetchSubscriptionActiveSubsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionActiveGraphApi, apiPayload);
        const graphData = SubsDashboardUtils.parseActiveSubsGraphData(data?.activeSubData);
        yield put(SubsDashboardAction.setSubscriptionActiveSubsGraph(graphData || []));
    } catch (error) {
        yield put(SubsDashboardAction.setSubscriptionActiveSubsGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard page new subs bar graph
const fetchSubscriptionNewSubsGraph = function* fetchSubscriptionNewSubsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionNewGraphApi, apiPayload);
        const graphData = SubsDashboardUtils.parseActiveSubsGraphData(data?.newSubData);
        yield put(SubsDashboardAction.setSubscriptionNewSubsGraph(graphData || []));
    } catch (error) {
        yield put(SubsDashboardAction.setSubscriptionNewSubsGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard page un subs bar graph
const fetchSubscriptionUnSubsGraph = function* fetchSubscriptionUnSubsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionUnsbscribeGraphApi, apiPayload);
        const graphData = SubsDashboardUtils.parseUnSubsGraphData(data?.unSubData);
        yield put(SubsDashboardAction.setSubscriptionUnSubsGraph(graphData || []));
    } catch (error) {
        yield put(SubsDashboardAction.setSubscriptionUnSubsGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard page rpm bar graph
const fetchSubscriptionRpmGraph = function* fetchSubscriptionRpmGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionRpmGraphApi, apiPayload);
        const graphData = SubsDashboardUtils.parseRpmGraphData(data?.rpmSubData);
        yield put(SubsDashboardAction.setSubscriptionRpmGraph(graphData || []));
    } catch (error) {
        yield put(SubsDashboardAction.setSubscriptionRpmGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// subscription dashboard page domain stats pie chart
const fetchSubscriptionDomainStatsGraph = function* fetchSubscriptionDomainStatsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionDomainStats, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionDomainStats(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionDomainStats(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//subscription dashboard domain stats pie chart
const fetchSubscriptionCountryStatsGraph = function* fetchSubscriptionCountryStatsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionCountryStats, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionCountryStats(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionCountryStats(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchCountryTable = function* fetchCountryTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchCountryTableApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionCountries(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionCountries([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchDeviceTable = function* fetchDeviceTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchDeviceTableApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionDevice(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionDevice([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchPagesTable = function* fetchPagesTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchPageTableApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionPage(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionPage([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchSubscribersTable = function* fetchSubscribersTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriberTableApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionSubscriber(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionSubscriber([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchSubscriptionByCoutry = function* fetchSubscriptionByCoutry(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionByCountryApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionByCountry(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionByCountry(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchSubscriptionByDevice = function* fetchSubscriptionByDevice(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionByDeviceApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionByDevice(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setSubscriptionByDevice(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchReasonForUnSubscription = function* fetchReasonForUnSubscription(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchReasonOfUnSubsApi, apiPayload);
        yield put(SubsDashboardAction.setReasonForUnSubscription(data?.data || []));
    } catch (err) {
        yield put(SubsDashboardAction.setReasonForUnSubscription(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchSubscribersList = function* fetchSubscribersList(action: CommonAction) {
    try {
        const { data } = yield call(Apis.fetchSubscriberListApi);
        yield put(SubsDashboardAction.setSubscriberList(data.subscribersData || []));
    } catch (error) {
        yield put(SubsDashboardAction.setSubscriberList([]));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

//subscription log table
const fetchSubscriptionLogTable = function* fetchSubscriptionLogTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchSubscriptionLogTableApi, apiPayload);
        yield put(SubsDashboardAction.setSubscriptionLogTable(data?.data || []));
    } catch (error) {
        yield put(SubsDashboardAction.setSubscriptionLogTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
export default function* sagas() {
    // for subscriptions
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_TOP_CARD, fetchSubscriptionTopCard);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_WIDGET_ONE_TABLE, fetchSubscriptionWidgetOneTable);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_DOMAIN_TABLE, fetchSubscriptionDomainTable);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_REVENUE_GRAPH, fetchSubscriptionRevenueGraph);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_DOMAIN_STATS, fetchSubscriptionDomainStatsGraph);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_COUNTRY_STATS, fetchSubscriptionCountryStatsGraph);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_ACTIVE_GRAPH, fetchSubscriptionActiveSubsGraph);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_NEW_SUBS_GRAPH, fetchSubscriptionNewSubsGraph);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_UNSUBS_GRAPH, fetchSubscriptionUnSubsGraph);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_RPM_GRAPH, fetchSubscriptionRpmGraph);
    //for tables

    yield takeLatest(SubsDashboardTypes.FETCH_COUNTRY_TABLE, fetchCountryTable);
    yield takeLatest(SubsDashboardTypes.FETCH_DEVICE_TABLE, fetchDeviceTable);
    yield takeLatest(SubsDashboardTypes.FETCH_PAGE_TABLE, fetchPagesTable);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIBER_TABLE, fetchSubscribersTable);

    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_BY_COUNTRY, fetchSubscriptionByCoutry);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_BY_DEVICE, fetchSubscriptionByDevice);
    yield takeLatest(SubsDashboardTypes.FETCH_REASON_FOR_UNSUBSCRIPTION, fetchReasonForUnSubscription);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIBERS_LIST, fetchSubscribersList);
    yield takeLatest(SubsDashboardTypes.FETCH_SUBSCRIPTION_LOG_TABLE, fetchSubscriptionLogTable);
}
