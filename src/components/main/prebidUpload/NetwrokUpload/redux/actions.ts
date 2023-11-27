import { CommonAction } from '../../../../login/redux/types';
import PrebidDashboardTypes, { PrebidNetworklist, PrebidSitelist, PrebidFailedData } from './types';

function fetchPrebid(): CommonAction {
    return {
        type: PrebidDashboardTypes.FETCH_PREBID_NETWORK_LIST,
        payload: undefined,
    };
}

function setPrebidNetworkList(data?: PrebidNetworklist): CommonAction {
    return {
        type: PrebidDashboardTypes.SET_PREBID_NETWORK_LIST,
        payload: data,
    };
}
function setPrebidSiteList(data?: any): CommonAction {
    return {
        type: PrebidDashboardTypes.SET_PREBID_SITE_LIST,
        payload: data,
    };
}
function fetchPrebidSiteList(data?: PrebidSitelist): CommonAction {
    return {
        type: PrebidDashboardTypes.FETCH_PREBID_SITE_LIST,
        payload: data,
    };
}

function fetchPrebidFailedData(prebidFailedData: PrebidFailedData): CommonAction {
    return {
        type: PrebidDashboardTypes.FETCH_PREBID_FAILED_DATA,
        payload: prebidFailedData,
    };
}

function setPrebidFailedData(data: PrebidFailedData): CommonAction {
    return {
        type: PrebidDashboardTypes.SET_PREBID_FAILED_DATA,
        payload: data,
    };
}

function setPrebidFaildTopCardData(data: any): CommonAction {
    return {
        type: PrebidDashboardTypes.SET_PREBID_FAILED_TOP_CARD_DATA,
        payload: data,
    };
}

function setPrebidFaildDataFlagList(data: any): CommonAction {
    return {
        type: PrebidDashboardTypes.SET_PREBID_FAILED_FLAG_LIST,
        payload: data,
    };
}

function fetchPrebidSiteAndSize(data: { id: string | number }): CommonAction {
    return {
        type: PrebidDashboardTypes.FETCH_PREBID_SITE_AND_SIZE,
        payload: data,
    };
}

function setPrebidDropDownSite(data: any): CommonAction {
    return {
        type: PrebidDashboardTypes.SET_PREBID_DROPDOWN_SITE,
        payload: data,
    };
}

function setPrebidDropDownSize(data: any): CommonAction {
    return {
        type: PrebidDashboardTypes.SET_PREBID_DROPDOWN_SIZE,
        payload: data,
    };
}

const PrebidDashboardAction = {
    setPrebidNetworkList,
    setPrebidSiteList,
    fetchPrebidSiteList,
    fetchPrebid,
    fetchPrebidFailedData,
    setPrebidFailedData,
    setPrebidFaildTopCardData,
    fetchPrebidSiteAndSize,
    setPrebidDropDownSite,
    setPrebidDropDownSize,
    setPrebidFaildDataFlagList,
};

export default PrebidDashboardAction;
