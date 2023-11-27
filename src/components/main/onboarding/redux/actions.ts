import { CommonAction } from '../../../login/redux/types';
import OnboardingTypes, { AccountManager, publisherData, siteData } from './types';

function fetchOnboardAllSiteList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_SITE_LIST,
        payload: data,
    };
}
function setOnboardAllSiteList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_SITE_LIST,
        payload: data,
    };
}

function fetchOnboardPublisherList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_PUBLISHER_LIST,
        payload: data,
    };
}
function setOnboardPublisherList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_PUBLISHER_LIST,
        payload: data,
    };
}

function fetchOnboardPrebidList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_PREBID_LIST,
        payload: data,
    };
}
function setOnboardPrebidList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_PREBID_LIST,
        payload: data,
    };
}

function fetchOnboardAccountManagerList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_ACCOUNT_MANAGER_LIST,
        payload: data,
    };
}
function setOnboardAccountManagerList(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_ACCOUNT_MANAGER_LIST,
        payload: data,
    };
}

function fetchOnboardRecentTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_RECENT_DATA,
        payload: data,
    };
}
function setOnboardRecentTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_RECENT_DATA,
        payload: data,
    };
}

function fetchOnboardFavoritesTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_FAVORITES_DATA,
        payload: data,
    };
}
function setOnboardFavoritesTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_FAVORITES_DATA,
        payload: data,
    };
}

function fetchOnboardArchivesTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_ARCHIVES_DATA,
        payload: data,
    };
}
function setOnboardArchivesTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_ARCHIVES_DATA,
        payload: data,
    };
}

function fetchOnboardAllSiteTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_ALL_SITE_DATA,
        payload: data,
    };
}
function setOnboardAllSiteTableData(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_ALL_SITE_DATA,
        payload: data,
    };
}

function fetchOnboardGetSiteDetails(siteId: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_SITE_DETAILS,
        payload: { siteId },
    };
}
function setOnboardGetSiteDetails(data?: siteData): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_SITE_DETAILS,
        payload: data,
    };
}

function fetchOnboardGetPublisherDetails(publisherId: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_PUBLISHER_DETAILS,
        payload: { publisherId },
    };
}

function setOnboardGetPublisherDetails(data?: publisherData): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_PUBLISHER_DETAILS,
        payload: data,
    };
}

function setAccountManagerList(list: AccountManager[]): CommonAction {
    return {
        type: OnboardingTypes.SET_ACCOUNT_MANAGER_LIST,
        payload: list,
    };
}

function fetchOnboardGetGeneralTabDetails(siteId: any): CommonAction {
    return {
        type: OnboardingTypes.FETCH_ONBOARD_GENERAL_TAB_DETAILS,
        payload:  {siteId},
    };
}

function setOnboardGetGeneralTabDetails(data?: any): CommonAction {
    return {
        type: OnboardingTypes.SET_ONBOARD_GENERAL_TAB_DETAILS,
        payload: data,
    };
}



const OnboardActions = {
    fetchOnboardAllSiteList,
    setOnboardAllSiteList,
    fetchOnboardPublisherList,
    setOnboardPublisherList,
    fetchOnboardPrebidList,
    setOnboardPrebidList,
    fetchOnboardAccountManagerList,
    setOnboardAccountManagerList,
    fetchOnboardAllSiteTableData,
    setOnboardAllSiteTableData,
    fetchOnboardRecentTableData,
    setOnboardRecentTableData,
    fetchOnboardFavoritesTableData,
    setOnboardFavoritesTableData,
    fetchOnboardArchivesTableData,
    setOnboardArchivesTableData,
    fetchOnboardGetSiteDetails,
    setOnboardGetSiteDetails,
    fetchOnboardGetPublisherDetails,
    setOnboardGetPublisherDetails,
    setAccountManagerList,
    setOnboardGetGeneralTabDetails,
    fetchOnboardGetGeneralTabDetails,
};
export default OnboardActions;
