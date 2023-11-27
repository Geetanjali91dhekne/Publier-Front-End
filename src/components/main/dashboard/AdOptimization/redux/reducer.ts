import { CommonAction } from '../../../../login/redux/types';
import AdOptDashboardTypes, { AdOptDashboardState } from './types';

const AdOptDashboardInitialState: AdOptDashboardState = {
    favorites: [],
    favoriteLoader: false,
    recentLoader: false,
    recents: [],
    topTrends: [],
    topTrendLoading: false,
    revenueGraph: [],
    revenueGraphLoading: false,
    demandChannel: [],
    demandChannelLoading: false,
    adRequestGraph: [],
    adRequestGraphLoading: false,
    fillRateGraph: [],
    fillRateGraphLoading: false,
    monetizedImpsGraph: [],
    sites: [],
    allSitesByDemandPartner: [],
    monetizedImpsGraphLoading: false,
    cpmGraph: [],
    cpmGraphLoading: false,
    allSites: [],
    topAdOptLoader: false,
    topCpmLoader: false,
    favouriteSiteLoader: false,
    recentSiteLoader: false,
    favouriteSite: [],
    recentSite: [],
    allSitesOfList: [],
    allSitesLoading: false,
    count: {
        siteCount: 0,
        fCount: 0,
        rCount: 0,
    },
    FavouriteUnfavourite: undefined,
    FavouriteUnfavouriteLoader: false,
    siteTableData: [],
    siteTableDataLoader: false,
    demandChannelStat: [],
    demandChannelStatLoading: false,
    sizeStat: [],
    sizeStatLoading: false,
    fillUnfillUnrendered: [],
    fillUnfillUnrenderedLoading: false,
    dateTable: [],
    dateTableLoading: false,
    networkTableLoading: false,
    sizeTableLoading: false,
    networkTable: [],
    sizeTable: [],
};

