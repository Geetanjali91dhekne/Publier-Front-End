import { call, put, takeLatest } from 'redux-saga/effects';
import { CommonAction } from '../../../../login/redux/types';
import LoginActions from '../../../../login/redux/actions';
import Apis from '../../../../../api';
import NetworkSettingAction from './actions';
import NetwrokSettingTypes from './types';
import networkSettingUtils from '../utils';


const fetchNetworkSettingAllNetwork = function* fetchNetworkSettingAllNetwork(action: CommonAction) {
     try {
          const { data } = yield call(Apis.fetchNetworkSettingAllNetwork);
          yield put(NetworkSettingAction.setNetworkSettingNetworkList(data?.networks || []));
     } catch (err) {
          yield put(NetworkSettingAction.setNetworkSettingNetworkList());
          yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
     }
};

const fetchNetworkSettingAllSites = function* fetchNetworkSettingAllSites(action: CommonAction) {
     try {
          const { data } = yield call(Apis.fetchNetworkSettingAllSites);
          const newData = networkSettingUtils?.parseNetworkSettingGetData(data?.all_sites,'site');
          yield put(NetworkSettingAction.setNetworkSettingSites(newData || []));
     } catch (err) {
          yield put(NetworkSettingAction.setNetworkSettingSites([]));
          yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
     }
};

const fetchNetworkSettingAllSizes = function* fetchNetworkSettingAllSizes(action: CommonAction) {
     try {
          const { data } = yield call(Apis.fetchNetworkSettingAllSizes);
          const newData = networkSettingUtils?.parseNetworkSettingGetData(data?.all_sizes,'size');
          yield put(NetworkSettingAction.setNetworkSettingSizes(newData || []));
     } catch (err) {
          yield put(NetworkSettingAction.setNetworkSettingSizes([]));
          yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
     }
};

const fetchNetworkSettingSiteSizeTable = function* fetchNetworkSettingSiteSizeTable(action: CommonAction) {
     try {
          const payload = action.payload;
          const { data } = yield call(Apis.fetchNetworkSettingSitesAndSizeTable, payload);
          yield put(NetworkSettingAction.setNetworkSettingSiteSizeTable(data || []));
     } catch (err) {
          yield put(NetworkSettingAction.setNetworkSettingSiteSizeTable({}));
          yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
     }
};



export default function* sagas() {
     yield takeLatest(NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_NETWORK_LIST, fetchNetworkSettingAllNetwork);
     yield takeLatest(NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_SITES, fetchNetworkSettingAllSites);
     yield takeLatest(NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_SIZES, fetchNetworkSettingAllSizes);
     yield takeLatest(NetwrokSettingTypes.FETCH_NETWORK_SETTING_SITES_SIZE_TABLE, fetchNetworkSettingSiteSizeTable);
}
