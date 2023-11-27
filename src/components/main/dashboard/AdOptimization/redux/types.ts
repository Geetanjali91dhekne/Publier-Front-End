const AdOptDashboardTypes = {
    /**Top 12 Super Admin Dashboard Favorites*/
    FETCH_TOP_12_AD_OPT_FAVORITES: 'FETCH_TOP_12_AD_OPT_FAVORITES',
    SET_TOP_12_AD_OPT_FAVORITES: 'SET_TOP_12_AD_OPT_FAVORITES',

    /**Top 12 Super Admin Dashboard Recents */
    FETCH_TOP_12_AD_OPT_RECENT: 'FETCH_TOP_12_AD_OPT_RECENT',
    SET_TOP_12_AD_OPT_RECENT: 'SET_TOP_12_AD_OPT_RECENT',

    /**Top Trend Super Admin Dashboard */
    FETCH_AD_OPT_TOP_TREND: 'FETCH_AD_OPT_TOP_TREND',
    SET_AD_OPT_TOP_TREND: 'SET_AD_OPT_TOP_TREND',

    /** Revenue Graph Super Admin Dashboard */
    FETCH_AD_OPT_REVENUE_GRAPH: 'FETCH_AD_OPT_REVENUE_GRAPH',
    SET_AD_OPT_REVENUE_GRAPH: 'SET_AD_OPT_REVENUE_GRAPH',

    /** Demand channels Super Admin Dashboard*/
    FETCH_AD_OPT_DEMAND_CHANNEL: 'FETCH_AD_OPT_DEMAND_CHANNEL',
    SET_AD_OPT_DEMAND_CHANNEL: 'SET_AD_OPT_DEMAND_CHANNEL',

    /** Ad Request Graph Super Admin Dashboard **/
    FETCH_AD_OPT_AD_REQUEST_GRAPH: 'FETCH_AD_OPT_AD_REQUEST_GRAPH',
    SET_AD_OPT_AD_REQUEST_GRAPH: 'SET_AD_OPT_AD_REQUEST_GRAPH',

    /** Fill Rate Graph Super Admin Dashboard */
    FETCH_AD_OPT_FILLRATE_GRAPH: 'FETCH_AD_OPT_FILLRATE_GRAPH',
    SET_AD_OPT_FILLRATE_GRAPH: 'SET_AD_OPT_FILLRATE_GRAPH',

    /** Monetized Imps Graph Super Admin Dashboard */
    FETCH_AD_OPT_MONETIZED_IMPS_GRAPH: 'FETCH_AD_OPT_MONETIZED_IMPS_GRAPH',
    SET_AD_OPT_MONETIZED_IMPS_GRAPH: 'SET_AD_OPT_MONETIZED_IMPS_GRAPH',

    /** CPM Graph Super Admin Dashboard */
    FETCH_AD_OPT_CPM_GRAPH: 'FETCH_AD_OPT_CPM_GRAPH',
    SET_AD_OPT_CPM_GRAPH: 'SET_AD_OPT_CPM_GRAPH',

    /** Top card (Monetized Imps, Ad request, FillRate) Super Admin Dashboard*/
    FETCH_TOP_CARD_ADOPT: 'FETCH_TOP_CARD_ADOPT',
    SET_TOP_CARD_ADOPT: 'SET_TOP_CARD_ADOPT',

    /** Top card (Revenue, CPM) Super Admin Dashboard*/
    FETCH_TOP_CARD_REVENUE_CPM: 'FETCH_TOP_CARD_REVENUE_CPM',
    SET_TOP_CARD_REVENUE_CPM: 'SET_TOP_CARD_REVENUE_CPM',

    /** Fetch All Sites */
    FETCH_AD_OPT_All_SITES: 'FETCH_AD_OPT_All_SITES',
    SET_AD_OPT_ALL_SITES: 'SET_AD_OPT_ALL_SITES',

    /** List of Sites */
    /** Fetch All Sites (Sites list of Dashboard) */
    FETCH_SITES_LIST_AD_OPT_SITES: 'FETCH_SITES_LIST_AD_OPT_SITES',
    SET_SITES_LIST_AD_OPT_ALL_SITES: 'SET_SITES_LIST_AD_OPT_ALL_SITES',

    /** Fetch Favorites sites (Sites list of Dashboard) */
    FETCH_SITES_LIST_AD_OPT_FAVOURITE: 'FETCH_SITES_LIST_AD_OPT_FAVOURITE',
    SET_SITES_LIST_AD_OPT_FAVOURITE: 'SET_SITES_LIST_AD_OPT_FAVOURITE',

    /** Fetch Recent sites (Sites list of Dashboard) */
    FETCH_SITES_LIST_AD_OPT_RECENT: 'FETCH_SITES_LIST_AD_OPT_RECENT',
    SET_SITES_LIST_AD_OPT_RECENT: 'ET_SITES_LIST_AD_OPT_RECENT',

    /**Sites Pagination count (Sites list of Dashboard) */
    SITE_PAGINATION_COUNT: 'SITE_PAGINATION_COUNT',

    /** Favorite Unfavorite sites  (Sites list of Dashboard)*/
    FETCH_SITES_FAV_UNFAV: 'FETCH_SITES_FAV_UNFAV',
    SET_SITES_FAV_UNFAV: 'SET_SITES_FAV_UNFAV',

    /** CPM Graph of site (Site details dashboard) */
    FETCH_SITE_AD_OPT_CPM_GRAPH_BY_SITE: 'FETCH_SITE_AD_OPT_CPM_GRAPH_BY_SITE',
    SET_SITE_AD_OPT_CPM_GRAPH_BY_SITE: 'SET_SITE_AD_OPT_CPM_GRAPH_BY_SITE',

    /**Revenue Grapth By site (Site details dashboard)*/
    FETCH_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE: 'FETCH_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE',
    SET_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE: 'SET_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE',

    /**Revenue Grapth By site (Site details dashboard)*/
    FETCH_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE: 'FETCH_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE',
    SET_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE: 'SET_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE',

    /**Demand Channel stats (Site details dashboard)*/
    FETCH_SITE_AD_OPT_DEMAND_CHANNEL_STATS: 'FETCH_SITE_AD_OPT_DEMAND_CHANNEL_STATS',
    SET_SITE_AD_OPT_DEMAND_CHANNEL_STATS: 'SET_SITE_AD_OPT_DEMAND_CHANNEL_STATS',

    /**Size stats (Site details dashboard)*/
    FETCH_SITE_AD_OPT_SIZE_STATS: 'FETCH_SITE_AD_OPT_SIZE_STATS',
    SET_SITE_AD_OPT_SIZE_STATS: 'SET_SITE_AD_OPT_SIZE_STATS',

    /**Fill Unfilled and Undrendered (Site details dashboard)*/
    FETCH_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH: 'FETCH_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH',
    SET_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH: 'SET_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH',

    /**Fetch Date table (site details dashboard) */
    FETCH_SITE_AD_OPT_DATE_TABLE: 'FETCH_SITE_AD_OPT_DATE_TABLE',
    SET_SITE_AD_OPT_DATE_TABLE: 'SET_SITE_AD_OPT_DATE_TABLE',

    FETCH_AD_DATE: 'FETCH_AD_DATE',
    SET_AD_DATE: 'SET_AD_DATE',

    SET_SITE_LOCAL: 'SET_SITE_LOCAL',

    //table site data
    FETCH_SITE_TABLE_DATE: 'FETCH_SITE_TABLE_DATE',
    SET_SITE_TABLE_DATE: 'SET_SITE_TABLE_DATE',

    //network table
    FETCH_AD_OPT_NETWORK_TABLE: 'FETCH_AD_OPT_NETWORK_TABLE',
    SET_AD_OPT_NETWORK_TABLE: 'SET_AD_OPT_NETWORK_TABLE',

    //SIZE table
    FETCH_AD_OPT_SIZE_TABLE: 'FETCH_AD_OPT_SIZE_TABLE',
    SET_AD_OPT_SIZE_TABLE: 'SET_AD_OPT_SIZE_TABLE',

    /**Revenue Grapth By site (Site details dashboard)*/
    FETCH_SITE_AD_OPT_IMPS_GRAPH_BY_SITE: 'FETCH_SITE_AD_OPT_IMPS_GRAPH_BY_SITE',
    SET_SITE_AD_OPT_IMPS_GRAPH_BY_SITE: 'SET_SITE_AD_OPT_IMPS_GRAPH_BY_SITE',

    // for realtime
    FETCH_PAGEVIEW_IMPRESSION_GRAPH_REALTIME: 'FETCH_PAGEVIEW_IMPRESSION_GRAPH_REALTIME',
    SET_PAGEVIEW_IMPRESSION_GRAPH_REALTIME: 'SET_PAGEVIEW_IMPRESSION_GRAPH_REALTIME',
    //////
    FETCH_REVENUE_REQUEST_GRAPH_REALTIME: 'FETCH_REVENUE_REQUEST_GRAPH_REALTIME',
    SET_REVENUE_REQUEST_GRAPH_REALTIME: 'SET_REVENUE_REQUEST_GRAPH_REALTIME',
    //////
    FETCH_CPM_GRAPH_SITE_REALTIME: 'FETCH_CPM_GRAPH_SITE_REALTIME',
    SET_CPM_GRAPH_SITE_REALTIME: 'SET_CPM_GRAPH_SITE_REALTIME',
    ///////
    FETCH_RPM_GRAPH_SITE_REALTIME: 'FETCH_RPM_GRAPH_SITE_REALTIME',
    SET_RPM_GRAPH_SITE_REALTIME: 'SET_RPM_GRAPH_SITE_REALTIME',
    //
    FETCH_SIZE_TABLE_REALTIME: 'FETCH_SIZE_TABLE_REALTIME',
    SET_SIZE_TABLE_REALTIME: 'SET_SIZE_TABLE_REALTIME',
    //
    FETCH_NETWORK_TABLE_REALTIME: 'FETCH_NETWORK_TABLE_REALTIME',
    SET_NETWORK_TABLE_REALTIME: 'SET_NETWORK_TABLE_REALTIME',
    //
    FETCH_POPULAR_PAGE_REALTIME: 'FETCH_POPULAR_PAGE_REALTIME',
    SET_POPULAR_PAGE_REALTIME: 'SET_POPULAR_PAGE_REALTIME', 
    
    // For Demand Partners Inner Page
    FETCH_SITES_LIST_AD_OPT_SITES_BY_NETWORK: 'FETCH_SITES_LIST_AD_OPT_SITES_BY_NETWORK',
    SET_SITES_LIST_AD_OPT_SITES_BY_NETWORK: 'SET_SITES_LIST_AD_OPT_SITES_BY_NETWORK',

};

