import { CommonAction } from '../../../../login/redux/types';
import PrebidDashboardTypes, { PrebidDashboardState } from './types';

const prebidDashboardInitialState: PrebidDashboardState = {
    prebidNetworklist: [],
    prebidNetworklistlLoading: false,

    prebidSitelist: [],
    prebidSitelistlLoading: false,

    prebidFailedData: [],
    prebidFailedDatalLoading: false,

    prebidDropDownSite: [],
    prebidDropDownSize: [],
    prebidSiteAndSizeLoader: false,
    prebidFailedTopCardData: undefined,
    prebidFaildDataFlagList: {},
};

const prebidReducer = (state = prebidDashboardInitialState, action: CommonAction): PrebidDashboardState => {
    switch (action.type) {
        case PrebidDashboardTypes.SET_PREBID_NETWORK_LIST:
            return {
                ...state,
                prebidNetworklist: action.payload,
                prebidNetworklistlLoading: false,
            };
        case PrebidDashboardTypes.FETCH_PREBID_NETWORK_LIST:
            return {
                ...state,
                prebidNetworklist: [],
                prebidNetworklistlLoading: true,
            };
        case PrebidDashboardTypes.SET_PREBID_SITE_LIST:
            return {
                ...state,
                prebidSitelist: action.payload,
                prebidSitelistlLoading: false,
            };
        case PrebidDashboardTypes.FETCH_PREBID_SITE_LIST:
            return {
                ...state,
                prebidSitelist: [],
                prebidSitelistlLoading: true,
            };

        case PrebidDashboardTypes.SET_PREBID_FAILED_DATA:
            return {
                ...state,
                prebidFailedData: action.payload,
                prebidFailedDatalLoading: false,
            };
        case PrebidDashboardTypes.FETCH_PREBID_FAILED_DATA:
            return {
                ...state,
                prebidFailedData: [],
                prebidFailedDatalLoading: true,
            };
        case PrebidDashboardTypes.SET_PREBID_FAILED_TOP_CARD_DATA:
            return {
                ...state,
                prebidFailedTopCardData: action.payload,
            };

        case PrebidDashboardTypes.SET_PREBID_FAILED_FLAG_LIST:
            return {
                ...state,
                prebidFaildDataFlagList: action.payload,
            };

        case PrebidDashboardTypes.FETCH_PREBID_SITE_AND_SIZE:
            return {
                ...state,
                prebidFailedDatalLoading: true,
            };

        case PrebidDashboardTypes.SET_PREBID_DROPDOWN_SITE:
            return {
                ...state,
                prebidDropDownSite: action.payload,
                prebidFailedDatalLoading: false,
            };

        case PrebidDashboardTypes.SET_PREBID_DROPDOWN_SIZE:
            return {
                ...state,
                prebidDropDownSize: action.payload,
                prebidFailedDatalLoading: false,
            };

        default:
            return state;
    }
};

export default prebidReducer;
