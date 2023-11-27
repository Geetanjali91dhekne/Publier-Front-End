import { CommonAction } from '../../../../login/redux/types';
import CrowdFundingDashboardTypes, { CrowdFundingDashboardStates } from './types';

const CrowdFundingInitialState: CrowdFundingDashboardStates = {
    crowdFundingEarningGraph: [],
    crowdFundingEarningGraphLoader: false,
    crowdFundingDonorGraph: [],
    crowdFundingDonorGraphLoader: false,
    crowdFundingFundraiserGraph: [],
    crowdFundingFundraiserGraphLoader: false,
    crowdFundingAvgDonorGrpah: undefined,
    crowdFundingAvgDonorGraphLoader: false,
    crowdFundingEcpmGraph: undefined,
    crowdFundingEcpmGraphLoader: false,
    crowdFundingDomainTable: undefined,
    crowdFundingDomainTableLoader: false,
    crowdFundingCountryTable: undefined,
    crowdFundingCountryTableLoader: false,
    crowdFundingDeviceTable: undefined,
    crowdFundingDeviceTableLoader: false,
    crowdFundingPagesTable: undefined,
    crowdFundingPagesTableLoader: false,
};

const crowdFundingDashboardReducer = (state = CrowdFundingInitialState, action: CommonAction): CrowdFundingDashboardStates => {
    switch (action.type) {
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_TOP_CARD:
            return {
                ...state,
                crowdFundingTopCardsLoader: true,
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_TOP_CARD:
            return {
                ...state,
                crowdFundingTopCards: action.payload,
                crowdFundingTopCardsLoader: false,
            };

        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_WIDGET_TABLE:
            return {
                ...state,
                crowdFundingWidgetTableLoader: true,
                crowdFundingWidgetTableData: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_WIDGET_TABLE:
            return {
                ...state,
                crowdFundingWidgetTableData: action.payload,
                crowdFundingWidgetTableLoader: false,
            };

        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARNING_GRAPH:
            return {
                ...state,
                crowdFundingEarningGraphLoader: true,
                crowdFundingEarningGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_EARNING_GRAPH:
            return {
                ...state,
                crowdFundingEarningGraphLoader: false,
                crowdFundingEarningGraph: action.payload,
            };

        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_GRAPH:
            return {
                ...state,
                crowdFundingDonorGraphLoader: true,
                crowdFundingDonorGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_DONOR_GRAPH:
            return {
                ...state,
                crowdFundingDonorGraph: action.payload,
                crowdFundingDonorGraphLoader: false,
            };

        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_FUNDRAISER_GRAPH:
            return {
                ...state,
                crowdFundingFundraiserGraphLoader: true,
                crowdFundingFundraiserGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_FUNDRAISER_GRAPH:
            return {
                ...state,
                crowdFundingFundraiserGraph: action.payload,
                crowdFundingFundraiserGraphLoader: false,
            };
        //crowdfunding earn by country
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH:
            return {
                ...state,
                crowdFundingEarnByCountryPieGraphLoader: true,
                crowdFundingEarnByCountryPieGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_EARN_BY_COUNTRY_PIE_GRAPH:
            return {
                ...state,
                crowdFundingEarnByCountryPieGraph: action.payload,
                crowdFundingEarnByCountryPieGraphLoader: false,
            };

        //crowdfunding earn by device
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH:
            return {
                ...state,
                crowdFundingEarnByDevicePieGraphLoader: true,
                crowdFundingEarnByDevicePieGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_EARN_BY_DEVICES_PIE_GRAPH:
            return {
                ...state,
                crowdFundingEarnByDevicePieGraph: action.payload,
                crowdFundingEarnByDevicePieGraphLoader: false,
            };

        //crowdfunding donor by country
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH:
            return {
                ...state,
                crowdFundingDonorByCountryPieGraphLoader: true,
                crowdFundingDonorByCountryPieGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_DONOR_BY_COUNTRY_PIE_GRAPH:
            return {
                ...state,
                crowdFundingDonorByCountryPieGraph: action.payload,
                crowdFundingDonorByCountryPieGraphLoader: false,
            };

        //crowdfunding donor by device
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH:
            return {
                ...state,
                crowdFundingDonorByDevicePieGraphLoader: true,
                crowdFundingDonorByDevicePieGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_DONOR_BY_DEVICES_PIE_GRAPH:
            return {
                ...state,
                crowdFundingDonorByDevicePieGraph: action.payload,
                crowdFundingDonorByDevicePieGraphLoader: false,
            };

        //crowdfunding avg donor graph
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_AVG_DONATION_GRAPH:
            return {
                ...state,
                crowdFundingAvgDonorGraphLoader: true,
                crowdFundingAvgDonorGrpah: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_AVG_DONATION_GRAPH:
            return {
                ...state,
                crowdFundingAvgDonorGrpah: action.payload,
                crowdFundingAvgDonorGraphLoader: false,
            };

        //crowdfunding ecpm graph
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_ECPM_GRAPH:
            return {
                ...state,
                crowdFundingEcpmGraphLoader: true,
                crowdFundingEcpmGraph: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_ECPM_GRAPH:
            return {
                ...state,
                crowdFundingEcpmGraph: action.payload,
                crowdFundingEcpmGraphLoader: false,
            };

        //crowdfunding domain table
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_DOMAIN_TABLE:
            return {
                ...state,
                crowdFundingDomainTableLoader: true,
                crowdFundingDomainTable: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_DOMAIN_TABLE:
            return {
                ...state,
                crowdFundingDomainTable: action.payload,
                crowdFundingDomainTableLoader: false,
            };

        //crowdfunding domain table
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_COUNTRY_TABLE:
            return {
                ...state,
                crowdFundingCountryTableLoader: true,
                crowdFundingCountryTable: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_COUNTRY_TABLE:
            return {
                ...state,
                crowdFundingCountryTable: action.payload,
                crowdFundingCountryTableLoader: false,
            };

        //crowdfunding device table
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_DEVICE_TABLE:
            return {
                ...state,
                crowdFundingDeviceTableLoader: true,
                crowdFundingDeviceTable: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_DEVICE_TABLE:
            return {
                ...state,
                crowdFundingDeviceTable: action.payload,
                crowdFundingDeviceTableLoader: false,
            };

        //crowdfunding pages table
        case CrowdFundingDashboardTypes.FETCH_CROWDFUND_PAGES_TABLE:
            return {
                ...state,
                crowdFundingPagesTableLoader: true,
                crowdFundingPagesTable: [],
            };
        case CrowdFundingDashboardTypes.SET_CROWDFUND_PAGES_TABLE:
            return {
                ...state,
                crowdFundingPagesTable: action.payload,
                crowdFundingPagesTableLoader: false,
            };
        default:
            return state;
    }
};

export default crowdFundingDashboardReducer;
