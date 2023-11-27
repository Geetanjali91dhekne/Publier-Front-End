import { CommonAction } from '../../../../login/redux/types';
import AdOptDashboardTypes, {
    siteTabelData,
    FavouriteUnfavourite,
    AdOptimisationReq,
    DemandChannel,
    FavoriteOrRecent,
    GraphData,
    TopTrend,
    TopAdOptimisation,
    TopRevenueCPM,
    Count,
    CPMOrRevenueOrRequestGraphBySite,
    DemandChannelStat,
    FillUnfillUnrendered,
    DateTable,
    SizeStat,
    GraphForRealtime,
} from './types';

/** Fetch top 12 ad optimisation Favorites (Super Admin Dashboard) */
function fetchTop12Favorites(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_TOP_12_AD_OPT_FAVORITES,
        payload: adOptReq,
    };
}

function setTop12Favorites(favorites: FavoriteOrRecent[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_TOP_12_AD_OPT_FAVORITES,
        payload: [...favorites],
    };
}
/** End Fetch top 12 ad optimisation Favorites (Super Admin Dashboard) */

/** Fetch top 12 ad optimisation Recents (Super Admin Dashboard) */
function fetchTop12Recents(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_TOP_12_AD_OPT_RECENT,
        payload: adOptReq,
    };
}

function setTop12Recents(recents: FavoriteOrRecent[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_TOP_12_AD_OPT_RECENT,
        payload: [...recents],
    };
}
/** End Fetch top 12 ad optimisation Recents (Super Admin Dashboard) */

/** Fetch top trend (Super Admin Dashboard) */
function fetchTopTrends(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_TOP_TREND,
        payload: adOptReq,
    };
}

function setTopTrends(topTrends: TopTrend[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_TOP_TREND,
        payload: topTrends,
    };
}
/** Fetch top trend (Super Admin Dashboard) */

/** Fetch Revenue graph (Super Admin Dashboard) */
function fetchRevenueGraph(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_REVENUE_GRAPH,
        payload: adOptReq,
    };
}

function setRevenueGraph(revenueGraph: GraphData[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_REVENUE_GRAPH,
        payload: revenueGraph,
    };
}
/** End Fetch Revenue graph (Super Admin Dashboard) */

/** Fetch Demand Channels (Super Admin Dashboard) */
function fetchDemandChannel(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_DEMAND_CHANNEL,
        payload: adOptReq,
    };
}

function setDemandChannel(demandChannel: DemandChannel[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_DEMAND_CHANNEL,
        payload: demandChannel,
    };
}
/** End Fetch Demand Channels (Super Admin Dashboard) */

/** Fetch Ad Request graph (Super Admin Dashboard) */
function fetchAdRequestGraph(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_AD_REQUEST_GRAPH,
        payload: adOptReq,
    };
}

function setAdRequestGraph(adRequestGraph: GraphData[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_AD_REQUEST_GRAPH,
        payload: adRequestGraph,
    };
}
/** End Fetch Ad Request graph (Super Admin Dashboard) */

/** Fetch Fill Rate Graph (Super Admin Dashboard) */
function fetchFillRateGraph(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_FILLRATE_GRAPH,
        payload: adOptReq,
    };
}

function setFillRateGraph(fillrateGraph: GraphData[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_FILLRATE_GRAPH,
        payload: fillrateGraph,
    };
}
/** End Fetch Fill Rate Graph (Super Admin Dashboard) */

/** Fetch Monetized Imps Graph (Super Admin Dashboard) */
function fetchMonetizedImpsGraph(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_MONETIZED_IMPS_GRAPH,
        payload: adOptReq,
    };
}

function setMonetizedImpsGraph(monetizedImpsGraph: GraphData[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_MONETIZED_IMPS_GRAPH,
        payload: monetizedImpsGraph,
    };
}
/** End Fetch Monetized Imps Graph (Super Admin Dashboard) */

/** Fetch CPM Graph (Super Admin Dashboard) */
function fetchCPMGraph(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_CPM_GRAPH,
        payload: adOptReq,
    };
}