export default AdOptDashboardTypes;

export interface Count {
    siteCount: number;
    fCount: number;
    rCount: number;
}

export interface FavouriteUnfavourite {
    site_id?: number;
    favourite_flag?: number;
    favourite?: number;
    message?: string;
    status?: boolean;
    ad_server?: string;
    total_impressions?: number;
    total_page_view?: number;
}

export interface AdOptimisationReq {
    start_date: string;
    end_date: string;
    revenue?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    search_site?: string;
    time_interval?: string;
    ad_server?: string;
    total_impressions?: number;
    total_page_view?: number;
}

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

export interface siteTabelData {
    start_date: string;
    end_date: string;
    revenue: string;
    compare: boolean;
    compare_start_date: string;
    compare_end_date: string;
    date?: string;
    sum_ad_request?: any;
    sum_cpms?: string;
    sum_fillrate?: any;
    sum_impressions?: string;
    sum_pageviews?: number;
    sum_revenue?: string;
    sum_rpm?: number;
    ad_server?: string;
    total_impressions?: number;
    total_page_view?: number;
}

/////////////


export interface FavoriteOrRecent {
    id: string;
    date: string;
    site_id: number;
    site_name: string;
    network_id: number;
    size_id: number;
    impressions: number;
    revenue: string;
    clicks: number;
    status: 1 | 0;
    type?: string;
    manual_change: number;
    favourite: 1 | 0;
    total_revenue: string;
    created_at: any;
    impressions_percentage?: number;
    revenue_percentage?: number;
    total_cpms?: number;
    total_cpms_percentage?: number;
    total_fillrate?: string;
    total_fillrate_percentage?: number;
    total_impressions?: string;
    total_request?: string;
    total_request_percentage?: number;
    net_revenue_percentage?: number;
    net_total_cpms?: any;
    net_total_cpms_percentage?: number;
    net_total_revenue?: any;
    gross_revenue_percentage?: number;
    gross_total_cpms?: any;
    gross_total_cpms_percentage?: number;
    gross_total_revenue?: any;
    ad_server?: string;
    name?:string;
    gam?:string;
}