const adOptDashboardReducer = (state = AdOptDashboardInitialState, action: CommonAction): AdOptDashboardState => {
    switch (action.type) {
        case AdOptDashboardTypes.FETCH_TOP_12_AD_OPT_FAVORITES:
            return {
                ...state,
                favorites: [],
                favoriteLoader: true,
            };
        case AdOptDashboardTypes.SET_TOP_12_AD_OPT_FAVORITES:
            return {
                ...state,
                favorites: action.payload,
                favoriteLoader: false,
            };
        case AdOptDashboardTypes.FETCH_TOP_12_AD_OPT_RECENT:
            return {
                ...state,
                recents: [],
                recentLoader: true,
            };
        case AdOptDashboardTypes.SET_TOP_12_AD_OPT_RECENT:
            return {
                ...state,
                recents: action.payload,
                recentLoader: false,
            };
        case AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_SITES:
            return {
                ...state,
                allSitesLoading: true,
                sites: [],
            };
        case AdOptDashboardTypes.SET_SITES_LIST_AD_OPT_ALL_SITES:
            return {
                ...state,
                sites: action.payload,
                allSitesLoading: false,
            };

        case AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_SITES_BY_NETWORK:
            return {
                ...state,
                allSitesLoading: true,
                allSitesByDemandPartner: [],
            };
        case AdOptDashboardTypes.SET_SITES_LIST_AD_OPT_SITES_BY_NETWORK:
            return {
                ...state,
                allSitesByDemandPartner: action.payload,
                allSitesLoading: false,
            };

        case AdOptDashboardTypes.FETCH_AD_OPT_TOP_TREND:
            return {
                ...state,
                topTrends: [],
                topTrendLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_TOP_TREND:
            return {
                ...state,
                topTrends: action.payload,
                topTrendLoading: false,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_REVENUE_GRAPH:
            return {
                ...state,
                revenueGraph: [],
                revenueGraphLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_REVENUE_GRAPH:
            return {
                ...state,
                revenueGraph: action.payload,
                revenueGraphLoading: false,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_DEMAND_CHANNEL:
            return {
                ...state,
                demandChannel: [],
                demandChannelLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_DEMAND_CHANNEL:
            return {
                ...state,
                demandChannel: action.payload,
                demandChannelLoading: false,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_AD_REQUEST_GRAPH:
            return {
                ...state,
                adRequestGraph: [],
                adRequestGraphLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_AD_REQUEST_GRAPH:
            return {
                ...state,
                adRequestGraph: action.payload,
                adRequestGraphLoading: false,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_FILLRATE_GRAPH:
            return {
                ...state,
                fillRateGraph: [],
                fillRateGraphLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_FILLRATE_GRAPH:
            return {
                ...state,
                fillRateGraph: action.payload,
                fillRateGraphLoading: false,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_MONETIZED_IMPS_GRAPH:
            return {
                ...state,
                monetizedImpsGraph: [],
                monetizedImpsGraphLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_MONETIZED_IMPS_GRAPH:
            return {
                ...state,
                monetizedImpsGraph: action.payload,
                monetizedImpsGraphLoading: false,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_CPM_GRAPH:
            return {
                ...state,
                cpmGraph: [],
                cpmGraphLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_CPM_GRAPH:
            return {
                ...state,
                cpmGraph: action.payload,
                cpmGraphLoading: false,
            };
        case AdOptDashboardTypes.FETCH_TOP_CARD_ADOPT:
            return {
                ...state,
                topAdOpt: undefined,
                topAdOptLoader: true,
            };
        case AdOptDashboardTypes.SET_TOP_CARD_ADOPT:
            return {
                ...state,
                topAdOpt: action.payload,
                topAdOptLoader: false,
            };

        case AdOptDashboardTypes.FETCH_TOP_CARD_REVENUE_CPM:
            return {
                ...state,
                topCpm: undefined,
                topCpmLoader: true,
            };
        case AdOptDashboardTypes.SET_TOP_CARD_REVENUE_CPM:
            return {
                ...state,
                topCpm: action.payload,
                topCpmLoader: false,
            };
        case AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_FAVOURITE:
            return {
                ...state,
                favouriteSite: [],
                favouriteSiteLoader: true,
            };
        case AdOptDashboardTypes.SET_SITES_LIST_AD_OPT_FAVOURITE:
            return {
                ...state,
                favouriteSite: action.payload,
                favouriteSiteLoader: false,
            };

        case AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_RECENT:
            return {
                ...state,
                recentSite: [],
                recentLoader: true,
            };
        case AdOptDashboardTypes.SET_SITES_LIST_AD_OPT_RECENT:
            return {
                ...state,
                recentSite: action.payload,
                recentLoader: false,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_All_SITES:
            return {
                ...state,
                allSites: [],
                allSitesLoading: true,
            };
        case AdOptDashboardTypes.SET_AD_OPT_ALL_SITES:
            return {
                ...state,
                allSites: action.payload,
                allSitesLoading: false,
            };
        case AdOptDashboardTypes.SITE_PAGINATION_COUNT:
            return {
                ...state,
                count: action.payload,
            };

        //fav unfav site reducers
        case AdOptDashboardTypes.FETCH_SITES_FAV_UNFAV:
            return {
                ...state,
                FavouriteUnfavourite: undefined,
                FavouriteUnfavouriteLoader: true,
            };
        case AdOptDashboardTypes.SET_SITES_FAV_UNFAV:
            return {
                ...state,
                FavouriteUnfavourite: action.payload,
                FavouriteUnfavouriteLoader: false,
            };
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_CPM_GRAPH_BY_SITE:
            return {
                ...state,
                CpmGraphBySite: undefined,
                CpmGraphBySiteLoader: true,
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_CPM_GRAPH_BY_SITE:
            return {
                ...state,
                CpmGraphBySite: action.payload,
                CpmGraphBySiteLoader: false,
            };
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE:
            return {
                ...state,
                RevenueGraphBySite: undefined,
                RevenueGraphBySiteLoader: true,
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE:
            return {
                ...state,
                RevenueGraphBySite: action.payload,
                RevenueGraphBySiteLoader: false,
            };
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE:
            return {
                ...state,
                RequestGraphBySite: undefined,
                RequestGraphBySiteLoader: true,
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE:
            return {
                ...state,
                RequestGraphBySite: action.payload,
                RequestGraphBySiteLoader: false,
            };

        case AdOptDashboardTypes.SET_SITE_LOCAL:
            return {
                ...state,
                CpmGraphBySite: action.payload,
                CpmGraphBySiteLoader: false,
            };

        //fav unfav site reducers
        case AdOptDashboardTypes.FETCH_SITE_TABLE_DATE:
            return {
                ...state,
                siteTableData: [],
                siteTableDataLoader: true,
            };
        case AdOptDashboardTypes.SET_SITE_TABLE_DATE:
            return {
                ...state,
                siteTableData: action.payload,
                siteTableDataLoader: false,
            };
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_DEMAND_CHANNEL_STATS:
            return {
                ...state,
                demandChannelStatLoading: true,
                demandChannelStat: [],
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_DEMAND_CHANNEL_STATS:
            return {
                ...state,
                demandChannelStatLoading: false,
                demandChannelStat: action.payload,
            };
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_SIZE_STATS:
            return {
                ...state,
                sizeStatLoading: true,
                sizeStat: [],
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_SIZE_STATS:
            return {
                ...state,
                sizeStatLoading: false,
                sizeStat: action.payload,
            };
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH:
            return {
                ...state,
                fillUnfillUnrendered: [],
                fillUnfillUnrenderedLoading: true,
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH:
            return {
                ...state,
                fillUnfillUnrendered: action.payload,
                fillUnfillUnrenderedLoading: false,
            };
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_DATE_TABLE:
            return {
                ...state,
                dateTableLoading: true,
                dateTable: [],
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_DATE_TABLE:
            return {
                ...state,
                dateTableLoading: false,
                dateTable: action.payload,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_NETWORK_TABLE:
            return {
                ...state,
                networkTableLoading: true,
                networkTable: [],
            };
        case AdOptDashboardTypes.SET_AD_OPT_NETWORK_TABLE:
            return {
                ...state,
                networkTableLoading: false,
                networkTable: action.payload,
            };
        case AdOptDashboardTypes.FETCH_AD_OPT_SIZE_TABLE:
            return {
                ...state,
                sizeTableLoading: true,
                sizeTable: [],
            };
        case AdOptDashboardTypes.SET_AD_OPT_SIZE_TABLE:
            return {
                ...state,
                sizeTableLoading: false,
                sizeTable: action.payload,
            };

        //IMPA GRAPH BY SIDTE
        case AdOptDashboardTypes.FETCH_SITE_AD_OPT_IMPS_GRAPH_BY_SITE:
            return {
                ...state,
                ImpsGraphBySite: undefined,
                ImpsGraphBySiteLoader: true,
            };
        case AdOptDashboardTypes.SET_SITE_AD_OPT_IMPS_GRAPH_BY_SITE:
            return {
                ...state,
                ImpsGraphBySite: action.payload,
                ImpsGraphBySiteLoader: false,
            };

        //revreq realtime
        case AdOptDashboardTypes.FETCH_PAGEVIEW_IMPRESSION_GRAPH_REALTIME:
            return {
                ...state,
                pageViewImpressionRealtimeLoader: true,
            };
        case AdOptDashboardTypes.SET_PAGEVIEW_IMPRESSION_GRAPH_REALTIME:
            return {
                ...state,
                pageViewImpressionRealtime: action.payload,
                pageViewImpressionRealtimeLoader: false,
            };
        case AdOptDashboardTypes.FETCH_REVENUE_REQUEST_GRAPH_REALTIME:
            return {
                ...state,
                revReqGraphBySiteRealtimeLoader: true,
            };
        case AdOptDashboardTypes.SET_REVENUE_REQUEST_GRAPH_REALTIME:
            return {
                ...state,
                revReqGraphBySiteRealtime: action.payload,
                revReqGraphBySiteRealtimeLoader: false,
            };
        case AdOptDashboardTypes.FETCH_CPM_GRAPH_SITE_REALTIME:
            return {
                ...state,
                cpmGraphBySiteRealtimeLoader: true,
            };
        case AdOptDashboardTypes.SET_CPM_GRAPH_SITE_REALTIME:
            return {
                ...state,
                cpmGraphBySiteRealtime: action.payload,
                cpmGraphBySiteRealtimeLoader: false,
            };
        case AdOptDashboardTypes.FETCH_RPM_GRAPH_SITE_REALTIME:
            return {
                ...state,
                rpmGraphBySiteRealtimeLoader: true,
            };
        case AdOptDashboardTypes.SET_RPM_GRAPH_SITE_REALTIME:
            return {
                ...state,
                rpmGraphBySiteRealtime: action.payload,
                rpmGraphBySiteRealtimeLoader: false,
            };
        case AdOptDashboardTypes.FETCH_SIZE_TABLE_REALTIME:
            return {
                ...state,
                sizeTableRealtimeLoader: true,
            };
        case AdOptDashboardTypes.SET_SIZE_TABLE_REALTIME:
            return {
                ...state,
                sizeTableRealTime: action.payload,
                sizeTableRealtimeLoader: false,
            };
        case AdOptDashboardTypes.FETCH_NETWORK_TABLE_REALTIME:
            return {
                ...state,
                networkTableRealtimeLoader: true,
            };
        case AdOptDashboardTypes.SET_NETWORK_TABLE_REALTIME:
            return {
                ...state,
                networkTableRealtime: action.payload,
                networkTableRealtimeLoader: false,
            };
        case AdOptDashboardTypes.FETCH_POPULAR_PAGE_REALTIME:
            return {
                ...state,
                popularPageTableRealtimeLoader: true,
            };
        case AdOptDashboardTypes.SET_POPULAR_PAGE_REALTIME:
            return {
                ...state,
                popularPageTableRealtime: action.payload,
                popularPageTableRealtimeLoader: false,
            };

        default:
            return state;
    }
};

export default adOptDashboardReducer;