function setCPMGraph(monetizedImpsGraph: GraphData[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_CPM_GRAPH,
        payload: monetizedImpsGraph,
    };
}
/** End Fetch CPM Graph (Super Admin Dashboard) */

/** Fetch Top Card (Monetized Imps, Ad request, FillRate) (Super Admin Dashboard) */
function fetchTopCardAdOpt(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_TOP_CARD_ADOPT,
        payload: adOptReq,
    };
}

function setTopCardAdOpt(data?: TopAdOptimisation): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_TOP_CARD_ADOPT,
        payload: data,
    };
}
/** End Fetch Top Card (Monetized Imps, Ad request, FillRate) (Super Admin Dashboard) */

/** Fetch Top Card (Revenue, CPM)(Super Admin Dashboard) */
function fetchTopCardRevenueCPM(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_TOP_CARD_REVENUE_CPM,
        payload: adOptReq,
    };
}

function setTopCardRevenueCPM(data?: TopRevenueCPM): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_TOP_CARD_REVENUE_CPM,
        payload: data,
    };
}
/** End Fetch Top Card (Revenue, CPM)(Super Admin Dashboard) */

/** Fetch All Sites */
function fetchAllSites(): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_All_SITES,
        payload: undefined,
    };
}

function setAllSites(data: FavoriteOrRecent[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_ALL_SITES,
        payload: data,
    };
}
/** End Fetch All Sites */

/** Fetch sites (List of sites AdOptimisation) */
function fetchAllSitesOfList(adOptReq: AdOptimisationReq, pageNumber: number): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_SITES,
        payload: {
            adOptReq,
            pageNumber,
        },
    };
}

function setAllSitesOfList(topRevenueAll: FavoriteOrRecent[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITES_LIST_AD_OPT_ALL_SITES,
        payload: [...topRevenueAll],
    };
}
/**End Fetch sites (List of sites AdOptimisation) */

/** Fetch Favorites Sites */
function fetchFavoriteSites(adOptReq: AdOptimisationReq, pageNumber: number): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_FAVOURITE,
        payload: { adOptReq, pageNumber },
    };
}

function setFavoriteSites(data?: FavoriteOrRecent[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITES_LIST_AD_OPT_FAVOURITE,
        payload: data,
    };
}
/** End Fetch Favorites Sites */

/** Fetch Recent Sites */
function fetchRecentSites(adOptReq: AdOptimisationReq): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_RECENT,
        payload: adOptReq,
    };
}

function setRecentSites(data?: FavoriteOrRecent[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITES_LIST_AD_OPT_RECENT,
        payload: data,
    };
}
/** End Fetch Recent Sites */

/** Set total sites count */
function setSitesPaginationCount(data: Count) {
    return {
        type: AdOptDashboardTypes.SITE_PAGINATION_COUNT,
        payload: data,
    };
}
/** End  Set total sites count */

/** Fetch Favorites Unfavorites sites */
function fetchSitesFavUnfav(data: FavouriteUnfavourite, activeTab: string): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITES_FAV_UNFAV,
        payload: { apiPayload: data, activetab: activeTab },
    };
}

function setSitesFavUnfav(data?: FavouriteUnfavourite[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITES_FAV_UNFAV,
        payload: data,
    };
}
/** End Fetch Favorites Unfavorites sites */

/** Fetch CPM graph by site (Site detail Dashboard) */
function fetchCpmGraphBySite(data: AdOptimisationReq, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_CPM_GRAPH_BY_SITE,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setCpmGraphBySite(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_CPM_GRAPH_BY_SITE,
        payload: data,
    };
}
/** End Fetch CPM graph by site (Site detail Dashboard) */

/** Fetch Revenue graph by site (Site detail Dashboard) */
function fetchRevenueGraphBySite(data: AdOptimisationReq, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setRevenueGraphBySite(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE,
        payload: data,
    };
}
/** End Fetch Revenue graph by site (Site detail Dashboard) */

/** Fetch Request graph by site (Site detail Dashboard) */
function fetchRequestGraphBySite(data: AdOptimisationReq, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setRequestGraphBySite(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE,
        payload: data,
    };
}
/**End Fetch Request graph by site (Site detail Dashboard) */

