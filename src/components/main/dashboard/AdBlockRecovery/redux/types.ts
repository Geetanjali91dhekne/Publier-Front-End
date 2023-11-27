import { FavoriteOrRecent } from "../../AdOptimization/redux/types";

const AdBlockDashboardTypes = {
    //for adblock dashboard page
    // adblock dashboard page top cards
    FETCH_ADBLOCK_TOP_CARD: 'FETCH_ADBLOCK_TOP_CARD',
    SET_ADBLOCK_TOP_CARD: 'SET_ADBLOCK_TOP_CARD',

    //adblock dashboard pvs graph 
    FETCH_ADBLOCK_PVS_GRAPH: 'FETCH_ADBLOCK_PVS_GRAPH',
    SET_ADBLOCK_PVS_GRAPH: 'SET_ADBLOCK_PVS_GRAPH',

    //adblock dashboard percentage user graph 
    FETCH_ADBLOCK_PERUSER_GRAPH: 'FETCH_ADBLOCK_PERUSER_GRAPH',
    SET_ADBLOCK_PERUSER_GRAPH: 'SET_ADBLOCK_PERUSER_GRAPH',

    //adblock widget table
    FETCH_ADBLOCK_WIDGET_TABLE: 'FETCH_ADBLOCK_WIDGET_TABLE',
    SET_ADBLOCK_WIDGET_TABLE: 'SET_ADBLOCK_WIDGET_TABLE',

    //adblock country table
    FETCH_ADBLOCK_COUNTRY_TABLE: 'FETCH_ADBLOCK_COUNTRY_TABLE',
    SET_ADBLOCK_COUNTRY_TABLE: 'SET_ADBLOCK_COUNTRY_TABLE',

    //adblock device table
    FETCH_ADBLOCK_DEVICE_TABLE: 'FETCH_ADBLOCK_DEVICE_TABLE',
    SET_ADBLOCK_DEVICE_TABLE: 'SET_ADBLOCK_DEVICE_TABLE',

    //adblock device table
    FETCH_ADBLOCK_DOMAIN_TABLE: 'FETCH_ADBLOCK_DOMAIN_TABLE',
    SET_ADBLOCK_DOMAIN_TABLE: 'SET_ADBLOCK_DOMAIN_TABLE',

    //brhiwser api
    FETCH_ADBLOCK_BROWSER: 'FETCH_ADBLOCK_BROWSER',
    SET_ADBLOCK_BROWSER: 'SET_ADBLOCK_BROWSER',

    //adblock site list
    FETCH_ADBLOCK_LIST: 'FETCH_ADBLOCK_LIST',
    SET_ADBLOCK_LIST: 'SET_ADBLOCK_LIST',
}
export default AdBlockDashboardTypes;

export interface AdBlockRecovery {
    start_date: string;
    end_date: string;
    revenue?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    site_id?: any,
    widget_id?:string |null;
}

export interface TopCards {
    total_ab_pageview?: number;
    previous_total_ab_pageview?: number;
    ab_pageview_percentage?: number;
    ab_user_per?: number;
    previous_ab_user_per?: number;
    ab_user_per_percentage?: number;
    engagement_rate_percentage?:number;
    engagement_rate?:number;
    previous_engagement_rate?:number;
    removal_rate_percentage?:number;
    removal_rate?:number;
    previous_removal_rate?:number;
}

export interface AdBlockDashboardStates {
    adBlockTopCards?: TopCards;
    adBlockTopCardsLoader?: boolean;

    adBlockPvsGraphData: any;
    adBlockPvsGraphLoader: boolean;

    adBlockPerUserGraphData: any;
    adBlockPerUserGraphDataLoader: boolean;

    adBlockWidgetTable: any;
    adBlockWidgetTableLoader: boolean;

    adBlockCountryTable: any;
    adBlockCountryTableLoader: boolean;

    adBlockDeviceTable: any;
    adBlockDeviceTableLoader: boolean;

    adBlockDomainTable:any;
    adBlockDomainTableLoader:boolean;

    adBlockBrowserData:any;
    adBlockBrowserDataLoader:boolean;

    adblockSiteList:FavoriteOrRecent[];
    adBlockSiteListLoader:boolean;
}