export interface TopTrend {
    site_name: string;
    site_id: string;
    requests: string;
    impressions: string;
    net_total_revenue: string;
    gross_total_revenue: string;
    total_request_percentage: number;
    total_request: number;
    net_revenue_percentage: number;
    gross_revenue_percentage: number;
    impressions_percentage: number;
    total_impressions: string;
    ad_server?: string;
}

export interface DemandChannel {
    network_name: string;
    network_id: string;
    total_impressions: string;
    total_revenue: string;
    total_cpm: string;
    ad_server?: string;
    impressions_percentage?: string;
    revenue_percentage?: string;
    total_cpm_percentage?: string;
}

export interface TopAdOptimisation {
    total_fill_rate: number;
    total_fill_rate_percentage: number;
    total_impressions: string;
    total_impressions_percentage: number;
    total_pageview: number;
    total_request: number;
    total_request_percentage: number;
    ad_server?: string;
    previous_total_fill_rate?: number;
    previous_total_impressions?: number;
    previous_total_request?: number;
    previous_total_cpms?: number;
    previous_total_revenue?: number;
}

export interface TopRevenueCPM {
    revenue_percentage: number;
    total_cpms: number;
    total_cpms_percentage: number;
    total_revenue: number;
    ad_server: string;
    previous_total_fill_rate?: number;
    previous_total_impressions?: number;
    previous_total_request?: number;
    previous_total_cpms?: number;
    previous_total_revenue?: number;
}

