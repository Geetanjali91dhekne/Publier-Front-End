import { CommonAction } from '../../../login/redux/types';
import OnboardingTypes, { OnboardingStates } from './types';
const OnboardingInitialState: OnboardingStates = {
    onboardSiteList: [],
    onboardSiteListLoader: false,
    onboardPublisherList: [],
    onboardPublisherListLoader: false,
    onboardPrebidList: [],
    onboardPrebidListLoader: false,
    onboardAccountManagerList: [],
    onboardAccountManagerListLoader: false,
    onboardingAllSiteTable: undefined,
    onboardingAllSiteTableLoader: false,
    onboardingRecentTable: undefined,
    onboardingRecentTableLoader: false,
    onboardingFavoritesTable: undefined,
    onboardingFavoritesTableLoader: false,
    onboardingArchiveTable: undefined,
    onboardingArchiveTableLoader: false,
    onboardingGetSiteDetails: undefined,
    onboardingGetSiteDetailsLoader: false,
    onboardingPublisherDetails: undefined,
    onboardingPublisherDetailsLoader: false,
    onboardingGeneralTabDetails: undefined,
    onboardingGeneralTabDetailsLoader: false,
    accountManagerList: [],
};

const onBoardingReducer = (state = OnboardingInitialState, action: CommonAction): OnboardingStates => {
    switch (action.type) {
        case OnboardingTypes.FETCH_ONBOARD_SITE_LIST:
            return {
                ...state,
                onboardSiteListLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_SITE_LIST:
            return {
                ...state,
                onboardSiteList: action.payload,
                onboardSiteListLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_PUBLISHER_LIST:
            return {
                ...state,
                onboardPublisherListLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_PUBLISHER_LIST:
            return {
                ...state,
                onboardPublisherList: action.payload,
                onboardPublisherListLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_PREBID_LIST:
            return {
                ...state,
                onboardPrebidListLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_PREBID_LIST:
            return {
                ...state,
                onboardPrebidList: action.payload,
                onboardPrebidListLoader: false,
            };
        case OnboardingTypes.FETCH_ONBOARD_ACCOUNT_MANAGER_LIST:
            return {
                ...state,
                onboardAccountManagerListLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_ACCOUNT_MANAGER_LIST:
            return {
                ...state,
                onboardAccountManagerList: action.payload,
                onboardAccountManagerListLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_ALL_SITE_DATA:
            return {
                ...state,
                onboardingAllSiteTable: [],
                onboardingAllSiteTableLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_ALL_SITE_DATA:
            return {
                ...state,
                onboardingAllSiteTable: action.payload,
                onboardingAllSiteTableLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_RECENT_DATA:
            return {
                ...state,
                onboardingRecentTable: [],
                onboardingRecentTableLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_RECENT_DATA:
            return {
                ...state,
                onboardingRecentTable: action.payload,
                onboardingRecentTableLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_FAVORITES_DATA:
            return {
                ...state,
                onboardingFavoritesTable: [],
                onboardingFavoritesTableLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_FAVORITES_DATA:
            return {
                ...state,
                onboardingFavoritesTable: action.payload,
                onboardingFavoritesTableLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_ARCHIVES_DATA:
            return {
                ...state,
                onboardingArchiveTable: [],
                onboardingArchiveTableLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_ARCHIVES_DATA:
            return {
                ...state,
                onboardingArchiveTable: action.payload,
                onboardingArchiveTableLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_SITE_DETAILS:
            return {
                ...state,
                onboardingGetSiteDetails: undefined,
                onboardingGetSiteDetailsLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_SITE_DETAILS:
            return {
                ...state,
                onboardingGetSiteDetails: action.payload,
                onboardingGetSiteDetailsLoader: false,
            };

        case OnboardingTypes.FETCH_ONBOARD_PUBLISHER_DETAILS:
            return {
                ...state,
                onboardingPublisherDetails: [],
                onboardingPublisherDetailsLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_PUBLISHER_DETAILS:
            return {
                ...state,
                onboardingPublisherDetails: action.payload,
                onboardingPublisherDetailsLoader: false,
            };
        case OnboardingTypes.SET_ACCOUNT_MANAGER_LIST:
            return {
                ...state,
                accountManagerList: action.payload,
            };
        case OnboardingTypes.FETCH_ONBOARD_GENERAL_TAB_DETAILS:
            return {
                ...state,
                onboardingGeneralTabDetailsLoader: true,
            };
        case OnboardingTypes.SET_ONBOARD_GENERAL_TAB_DETAILS:
            return {
                ...state,
                onboardingGeneralTabDetails: action.payload,
                onboardingGeneralTabDetailsLoader: false,
            };

        default:
            return state;
    }
};

export default onBoardingReducer;
