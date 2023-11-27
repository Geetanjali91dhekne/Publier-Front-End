const SubsDashboardTypes = {
    //for subscription dashboard page
    // subscription dashboard page top cards
    FETCH_SUBSCRIPTION_TOP_CARD: 'FETCH_SUBSCRIPTION_TOP_CARD',
    SET_SUBSCRIPTION_TOP_CARD: 'SET_SUBSCRIPTION_TOP_CARD',

    // subscription dashboard page widget table
    FETCH_SUBSCRIPTION_WIDGET_ONE_TABLE: 'FETCH_SUBSCRIPTION_WIDGET_ONE_TABLE',
    SET_SUBSCRIPTION_WIDGET_ONE_TABLE: 'SET_SUBSCRIPTION_WIDGET_ONE_TABLE',

    // subscription dashboard page domain table
    FETCH_SUBSCRIPTION_DOMAIN_TABLE: 'FETCH_SUBSCRIPTION_DOMAIN_TABLE',
    SET_SUBSCRIPTION_DOMAIN_TABLE: 'SET_SUBSCRIPTION_DOMAIN_TABLE',

    // subscription dashboard page revenue bar graph
    FETCH_SUBSCRIPTION_REVENUE_GRAPH: 'FETCH_SUBSCRIPTION_REVENUE_GRAPH',
    SET_SUBSCRIPTION_REVENUE_GRAPH: 'SET_SUBSCRIPTION_REVENUE_GRAPH',

    // subscription dashboard page active subs bar graph
    FETCH_SUBSCRIPTION_ACTIVE_GRAPH: 'FETCH_SUBSCRIPTION_ACTIVE_GRAPH',
    SET_SUBSCRIPTION_ACTIVE_GRAPH: 'SET_SUBSCRIPTION_ACTIVE_GRAPH',

    // subscription dashboard page newsubs bar graph
    FETCH_SUBSCRIPTION_NEW_SUBS_GRAPH: 'FETCH_SUBSCRIPTION_NEW_SUBS_GRAPH',
    SET_SUBSCRIPTION_NEW_SUBS_GRAPH: 'SET_SUBSCRIPTION_NEW_SUBS_GRAPH',

    // subscription dashboard page unsubs bar graph
    FETCH_SUBSCRIPTION_UNSUBS_GRAPH: 'FETCH_SUBSCRIPTION_UNSUBS_GRAPH',
    SET_SUBSCRIPTION_UNSUBS_GRAPH: 'SET_SUBSCRIPTION_UNSUBS_GRAPH',

    // subscription dashboard page rpm bar graph
    FETCH_SUBSCRIPTION_RPM_GRAPH: 'FETCH_SUBSCRIPTION_RPM_GRAPH',
    SET_SUBSCRIPTION_RPM_GRAPH: 'SET_SUBSCRIPTION_RPM_GRAPH',

    // subscription dashboard page country stats pie chart
    FETCH_SUBSCRIPTION_COUNTRY_STATS: 'FETCH_SUBSCRIPTION_COUNTRY_STATS',
    SET_SUBSCRIPTION_COUNTRY_STATS: 'SET_SUBSCRIPTION_COUNTRY_STATS',

    // subscription dashboard page domain stats pie chart
    FETCH_SUBSCRIPTION_DOMAIN_STATS: 'FETCH_SUBSCRIPTION_DOMAIN_STATS',
    SET_SUBSCRIPTION_DOMAIN_STATS: 'SET_SUBSCRIPTION_DOMAIN_STATS',

    //COUNTRY TABLE
    FETCH_COUNTRY_TABLE: 'FETCH_COUNTRY_TABLE',
    SET_COUNTRY_TABLE: 'SET_COUNTRY_TABLE',

    //DEVICE TABLE
    FETCH_DEVICE_TABLE: 'FETCH_DEVICE_TABLE',
    SET_DEVICE_TABLE: 'SET_DEVICE_TABLE',

    //PAGE TABLE
    FETCH_PAGE_TABLE: 'FETCH_PAGE_TABLE',
    SET_PAGE_TABLE: 'SET_PAGE_TABLE',

    //SUBSCRIBER TABLE
    FETCH_SUBSCRIBER_TABLE: 'FETCH_SUBSCRIBER_TABLE',
    SET_SUBSCRIBER_TABLE: 'SET_SUBSCRIBER_TABLE',

    // COUNTRY WISE SUBSCRIPTION
    FETCH_SUBSCRIPTION_BY_COUNTRY: 'FETCH_SUBSCRIPTION_BY_COUNTRY',
    SET_SUBSCRIPTION_BY_COUNTRY: 'SET_SUBSCRIPTION_BY_COUNTRY',

    // DEVICE WISE SUBSCRIPTION
    FETCH_SUBSCRIPTION_BY_DEVICE: 'FETCH_SUBSCRIPTION_BY_DEVICE',
    SET_SUBSCRIPTION_BY_DEVICE: 'SET_SUBSCRIPTION_BY_DEVICE',

    //REASON FOR UNSUBSCRIPTION
    FETCH_REASON_FOR_UNSUBSCRIPTION: 'FETCH_REASON_FOR_UNSUBSCRIPTION',
    SET_REASON_FOR_UNSUBSCRIPTION: 'SET_REASON_FOR_UNSUBSCRIPTION',

    //SUBSCRIBERS LIST
    FETCH_SUBSCRIBERS_LIST: 'FETCH_SUBSCRIBERS_LIST',
    SET_SUBSCRIBERS_LIST: 'SET_SUBSCRIBERS_LIST',

    //SUBSCRIPTION LOG
    FETCH_SUBSCRIPTION_LOG_TABLE: 'FETCH_SUBSCRIPTION_LOG_TABLE',
    SET_SUBSCRIPTION_LOG_TABLE: 'SET_SUBSCRIPTION_LOG_TABLE',
};