export interface DemandChannelStat {
    impressions: string;
    impressions_percentage: number;
    network_id: number;
    network_name: string;
    ad_server?: string;

    revenue_percentage: number;
    revenue_per: string;
    impressions_per: string;
    sum_revenue: string;
    dimensions: string;
}
export interface SizeStat {
    impressions: string;
    impressions_percentage: number;
    network_id: number;
    network_name: string;
    revenue_percentage: number;
    revenue_per: string;
    impressions_per: string;
    sum_revenue: string;
    dimensions: string;
    ad_server?: string;
}

export interface FillUnfillUnrendered {
    day: string;
    filled: number;
    unfilled: number;
    unrendered: number;
    ad_server?: string;
}

export interface DateTable {
    dimensions?: string;
    date: string;
    network_id?: string;
    network_name?: string;
    size_alias?: string;
    site_id?: string;
    sum_ad_request: string;
    sum_cpms: string;
    sum_fillrate: string;
    sum_impressions: string;
    sum_revenue: string;
    sum_rpm: string;
    ad_server?: string;
    pageview?:any;
}
export interface GraphForRealtime {
    siteId?: number;
    time_interval?: string;
    revenue?: string;
    total_impressions?: any;
    total_page_view?: any;
    total_request?: any;
    total_revenue?: any;
    total_cpms?: any;
    total_rpm?: any;
}

