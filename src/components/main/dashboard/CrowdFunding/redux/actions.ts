import { CommonAction } from '../../../../login/redux/types';
import CrowdFundingDashboardTypes, { CrowdFunding, EarningOrDoners } from './types';

function fetchCrowdFundTopCard(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_TOP_CARD,
        payload: data,
    };
}
function setCrowdFundTopCard(data?: EarningOrDoners): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_TOP_CARD,
        payload: data,
    };
}

function fetchCrowdFundWidgetTable(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_WIDGET_TABLE,
        payload: data,
    };
}
function setCrowdFundWidgetTable(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_WIDGET_TABLE,
        payload: data,
    };
}

//crowdfunding earning grah
function fetchCrowdFundEarningGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARNING_GRAPH,
        payload: data,
    };
}
function setCrowdFundEarningGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_EARNING_GRAPH,
        payload: data,
    };
}

//crowdfunding donor grah
function fetchCrowdFundDonorGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_GRAPH,
        payload: data,
    };
}
function setCrowdFundDonorGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_DONOR_GRAPH,
        payload: data,
    };
}

//crowdfunding fundrasier grah
function fetchCrowdFundFundraiserGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_FUNDRAISER_GRAPH,
        payload: data,
    };
}
function setCrowdFundFundraiserGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_FUNDRAISER_GRAPH,
        payload: data,
    };
}

//crowdfunding earning by country pie grah
function fetchCrowdFundEarningByCountryPieGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH,
        payload: data,
    };
}
function setCrowdFundEarningByCountryPieGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH,
        payload: data,
    };
}

//crowdfunding earning by devices pie grah
function fetchCrowdFundEarningByDevicesPieGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH,
        payload: data,
    };
}
function setCrowdFundEarningByDevicesPieGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH,
        payload: data,
    };
}

//crowdfunding donor by country pie grah
function fetchCrowdFundDonorByCountryPieGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH,
        payload: data,
    };
}
function setCrowdFundDonorByCountryPieGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH,
        payload: data,
    };
}

//crowdfunding donor by devices pie grah
function fetchCrowdFundDonorByDevicesPieGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH,
        payload: data,
    };
}
function setCrowdFundDonorByDevicesPieGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH,
        payload: data,
    };
}

//crowdfunding avg donation graph
function fetchCrowdFundAvgDonationGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_AVG_DONATION_GRAPH,
        payload: data,
    };
}
function setCrowdFundDonorAvgDonationGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_AVG_DONATION_GRAPH,
        payload: data,
    };
}

//crowdfunding ecpm graph
function fetchCrowdFundEcpmGraph(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_ECPM_GRAPH,
        payload: data,
    };
}
function setCrowdFundEcpmGraph(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_ECPM_GRAPH,
        payload: data,
    };
}

//crowdfunding domain table
function fetchCrowdFundDomainTable(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_DOMAIN_TABLE,
        payload: data,
    };
}
function setCrowdFundDomainTable(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_DOMAIN_TABLE,
        payload: data,
    };
}

//crowdfunding country table
function fetchCrowdFundCountryTable(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_COUNTRY_TABLE,
        payload: data,
    };
}
function setCrowdFundCountryTable(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_COUNTRY_TABLE,
        payload: data,
    };
}

//crowdfunding device table
function fetchCrowdFundDeviceTable(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_DEVICE_TABLE,
        payload: data,
    };
}
function setCrowdFundDeviceTable(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_DEVICE_TABLE,
        payload: data,
    };
}

//crowdfunding pages table
function fetchCrowdFundPagesTable(data?: CrowdFunding): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.FETCH_CROWDFUND_PAGES_TABLE,
        payload: data,
    };
}
function setCrowdFundPagesTable(data?: any): CommonAction {
    return {
        type: CrowdFundingDashboardTypes.SET_CROWDFUND_PAGES_TABLE,
        payload: data,
    };
}

const CrowdFundingDashboardActions = {
    fetchCrowdFundTopCard,
    setCrowdFundTopCard,
    fetchCrowdFundWidgetTable,
    setCrowdFundWidgetTable,
    fetchCrowdFundEarningGraph,
    setCrowdFundEarningGraph,
    fetchCrowdFundDonorGraph,
    setCrowdFundDonorGraph,
    fetchCrowdFundFundraiserGraph,
    setCrowdFundFundraiserGraph,

    fetchCrowdFundEarningByCountryPieGraph,
    setCrowdFundEarningByCountryPieGraph,

    fetchCrowdFundEarningByDevicesPieGraph,
    setCrowdFundEarningByDevicesPieGraph,

    fetchCrowdFundDonorByCountryPieGraph,
    setCrowdFundDonorByCountryPieGraph,

    fetchCrowdFundDonorByDevicesPieGraph,
    setCrowdFundDonorByDevicesPieGraph,

    fetchCrowdFundAvgDonationGraph,
    setCrowdFundDonorAvgDonationGraph,

    fetchCrowdFundEcpmGraph,
    setCrowdFundEcpmGraph,

    fetchCrowdFundDomainTable,
    setCrowdFundDomainTable,

    fetchCrowdFundCountryTable,
    setCrowdFundCountryTable,

    fetchCrowdFundDeviceTable,
    setCrowdFundDeviceTable,

    fetchCrowdFundPagesTable,
    setCrowdFundPagesTable,
};
export default CrowdFundingDashboardActions;