export default SubsDashboardTypes;

export interface GraphData {
    date: string;
    value: number;
    ad_server?: string;
    total_impressions?: number;
    total_page_view?: number;
}

export interface CPMOrRevenueOrRequestGraphBySite {
    graph: {
        name: string;
        amt: string;
        prev: string;
    }[];
    total: number;
    ad_server?: string;
    total_impressions?: number;
    total_page_view?: number;
}
// for subscriptions
export interface Subscription {
    start_date: string;
    end_date: string;
    revenue?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    site_id?: any;
}

export interface TopCards {
    total_revenue: number;
    revenue_percentage: number;
    previous_total_revenue?: number;
    active_sub_percentage?: number;
    total_active_sub?: number;
    previous_total_active_sub?: number;
    total_rpm: number;
    previous_total_rpm?: number;
    rpm_percentage?: number;
    total_new_sub?: number;
    previous_total_new_sub?: number;
    new_sub_percentage?: number;
    total_unsub?: number;
    previous_total_unsub?: number;
    unsub_percentage?: number;
}

export interface CountryDomainStatsPieChart {
    domains?: any;
    site_id?: string;
    total_pageviews?: number;
    total_subscription_pageviews?: number;
    pageview_per?: number;
    subscription_pageview_per?: number;
    pageview_percentage?: number;
    pageview_subscription_percentage?: number;
}

export interface SubsDashboardState {
    subscritptionTopCard?: TopCards;
    subscritptionTopCardLoader?: boolean;

    subscriptionWidgetTableOne?: any;
    subscriptionWidgetTableOneLoader?: boolean;

    subscriptionDomainTable?: Subscription[];
    subscriptionDomainTableLoader?: boolean;

    subscriptionRevenueGraph: GraphData[];
    subscriptionRevenueGraphLoader: boolean;

    subscriptionActiveSubsGraph: GraphData[];
    subscriptionActiveSubsGraphLoader: boolean;

    subscriptionNewSubsGraph: GraphData[];
    subscriptionNewSubsGraphLoader: boolean;

    subscriptionUnSubsGraph: GraphData[];
    subscriptionUnSubsGraphLoader: boolean;

    subscriptionRpmGraph: GraphData[];
    subscriptionRpmGraphLoader: boolean;

    subscriptionDomainStatsGraph?: CountryDomainStatsPieChart[];
    subscriptionDomainStatsLoader?: boolean;

    subscriptionCountryStatsGraph?: CountryDomainStatsPieChart[];
    subscriptionCountryStatsLoader?: boolean;

    countryTable?: Subscription[];
    countryTableLoader?: boolean;
    deviceTable?: Subscription[];
    deviceTableLoader?: boolean;
    pageTable?: Subscription[];
    pageTableLoader?: boolean;
    subscriberTable?: any;
    subscriberTableLoader?: boolean;

    subscriptionByCountryGraph?: CountryDomainStatsPieChart[];
    subscriptionByCountryGraphLoader?: boolean;
    subscriptionByDeviceGraph?: CountryDomainStatsPieChart[];
    subscriptionByDeviceGraphLoader?: boolean;

    reasonForUnsubscriptionData?: any;
    reasonForUnsubscriptionLoader?: boolean;

    subscribersList: { id: number; site_name: string }[];
    subscribersListLoader?: boolean;

    subscriptionLogTable?: any;
    subscriptionLogTableLoader?: boolean;
}
