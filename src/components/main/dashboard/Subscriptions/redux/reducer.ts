import { CommonAction } from '../../../../login/redux/types';
import SubsDashboardTypes, { SubsDashboardState } from './types';
const SubsDashboardInitialState: SubsDashboardState = {
    subscriptionRevenueGraph: [],
    subscriptionRevenueGraphLoader: false,
    subscriptionActiveSubsGraph: [],
    subscriptionActiveSubsGraphLoader: false,
    subscriptionNewSubsGraph: [],
    subscriptionNewSubsGraphLoader: false,
    subscriptionUnSubsGraph: [],
    subscriptionUnSubsGraphLoader: false,
    subscriptionRpmGraph: [],
    subscriptionRpmGraphLoader: false,
    subscribersList: [],
};

const subsDashboardReducer = (state = SubsDashboardInitialState, action: CommonAction): SubsDashboardState => {
    switch (action.type) {
        // for subscriptions
        case SubsDashboardTypes.FETCH_SUBSCRIPTION_TOP_CARD:
            return {
                ...state,
                subscritptionTopCardLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_TOP_CARD:
            return {
                ...state,
                subscritptionTopCard: action.payload,
                subscritptionTopCardLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_WIDGET_ONE_TABLE:
            return {
                ...state,
                subscriptionWidgetTableOneLoader: true,
                subscriptionWidgetTableOne: [],
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_WIDGET_ONE_TABLE:
            return {
                ...state,
                subscriptionWidgetTableOne: action.payload,
                subscriptionWidgetTableOneLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_DOMAIN_TABLE:
            return {
                ...state,
                subscriptionDomainTableLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_DOMAIN_TABLE:
            return {
                ...state,
                subscriptionDomainTable: action.payload,
                subscriptionDomainTableLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_REVENUE_GRAPH:
            return {
                ...state,
                subscriptionRevenueGraphLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_REVENUE_GRAPH:
            return {
                ...state,
                subscriptionRevenueGraph: action.payload,
                subscriptionRevenueGraphLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_DOMAIN_STATS:
            return {
                ...state,
                subscriptionDomainStatsLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_DOMAIN_STATS:
            return {
                ...state,
                subscriptionDomainStatsGraph: action.payload,
                subscriptionDomainStatsLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_COUNTRY_STATS:
            return {
                ...state,
                subscriptionCountryStatsLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_COUNTRY_STATS:
            return {
                ...state,
                subscriptionCountryStatsGraph: action.payload,
                subscriptionCountryStatsLoader: false,
            };
        case SubsDashboardTypes.FETCH_COUNTRY_TABLE:
            return {
                ...state,
                countryTableLoader: true,
            };

        case SubsDashboardTypes.SET_COUNTRY_TABLE:
            return {
                ...state,
                countryTable: action.payload,
                countryTableLoader: false,
            };
        case SubsDashboardTypes.FETCH_DEVICE_TABLE:
            return {
                ...state,
                deviceTableLoader: true,
            };

        case SubsDashboardTypes.SET_DEVICE_TABLE:
            return {
                ...state,
                deviceTable: action.payload,
                deviceTableLoader: false,
            };
        case SubsDashboardTypes.FETCH_PAGE_TABLE:
            return {
                ...state,
                pageTableLoader: true,
            };

        case SubsDashboardTypes.SET_PAGE_TABLE:
            return {
                ...state,
                pageTable: action.payload,
                pageTableLoader: false,
            };
        case SubsDashboardTypes.FETCH_SUBSCRIBER_TABLE:
            return {
                ...state,
                subscriberTableLoader: true,
                subscriberTable: [],
            };

        case SubsDashboardTypes.SET_SUBSCRIBER_TABLE:
            return {
                ...state,
                subscriberTable: action.payload,
                subscriberTableLoader: false,
            };
        case SubsDashboardTypes.FETCH_SUBSCRIPTION_ACTIVE_GRAPH:
            return {
                ...state,
                subscriptionActiveSubsGraphLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_ACTIVE_GRAPH:
            return {
                ...state,
                subscriptionActiveSubsGraph: action.payload,
                subscriptionActiveSubsGraphLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_NEW_SUBS_GRAPH:
            return {
                ...state,
                subscriptionNewSubsGraphLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_NEW_SUBS_GRAPH:
            return {
                ...state,
                subscriptionNewSubsGraph: action.payload,
                subscriptionNewSubsGraphLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_UNSUBS_GRAPH:
            return {
                ...state,
                subscriptionUnSubsGraphLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_UNSUBS_GRAPH:
            return {
                ...state,
                subscriptionUnSubsGraph: action.payload,
                subscriptionUnSubsGraphLoader: false,
            };
        case SubsDashboardTypes.FETCH_SUBSCRIPTION_RPM_GRAPH:
            return {
                ...state,
                subscriptionRpmGraphLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_RPM_GRAPH:
            return {
                ...state,
                subscriptionRpmGraph: action.payload,
                subscriptionRpmGraphLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_BY_COUNTRY:
            return {
                ...state,
                subscriptionByCountryGraphLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_BY_COUNTRY:
            return {
                ...state,
                subscriptionByCountryGraph: action.payload,
                subscriptionByCountryGraphLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIPTION_BY_DEVICE:
            return {
                ...state,
                subscriptionByDeviceGraphLoader: true,
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_BY_DEVICE:
            return {
                ...state,
                subscriptionByDeviceGraph: action.payload,
                subscriptionByDeviceGraphLoader: false,
            };

        case SubsDashboardTypes.FETCH_REASON_FOR_UNSUBSCRIPTION:
            return {
                ...state,
                reasonForUnsubscriptionLoader: true,
                reasonForUnsubscriptionData: [],
            };

        case SubsDashboardTypes.SET_REASON_FOR_UNSUBSCRIPTION:
            return {
                ...state,
                reasonForUnsubscriptionData: action.payload,
                reasonForUnsubscriptionLoader: false,
            };

        case SubsDashboardTypes.FETCH_SUBSCRIBERS_LIST:
            return {
                ...state,
                subscribersListLoader: true,
                subscribersList: [],
            };

        case SubsDashboardTypes.SET_SUBSCRIBERS_LIST:
            return {
                ...state,
                subscribersList: action.payload,
                subscribersListLoader: false,
            };
        case SubsDashboardTypes.FETCH_SUBSCRIPTION_LOG_TABLE:
            return {
                ...state,
                subscriptionLogTableLoader: true,
                subscriptionLogTable: [],
            };

        case SubsDashboardTypes.SET_SUBSCRIPTION_LOG_TABLE:
            return {
                ...state,
                subscriptionLogTable: action.payload,
                subscriptionLogTableLoader: false,
            };
        default:
            return state;
    }
};
export default subsDashboardReducer;
