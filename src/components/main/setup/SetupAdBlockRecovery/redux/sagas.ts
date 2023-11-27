import { call, put, takeLatest } from 'redux-saga/effects';
import Apis from '../../../../../api';
import LoginActions from '../../../../login/redux/actions';
import { CommonAction } from '../../../../login/redux/types';
import SetupAdBlockRecoveryActions from './actions';
import SetupAdBlockRecoveryTypes from './types';

const fetchTextTranslation = function* fetchQuickShopTopCard(action: CommonAction) {
    try {
        const { text, target, source } = action.payload;
        const { data } = yield call(Apis.textTranslate, text, target, source);
        yield put(SetupAdBlockRecoveryActions.setTextTranslation(data || []));
    } catch (err) {
        yield put(SetupAdBlockRecoveryActions.setTextTranslation(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

const fetchAllPresetSetupAdBlock = function* fetchAllPresetSetupAdBlock(action: CommonAction) {
    try {
        const { siteId } = action.payload;
        const { data } = yield call(Apis.fetchSetupAdblockAllPresetsApi, siteId);
        yield put(SetupAdBlockRecoveryActions.setAllPresetSetupAdblock(data?.preset || []));
    } catch (err) {
        yield put(SetupAdBlockRecoveryActions.setAllPresetSetupAdblock([]));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

const fetchPresetSetupAdBlock = function* fetchPresetSetupAdBlock(action: CommonAction) {
    try {
        const { widId } = action.payload;
        const { data } = yield call(Apis.fetchSetupAdBlockPresetByWididApi, widId);
        yield put(SetupAdBlockRecoveryActions.setPresetSetupAdblock(data?.preset[0] || []));
    } catch (err) {
        yield put(SetupAdBlockRecoveryActions.setPresetSetupAdblock(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};

const fetchPresetCompareDataSetupAdblock = function* fetchPresetCompareDataSetupAdblock(action: CommonAction) {
    try {
        const payload  = action.payload;
        const { data } = yield call(Apis.fetchPresetCompareDataApi, payload);
        yield put(SetupAdBlockRecoveryActions.setPresetCompareDataSetupAdblock(data?.preset|| []));
    } catch (err) {
        yield put(SetupAdBlockRecoveryActions.setPresetCompareDataSetupAdblock([]));
        yield put(LoginActions.forbiddenTokenIssue(err || ''));
    }
};
export default function* sagas() {
    yield takeLatest(SetupAdBlockRecoveryTypes.FETCH_TEXT_TRANSLATE, fetchTextTranslation);
    yield takeLatest(SetupAdBlockRecoveryTypes.FETCH_ALLPRESET_SETUP_ADBLOCK, fetchAllPresetSetupAdBlock);
    yield takeLatest(SetupAdBlockRecoveryTypes.FETCH_PRESET_SETUP_ADBLOCK, fetchPresetSetupAdBlock);
    yield takeLatest(SetupAdBlockRecoveryTypes.FETCH_COMPARE_DATA_SETUP_ADBLOCK, fetchPresetCompareDataSetupAdblock);
}