/** Fetch Demand channel stat by site (Site detail Dashboard) */
function fetchDemandChannelStatBySite(req: { start_date: string; end_date: string; revenue?: string; compare: boolean; compare_start_date: string; compare_end_date: string }, siteId: string): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_DEMAND_CHANNEL_STATS,
        payload: { req, siteId },
    };
}

function setDemandChannelStatBySite(data: DemandChannelStat[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_DEMAND_CHANNEL_STATS,
        payload: data,
    };
}
/** Fetch Demand channel stat by site (Site detail Dashboard) */
function fetchSizeBySite(req: { start_date: string; end_date: string; revenue?: string; compare: boolean; compare_start_date: string; compare_end_date: string }, siteId: string): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_SIZE_STATS,
        payload: { req, siteId },
    };
}

function setSizeBySite(data: SizeStat[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_SIZE_STATS,
        payload: data,
    };
}
/** End Fetch Demand channel stat by site (Site detail Dashboard)*/

/** Fill, Unfill and Unrendered Graph (Site detail dashboard) */
function fetchFillUnfillAndUnrenderedGraph(
    req: {
        start_date: string;
        end_date: string;
    },
    siteId: string,
): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH,
        payload: { req, siteId },
    };
}

function setFillUnfillUnrenderedGraph(data: FillUnfillUnrendered[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH,
        payload: data,
    };
}
/** End Fill, Unfill and Unrendered Graph (Site detail dashboard) */

/** Fetch Date Table (Site detail dashboard) */
function fetchDateTableBySite(req: AdOptimisationReq, siteId: string): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_DATE_TABLE,
        payload: { req, siteId },
    };
}

function setDateTableBySite(data: DateTable[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_DATE_TABLE,
        payload: data,
    };
}
/** End Fetch Date Table (Site detail dashboard)*/

/** fetch fetch and set network table*/
function fetchNetworkTableBySite(data: AdOptimisationReq, siteid: string): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_NETWORK_TABLE,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setNetworkTableBySite(data?: DateTable[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_NETWORK_TABLE,
        payload: data,
    };
}
/**end network table */

/**fetch and set size table */
function fetchSizeTableBySite(data: AdOptimisationReq, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_AD_OPT_SIZE_TABLE,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setSizeTableBySite(data?: DateTable[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_AD_OPT_SIZE_TABLE,
        payload: data,
    };
}
/**end size table */

function setCpmSiteLocal(data?: AdOptimisationReq[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_LOCAL,
        payload: data,
    };
}

//site table data

function fetchAdTable(data: siteTabelData, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_TABLE_DATE,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setAdTable(data?: siteTabelData[]): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_TABLE_DATE,
        payload: data,
    };
}

/** Fetch Request graph by site (Site detail Dashboard) */
function fetchImpaGraphBySite(data: AdOptimisationReq, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SITE_AD_OPT_IMPS_GRAPH_BY_SITE,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setImpaGraphBySite(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SITE_AD_OPT_IMPS_GRAPH_BY_SITE,
        payload: data,
    };
}

// REALTIME PART
/// imp
function fetchPageViewImpressionRealTimes(data: GraphForRealtime, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_PAGEVIEW_IMPRESSION_GRAPH_REALTIME,
        payload: { apiPayload: data, siteid: siteid },
    };
}

function setPageViewImpressionRealTimes(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_PAGEVIEW_IMPRESSION_GRAPH_REALTIME,
        payload: data,
    };
}
////// revreq
function fetchRevenueRequestGraphRealtime(data: GraphForRealtime, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_REVENUE_REQUEST_GRAPH_REALTIME,
        payload: { apiPayload: data, siteid: siteid },
    };
}
function setRevenueRequestGraphRealtime(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_REVENUE_REQUEST_GRAPH_REALTIME,
        payload: data,
    };
}
///// cpm
function fetchCpmGraphRealtime(data: GraphForRealtime, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_CPM_GRAPH_SITE_REALTIME,
        payload: { apiPayload: data, siteid: siteid },
    };
}
function setCpmGraphRealtime(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_CPM_GRAPH_SITE_REALTIME,
        payload: data,
    };
}

