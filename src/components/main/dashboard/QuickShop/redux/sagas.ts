import { call, put, takeLatest } from 'redux-saga/effects';
import Apis from '../../../../../api';
import LoginActions from '../../../../login/redux/actions';
import { CommonAction } from '../../../../login/redux/types';
import QuickShopUtils from '../utils';
import QuickShopDashboardActions from './actions';
import QuickShopDashboardTypes from './types';

// quickshop dashboard page top cards
const fetchQuickShopTopCard = function* fetchQuickShopTopCard(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopTopCardsApi, apiPayload);
        yield put(QuickShopDashboardActions.setQuickShopTopCard(data?.topcard || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopTopCard(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//quickshop dashboard earning graph
const fetchQuickShopEarningGraph = function* fetchQuickShopEarningGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopEarningGraphApi, apiPayload);
        const graph = QuickShopUtils.parseQuickShopEarningGraphData(data?.quickEarnData);
        yield put(QuickShopDashboardActions.setQuickShopEarningGrpah(graph || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopEarningGrpah(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//quickshop dashboard items graph
const fetchQuickShopItemsGraph = function* fetchQuickShopItemsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopItemsGraphApi, apiPayload);
        const graph = QuickShopUtils.parseQuickShopItemsSoldGraphData(data?.quickItemsData);
        yield put(QuickShopDashboardActions.setQuickShopItemsGrpah(graph || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopItemsGrpah(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//quickshop dashboard topitem table
const fetchQuickShopTopItemsTable = function* fetchQuickShopTopItemsTable(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopTopItemsTableApi, apiPayload);
        yield put(QuickShopDashboardActions.setQuickShopTopItemsTable(data?.quickTopItemsData || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopTopItemsTable(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//quickshop dashboard country graph
const fetchQuickShopCountryGraph = function* fetchQuickShopCountryGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopCountryGraphApi, apiPayload);
        yield put(QuickShopDashboardActions.setQuickShopCountryGraph(data?.quickCountriesGraph || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopCountryGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//quickshop dashboard purchase graph
const fetchQuickShopPurchaseGraph = function* fetchQuickShopPurchaseGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopPurchaseGraphApi, apiPayload);
        const graph = QuickShopUtils.parseQuickShopPurchaseGraphData(data?.quickPurchase);
        yield put(QuickShopDashboardActions.setQuickShopPurchaseGraph(graph || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopPurchaseGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//quickshop dashboard product pvs graph
const fetchQuickShopProductPvsGraph = function* fetchQuickShopProductPvsGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopProductPvsGraphApi, apiPayload);
        const graph = QuickShopUtils.parseQuickShopProductPvsGraphData(data?.quickProduct);
        yield put(QuickShopDashboardActions.setQuickShopProductPvsGraph(graph || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopProductPvsGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

//quickshop dashboard product pvs graph
const fetchQuickShopConversionRatioGraph = function* fetchQuickShopConversionRatioGraph(action: CommonAction) {
    try {
        const apiPayload = action.payload;
        const { data } = yield call(Apis.fetchQuickShopConversionRatioApi, apiPayload);
        const graph = QuickShopUtils.parseQuickShopConversionRatioGraphData(data?.quickConverstion);
        yield put(QuickShopDashboardActions.setQuickShopConversionRatioGraph(graph || []));
    } catch (err) {
        yield put(QuickShopDashboardActions.setQuickShopConversionRatioGraph(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

export default function* sagas() {
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_TOP_CARDS, fetchQuickShopTopCard);
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_EARNING_GRAPH, fetchQuickShopEarningGraph);
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_ITEM_GRAPH, fetchQuickShopItemsGraph);
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_TOP_ITEM_TABLE, fetchQuickShopTopItemsTable);
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_COUNTRY_GRAPH, fetchQuickShopCountryGraph);
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_PURCHASE_GRAPH, fetchQuickShopPurchaseGraph);
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_PRODUCT_PVS_GRAPH, fetchQuickShopProductPvsGraph);
    yield takeLatest(QuickShopDashboardTypes.FETCH_QUICKSHOP_CONVERSION_RATIO_GRAPH, fetchQuickShopConversionRatioGraph);
}
