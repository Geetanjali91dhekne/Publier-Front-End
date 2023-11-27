import { CommonAction } from '../../../../login/redux/types';
import SetupAdBlockRecoveryTypes, { SetupAdblockRecoveryStates } from './types';

const SetupAdBlockRecoveryInitialState: SetupAdblockRecoveryStates = {
    translatedText: undefined,
    translatedTextLoader: false,
    allPresets: [],
    allPresetsLoader: false,
    presetByWidId: undefined,
    presetByWidIdLoader: false,
    comparisonPresetData: [],
    comparisonPresetDataLoader: false
};

const setupAdBlockRecoveryReducer = (state = SetupAdBlockRecoveryInitialState, action: CommonAction): SetupAdblockRecoveryStates => {
    switch (action.type) {
        case SetupAdBlockRecoveryTypes.FETCH_TEXT_TRANSLATE:
            return {
                ...state,
                translatedTextLoader: true,
            };

        case SetupAdBlockRecoveryTypes.SET_TEXT_TRANSLATE:
            return {
                ...state,
                translatedText: action.payload,
                translatedTextLoader: false,
            };

        case SetupAdBlockRecoveryTypes.FETCH_ALLPRESET_SETUP_ADBLOCK:
            return {
                ...state,
                allPresets: [],
                allPresetsLoader: true,
            };

        case SetupAdBlockRecoveryTypes.SET_ALLPRESET_SETUP_ADBLOCK:
            return {
                ...state,
                allPresets: action.payload,
                allPresetsLoader: false,
            };

        case SetupAdBlockRecoveryTypes.FETCH_PRESET_SETUP_ADBLOCK:
            return {
                ...state,
                presetByWidIdLoader: true,
                presetByWidId: [],
            };

        case SetupAdBlockRecoveryTypes.SET_PRESET_SETUP_ADBLOCK:
            return {
                ...state,
                presetByWidId: action.payload,
                presetByWidIdLoader: false,
            };

            case SetupAdBlockRecoveryTypes.FETCH_COMPARE_DATA_SETUP_ADBLOCK:
            return {
                ...state,
                comparisonPresetDataLoader: true,
                comparisonPresetData: [],
            };

        case SetupAdBlockRecoveryTypes.SET_COMPARE_DATA_SETUP_ADBLOCK:
            return {
                ...state,
                comparisonPresetData: action.payload,
                comparisonPresetDataLoader: false,
            };
        default:
            return state;
    }
};

export default setupAdBlockRecoveryReducer;