///// rpm
function fetchRpmGraphRealtime(data: GraphForRealtime, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_RPM_GRAPH_SITE_REALTIME,
        payload: { apiPayload: data, siteid: siteid },
    };
}
function setRpmGraphRealtime(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_RPM_GRAPH_SITE_REALTIME,
        payload: data,
    };
}

//size
function fetchSizeTableRealtime(data: GraphForRealtime, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_SIZE_TABLE_REALTIME,
        payload: { apiPayload: data, siteid: siteid },
    };
}
function setSizeTableRealtime(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_SIZE_TABLE_REALTIME,
        payload: data,
    };
}
function fetchNetworkTableRealtime(data: GraphForRealtime, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_NETWORK_TABLE_REALTIME,
        payload: { apiPayload: data, siteid: siteid },
    };
}
function setNetworkTableRealtime(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_NETWORK_TABLE_REALTIME,
        payload: data,
    };
}
function fetchPopularPageTableRealtime(data: GraphForRealtime, siteid: any): CommonAction {
    return {
        type: AdOptDashboardTypes.FETCH_POPULAR_PAGE_REALTIME,
        payload: { apiPayload: data, siteid: siteid },
    };
}
function setPopularPageTableRealtime(data?: CPMOrRevenueOrRequestGraphBySite): CommonAction {
    return {
        type: AdOptDashboardTypes.SET_POPULAR_PAGE_REALTIME,
        payload: data,
    };
}



const AdOptDashboardAction = {
    /**Super Admin Dashboard */
    fetchTop12Favorites,
    setTop12Favorites,
    fetchTop12Recents,
    setTop12Recents,
    fetchRevenueGraph,
    setRevenueGraph,
    fetchTopTrends,
    setTopTrends,
    /**End Super Admin Dashboard */

    fetchDemandChannel,
    setDemandChannel,
    fetchAdRequestGraph,
    setAdRequestGraph,
    fetchFillRateGraph,
    setFillRateGraph,
    fetchMonetizedImpsGraph,
    setMonetizedImpsGraph,
    fetchCPMGraph,
    setCPMGraph,
    fetchTopCardAdOpt,
    setTopCardAdOpt,
    fetchTopCardRevenueCPM,
    setTopCardRevenueCPM,
    fetchAllSites,
    setAllSites,

    fetchFavoriteSites,
    setFavoriteSites,
    fetchRecentSites,
    setRecentSites,
    fetchAllSitesOfList,
    setAllSitesOfList,
    setSitesPaginationCount,
    fetchSitesFavUnfav,
    setSitesFavUnfav,

    fetchCpmGraphBySite,
    setCpmGraphBySite,

    setCpmSiteLocal,

    fetchAdTable,
    setAdTable,

    fetchRevenueGraphBySite,
    setRevenueGraphBySite,
    fetchRequestGraphBySite,
    setRequestGraphBySite,
    fetchDemandChannelStatBySite,
    setDemandChannelStatBySite,
    fetchFillUnfillAndUnrenderedGraph,
    setFillUnfillUnrenderedGraph,
    fetchDateTableBySite,
    setDateTableBySite,
    fetchNetworkTableBySite,
    setNetworkTableBySite,
    fetchSizeTableBySite,
    setSizeTableBySite,

    fetchSizeBySite,
    setSizeBySite,

    fetchImpaGraphBySite,
    setImpaGraphBySite,

    //fore realtime fetch
    fetchPageViewImpressionRealTimes,
    setPageViewImpressionRealTimes,
    fetchRevenueRequestGraphRealtime,
    setRevenueRequestGraphRealtime,
    fetchCpmGraphRealtime,
    setCpmGraphRealtime,
    fetchRpmGraphRealtime,
    setRpmGraphRealtime,

    //

    fetchSizeTableRealtime,
    setSizeTableRealtime,
    fetchNetworkTableRealtime,
    setNetworkTableRealtime,
    fetchPopularPageTableRealtime,
    setPopularPageTableRealtime,

};

export default AdOptDashboardAction;
