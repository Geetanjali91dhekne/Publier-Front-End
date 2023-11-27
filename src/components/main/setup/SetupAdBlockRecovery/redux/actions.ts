import { CommonAction } from '../../../../login/redux/types';
import SetupAdBlockRecoveryTypes, { CreatePreset, Preset } from './types';

function fetchTextTranslation(text: any, target: any, source: any): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.FETCH_TEXT_TRANSLATE,
        payload: { text, target, source },
    };
}
function setTextTranslation(data?: any): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.SET_TEXT_TRANSLATE,
        payload: data,
    };
}

function fetchAllPresetSetupAdblock(siteId: string): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.FETCH_ALLPRESET_SETUP_ADBLOCK,
        payload: { siteId },
    };
}
function setAllPresetSetupAdblock(data: Preset[]): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.SET_ALLPRESET_SETUP_ADBLOCK,
        payload: data,
    };
}

function fetchPresetSetupAdblock(widId: string): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.FETCH_PRESET_SETUP_ADBLOCK,
        payload: { widId },
    };
}
function setPresetSetupAdblock(data?: CreatePreset): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.SET_PRESET_SETUP_ADBLOCK,
        payload: data,
    };
}


function fetchPresetCompareDataSetupAdblock(data?: { start_date: string, end_date: string, widget_ids: string[], site_id?: string }): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.FETCH_COMPARE_DATA_SETUP_ADBLOCK,
        payload: data,
    };
}
function setPresetCompareDataSetupAdblock(data?: CreatePreset[]): CommonAction {
    return {
        type: SetupAdBlockRecoveryTypes.SET_COMPARE_DATA_SETUP_ADBLOCK,
        payload: data,
    };
}
const SetupAdBlockRecoveryActions = {
    fetchTextTranslation,
    setTextTranslation,

    fetchAllPresetSetupAdblock,
    setAllPresetSetupAdblock,

    fetchPresetSetupAdblock,
    setPresetSetupAdblock,

    fetchPresetCompareDataSetupAdblock,
    setPresetCompareDataSetupAdblock,
};
export default SetupAdBlockRecoveryActions;
