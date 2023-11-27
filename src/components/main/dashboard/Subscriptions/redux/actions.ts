import { CommonAction } from '../../../../login/redux/types';
import SubsDashboardTypes, { GraphData, CPMOrRevenueOrRequestGraphBySite, Subscription, CountryDomainStatsPieChart } from './types';

// FOR SUBSCRIPTION TABLE
// subscription page top cards
function fetchSubscriptionTopCard(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_TOP_CARD,
        payload: data,
    };
}
function setSubscriptionTopCard(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_TOP_CARD,
        payload: data,
    };
}

// subscription page widget talbe
function fetchSubscriptionWidget1Table(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_WIDGET_ONE_TABLE,
        payload: data,
    };
}
function setSubscriptionWidget1Table(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_WIDGET_ONE_TABLE,
        payload: data,
    };
}

// subscription page domain table
function fetchSubscriptionDomainTable(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_DOMAIN_TABLE,
        payload: data,
    };
}
function setSubscriptionDomainTable(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_DOMAIN_TABLE,
        payload: data,
    };
}

// subscription page revenue graph

function fetchSubscriptionRevenueGraphTable(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_REVENUE_GRAPH,
        payload: data,
    };
}
function setSubscriptionRevenueGraphTable(data?: GraphData[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_REVENUE_GRAPH,
        payload: data,
    };
}

// subscription page active subs graph

function fetchSubscriptionActiveSubsGraph(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_ACTIVE_GRAPH,
        payload: data,
    };
}
function setSubscriptionActiveSubsGraph(data?: GraphData[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_ACTIVE_GRAPH,
        payload: data,
    };
}

// subscription page newsubs graph

function fetchSubscriptionNewSubsGraph(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_NEW_SUBS_GRAPH,
        payload: data,
    };
}
function setSubscriptionNewSubsGraph(data?: GraphData[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_NEW_SUBS_GRAPH,
        payload: data,
    };
}

// subscription page unubs graph

function fetchSubscriptionUnSubsGraph(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_UNSUBS_GRAPH,
        payload: data,
    };
}
function setSubscriptionUnSubsGraph(data?: GraphData[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_UNSUBS_GRAPH,
        payload: data,
    };
}

// subscription page rpm graph

function fetchSubscriptionnRpmGraph(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_RPM_GRAPH,
        payload: data,
    };
}
function setSubscriptionRpmGraph(data?: GraphData[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_RPM_GRAPH,
        payload: data,
    };
}

// subscription page domain stats pie chart
function fetchSubscriptionDomainStats(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_DOMAIN_STATS,
        payload: data,
    };
}
function setSubscriptionDomainStats(data?: CountryDomainStatsPieChart[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_DOMAIN_STATS,
        payload: data,
    };
}

//subscription page country stats pie chart
function fetchSubscriptionCountryStats(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_COUNTRY_STATS,
        payload: data,
    };
}
function setSubscriptionCountryStats(data?: CountryDomainStatsPieChart[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_COUNTRY_STATS,
        payload: data,
    };
}

//COUNTRIE TABLE
function fetchSubscriptionCountries(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_COUNTRY_TABLE,
        payload: data,
    };
}
function setSubscriptionCountries(data?: CountryDomainStatsPieChart[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_COUNTRY_TABLE,
        payload: data,
    };
}

//DEVICE TABLE
function fetchSubscriptionDevice(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_DEVICE_TABLE,
        payload: data,
    };
}
function setSubscriptionDevice(data?: CountryDomainStatsPieChart[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_DEVICE_TABLE,
        payload: data,
    };
}
//PAGES TABLE
function fetchSubscriptionPage(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_PAGE_TABLE,
        payload: data,
    };
}
function setSubscriptionPage(data?: CountryDomainStatsPieChart[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_PAGE_TABLE,
        payload: data,
    };
}
//Subscriber TABLE
function fetchSubscriptionSubscriber(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIBER_TABLE,
        payload: data,
    };
}
function setSubscriptionSubscriber(data?: CountryDomainStatsPieChart[]): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIBER_TABLE,
        payload: data,
    };
}

//subscription by country
function fetchSubscriptionByCountry(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_BY_COUNTRY,
        payload: data,
    };
}
function setSubscriptionByCountry(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_BY_COUNTRY,
        payload: data,
    };
}

// subscription by device
function fetchSubscriptionByDevice(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_BY_DEVICE,
        payload: data,
    };
}
function setSubscriptionByDevice(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_BY_DEVICE,
        payload: data,
    };
}

// reason for unsubscription
function fetchReasonForUnSubscription(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_REASON_FOR_UNSUBSCRIPTION,
        payload: data,
    };
}
function setReasonForUnSubscription(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.SET_REASON_FOR_UNSUBSCRIPTION,
        payload: data,
    };
}

//subscribers list
function fetchSubscriberList(): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIBERS_LIST,
        payload: undefined,
    };
}

function setSubscriberList(data?: any): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIBERS_LIST,
        payload: data,
    };
}

//subscription log table
function fetchSubscriptionLogTable(data: any): CommonAction {
    return {
        type: SubsDashboardTypes.FETCH_SUBSCRIPTION_LOG_TABLE,
        payload: data,
    };
}
function setSubscriptionLogTable(data?: Subscription): CommonAction {
    return {
        type: SubsDashboardTypes.SET_SUBSCRIPTION_LOG_TABLE,
        payload: data,
    };
}
const SubsDashboardAction = {
    // subscription dashboard
    fetchSubscriptionTopCard,
    setSubscriptionTopCard,
    fetchSubscriptionWidget1Table,
    setSubscriptionWidget1Table,
    fetchSubscriptionDomainTable,
    setSubscriptionDomainTable,

    // subscription graph and stats
    fetchSubscriptionRevenueGraphTable,
    setSubscriptionRevenueGraphTable,
    fetchSubscriptionDomainStats,
    setSubscriptionDomainStats,
    fetchSubscriptionActiveSubsGraph,
    setSubscriptionActiveSubsGraph,
    fetchSubscriptionNewSubsGraph,
    setSubscriptionNewSubsGraph,
    fetchSubscriptionUnSubsGraph,
    setSubscriptionUnSubsGraph,
    fetchSubscriptionnRpmGraph,
    setSubscriptionRpmGraph,

    //for tables

    fetchSubscriptionCountries,
    setSubscriptionCountries,
    fetchSubscriptionDevice,
    setSubscriptionDevice,
    fetchSubscriptionPage,
    setSubscriptionPage,
    fetchSubscriptionSubscriber,
    setSubscriptionSubscriber,

    fetchSubscriptionByCountry,
    setSubscriptionByCountry,
    fetchSubscriptionByDevice,
    setSubscriptionByDevice,

    //reason for unsubscription
    fetchReasonForUnSubscription,
    setReasonForUnSubscription,

    //subscribers list
    fetchSubscriberList,
    setSubscriberList,
    fetchSubscriptionLogTable,
    setSubscriptionLogTable,
    fetchSubscriptionCountryStats,
    setSubscriptionCountryStats,
};

export default SubsDashboardAction;