export interface SitesDemandChannel {
    gross_revenue_percentage: any;
    gross_total_cpms: any;
    gross_total_cpms_percentage: any;
    gross_total_revenue: any;
    impressions_percentage: any;
    net_revenue_percentage: any;
    net_total_cpms: any;
    net_total_cpms_percentage: any;
    net_total_revenue: any;
    no_adserver: any;
    site_id: any;
    site_name: any;
    total_fillrate: any;
    total_fillrate_percentage: any;
    total_impressions: any;
    total_request: any;
    total_request_percentage: any;
}

export interface AdOptDashboardState {
    favorites: FavoriteOrRecent[];
    favoriteLoader: boolean;
    recents: FavoriteOrRecent[];
    recentLoader: boolean;
    topTrends: TopTrend[];
    topTrendLoading: boolean;
    revenueGraph: GraphData[];
    revenueGraphLoading: boolean;
    adRequestGraph: GraphData[];
    adRequestGraphLoading: boolean;
    fillRateGraph: GraphData[];
    fillRateGraphLoading: boolean;
    demandChannel: DemandChannel[];
    demandChannelLoading: boolean;
    monetizedImpsGraph: GraphData[];
    monetizedImpsGraphLoading: boolean;
    cpmGraph: GraphData[];
    cpmGraphLoading: boolean;
    topAdOpt?: TopAdOptimisation;
    topCpm?: TopRevenueCPM;
    topAdOptLoader: boolean;
    topCpmLoader: boolean;
    allSites: FavoriteOrRecent[];
    allSitesLoading: boolean;
    allSitesOfList: FavoriteOrRecent[];
    favouriteSiteLoader: boolean;
    recentSiteLoader: boolean;
    favouriteSite: FavoriteOrRecent[];
    recentSite: FavoriteOrRecent[];
    count: Count;
    FavouriteUnfavourite?: FavouriteUnfavourite;
    FavouriteUnfavouriteLoader: boolean;
    sites: FavoriteOrRecent[];

    CpmGraphBySite?: CPMOrRevenueOrRequestGraphBySite;
    CpmGraphBySiteLoader?: boolean;
    RevenueGraphBySite?: CPMOrRevenueOrRequestGraphBySite;
    RevenueGraphBySiteLoader?: boolean;
    ImpsGraphBySite?: CPMOrRevenueOrRequestGraphBySite;
    ImpsGraphBySiteLoader?: boolean;
    RequestGraphBySite?: CPMOrRevenueOrRequestGraphBySite;
    RequestGraphBySiteLoader?: boolean;
    siteTableData: siteTabelData[];
    siteTableDataLoader?: boolean;
    demandChannelStat: DemandChannelStat[];
    demandChannelStatLoading: boolean;
    sizeStat: SizeStat[];
    sizeStatLoading: boolean;
    fillUnfillUnrendered: FillUnfillUnrendered[];
    fillUnfillUnrenderedLoading: boolean;
    dateTable: DateTable[];
    dateTableLoading: boolean;
    networkTable: DateTable[];
    networkTableLoading: boolean;
    sizeTable: DateTable[];
    sizeTableLoading: boolean;

    //REALTIME
    pageViewImpressionRealtime?: GraphForRealtime;
    pageViewImpressionRealtimeLoader?: boolean;
    revReqGraphBySiteRealtime?: GraphForRealtime;
    revReqGraphBySiteRealtimeLoader?: boolean;
    cpmGraphBySiteRealtime?: GraphForRealtime;
    cpmGraphBySiteRealtimeLoader?: boolean;
    rpmGraphBySiteRealtime?: GraphForRealtime;
    rpmGraphBySiteRealtimeLoader?: boolean;

    sizeTableRealTime?: GraphForRealtime;
    sizeTableRealtimeLoader?: boolean;
    networkTableRealtime?: GraphForRealtime;
    networkTableRealtimeLoader?: boolean;
    popularPageTableRealtime?: GraphForRealtime;
    popularPageTableRealtimeLoader?: boolean;

    //for subscriptions
   
    // for Demand Partners
    allSitesByDemandPartner: SitesDemandChannel[];
}


export interface AdBlockReportList {
    date: string;
    ad_block_page_views: string;
    whitelisted_times: string;
    conversation_ratio: string;
}