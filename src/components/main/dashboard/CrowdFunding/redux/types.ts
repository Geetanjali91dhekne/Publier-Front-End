const CrowdFundingDashboardTypes = {
    //for crowdfunding dashboard page
    // crowdfunding dashboard page top cards
    FETCH_CROWDFUND_TOP_CARD: 'FETCH_CROWDFUND_TOP_CARD',
    SET_CROWDFUND_TOP_CARD: 'SET_CROWDFUND_TOP_CARD',

    //crowdfunding widget table
    FETCH_CROWDFUND_WIDGET_TABLE: 'FETCH_CROWDFUND_WIDGET_TABLE',
    SET_CROWDFUND_WIDGET_TABLE: 'SET_CROWDFUND_WIDGET_TABLE',

    //crowdfunding earning graph
    FETCH_CROWDFUND_EARNING_GRAPH: 'FETCH_CROWDFUND_EARNING_GRAPH',
    SET_CROWDFUND_EARNING_GRAPH: 'SET_CROWDFUND_EARNING_GRAPH',

    //crowdfunding donor graph
    FETCH_CROWDFUND_DONOR_GRAPH: 'FETCH_CROWDFUND_DONOR_GRAPH',
    SET_CROWDFUND_DONOR_GRAPH: 'SET_CROWDFUND_DONOR_GRAPH',

    //crowdfunding fundraiser graph
    FETCH_CROWDFUND_FUNDRAISER_GRAPH: 'FETCH_CROWDFUND_FUNDRAISER_GRAPH',
    SET_CROWDFUND_FUNDRAISER_GRAPH: 'SET_CROWDFUND_FUNDRAISER_GRAPH',

    //crowdfunding EARN by country graph
    FETCH_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH: 'FETCH_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH',
    SET_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH: 'SET_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH',

    //crowdfunding EARN by devices graph
    FETCH_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH: 'FETCH_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH',
    SET_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH: 'SET_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH',

    //crowdfunding DONOR by country graph
    FETCH_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH: 'FETCH_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH',
    SET_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH: 'SET_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH',

    //crowdfunding DONOR by devices graph
    FETCH_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH: 'FETCH_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH',
    SET_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH: 'SET_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH',

    //crowdfunding avg donation graph
    FETCH_CROWDFUND_AVG_DONATION_GRAPH: 'FETCH_CROWDFUND_AVG_DONATION_GRAPH',
    SET_CROWDFUND_AVG_DONATION_GRAPH: 'SET_CROWDFUND_AVG_DONATION_GRAPH',

    //crowdfunding ecpm graph
    FETCH_CROWDFUND_ECPM_GRAPH: 'FETCH_CROWDFUND_ECPM_GRAPH',
    SET_CROWDFUND_ECPM_GRAPH: 'SET_CROWDFUND_ECPM_GRAPH',

    //crowdfunding domain graph
    FETCH_CROWDFUND_DOMAIN_TABLE: 'FETCH_CROWDFUND_DOMAIN_TABLE',
    SET_CROWDFUND_DOMAIN_TABLE: 'SET_CROWDFUND_DOMAIN_TABLE',

    //crowdfunding country graph
    FETCH_CROWDFUND_COUNTRY_TABLE: 'FETCH_CROWDFUND_COUNTRY_TABLE',
    SET_CROWDFUND_COUNTRY_TABLE: 'SET_CROWDFUND_COUNTRY_TABLE',

    //crowdfunding device graph
    FETCH_CROWDFUND_DEVICE_TABLE: 'FETCH_CROWDFUND_DEVICE_TABLE',
    SET_CROWDFUND_DEVICE_TABLE: 'SET_CROWDFUND_DEVICE_TABLE',

    //crowdfunding pages graph
    FETCH_CROWDFUND_PAGES_TABLE: 'FETCH_CROWDFUND_PAGES_TABLE',
    SET_CROWDFUND_PAGES_TABLE: 'SET_CROWDFUND_PAGES_TABLE',
};
export default CrowdFundingDashboardTypes;

export interface CrowdFunding {
    start_date: string;
    end_date: string;
    revenue?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    site_id?: any;
}

export interface EarningOrDoners {
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

export interface TopCards {
    total_earnings?: number;
    previous_total_earnings?: number;
    earnings_percentage?: number;
    total_donors?: number;
    previous_total_donors?: number;
    donors_percentage?: number;
    total_fund_views?: number;
    previous_total_fund_views?: number;
    fund_views_percentage?: number;
    average_donation?: number;
    previous_average_donation?: number;
    average_donation_percentage?: number;
    fund_ecpm?: number;
    previous_fund_ecpm?: number;
    fund_ecpm_percentage?: number;
}
export interface CrowdFundingDashboardStates {
    crowdFundingTopCards?: TopCards;
    crowdFundingTopCardsLoader?: boolean;

    crowdFundingWidgetTableData?: any;
    crowdFundingWidgetTableLoader?: boolean;

    crowdFundingEarningGraph: any;
    crowdFundingEarningGraphLoader: boolean;

    crowdFundingDonorGraph: any;
    crowdFundingDonorGraphLoader: boolean;

    crowdFundingFundraiserGraph: any;
    crowdFundingFundraiserGraphLoader: boolean;

    crowdFundingEarnByCountryPieGraph?: any;
    crowdFundingEarnByCountryPieGraphLoader?: boolean;

    crowdFundingEarnByDevicePieGraph?: any;
    crowdFundingEarnByDevicePieGraphLoader?: boolean;

    crowdFundingDonorByCountryPieGraph?: any;
    crowdFundingDonorByCountryPieGraphLoader?: boolean;

    crowdFundingDonorByDevicePieGraph?: any;
    crowdFundingDonorByDevicePieGraphLoader?: boolean;

    crowdFundingAvgDonorGrpah: any;
    crowdFundingAvgDonorGraphLoader: boolean;

    crowdFundingEcpmGraph: any;
    crowdFundingEcpmGraphLoader: boolean;

    crowdFundingDomainTable: any;
    crowdFundingDomainTableLoader: boolean;

    crowdFundingCountryTable: any;
    crowdFundingCountryTableLoader: boolean;

    crowdFundingDeviceTable: any;
    crowdFundingDeviceTableLoader: boolean;

    crowdFundingPagesTable: any;
    crowdFundingPagesTableLoader: boolean;
}
