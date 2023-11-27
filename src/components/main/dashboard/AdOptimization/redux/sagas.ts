import { call, put, select, takeLatest } from 'redux-saga/effects';
import Apis from '../../../../../api';
import { RootState } from '../../../../../store/RootReducer';
import { CommonAction } from '../../../../login/redux/types';
import LoginActions from '../../../../login/redux/actions';

import AdOptDashboardUtils from '../utils';
import AdOptDashboardAction from './actions';
import AdOptDashboardTypes, { AdOptDashboardState, FavoriteOrRecent } from './types';
import { OnboardingStates } from '../../../onboarding/redux/types';
import OnboardActions from '../../../onboarding/redux/actions';

const adOptDashboard = (state: RootState) => state.adOptDashboard;
const onboarding = (state: RootState) => state.onboarding;

/** Super Admin Dashboard of AdOptimization */

/**Fetch Top 12 Favorites */
const fetchTop12FavoritesReq = function* fetchTop12FavoritesReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchTop12Favorites, payload);
        yield put(AdOptDashboardAction.setTop12Favorites(data?.favouriteData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setTop12Favorites([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/**Fetch Top 12 Recents */
const fetchTop12RecentsReq = function* fetchTop12RecentsReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchTop12Recents, payload);
        yield put(AdOptDashboardAction.setTop12Recents(data?.recentData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setTop12Recents([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Adoptimisation Top Card */
/** Fetch Top Card (Monetized Imps, Ad request, FillRate) */
const fetchTopCardAdOptReq = function* fetchTopCardAdOptReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchTopCardAdOptimisation, payload);
        yield put(AdOptDashboardAction.setTopCardAdOpt(data));
    } catch (err) {
        yield put(AdOptDashboardAction.setTopCardAdOpt(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
/** Fetch Top Card (Revenue, CPM) */
const fetchTopCardRevenueCpmReq = function* fetchTopCardRevenueCpmReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchTopCardAdOptimisationRevenueCPM, payload);
        yield put(AdOptDashboardAction.setTopCardRevenueCPM(data));
    } catch (err) {
        yield put(AdOptDashboardAction.setTopCardRevenueCPM(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
/** AdOptimisation Top Card End */

/** Fetch Top Trend */
const fetchTopTrendReq = function* fetchTopTrendReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchTopTrends, payload);
        yield put(AdOptDashboardAction.setTopTrends(data?.topTrendsData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setTopTrends([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/**Fetch Revenue Graph */
const fetchRevenueGraphReq = function* fetchRevenueGraphReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchRevenueGraphReq, payload);
        const graphData = AdOptDashboardUtils.parseRevenueGraphData(data?.data);
        yield put(AdOptDashboardAction.setRevenueGraph(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setRevenueGraph([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch Demand channels */
const fetchDemandChannelReq = function* fetchDemandChannelReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchDemandChannel, payload);
        yield put(AdOptDashboardAction.setDemandChannel(data?.demandchannel || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setDemandChannel([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch Ad Request graph */
const fetchAdRequestGraphReq = function* fetchAdRequestGraphReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchAdRequestGraph, payload);
        const graphData = AdOptDashboardUtils.parseAdRequestGraphData(data?.data);
        yield put(AdOptDashboardAction.setAdRequestGraph(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setAdRequestGraph([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch Fill Rate Graph */
const fetchFillRateGraphReq = function* fetchFillRateGraphReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchFillRateGraph, payload);
        const graphData = AdOptDashboardUtils.parseFillrateGraphData(data?.data);
        yield put(AdOptDashboardAction.setFillRateGraph(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setFillRateGraph([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch Monetized IMPS Graph */
const fetchMonetizedImpsGraphReq = function* fetchMonetizedImpsGraphReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchMonetizedImpsGraph, payload);
        const graphData = AdOptDashboardUtils.parseMonetizedImpsGraphData(data?.data);
        yield put(AdOptDashboardAction.setMonetizedImpsGraph(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setMonetizedImpsGraph([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch CPM Graph */
const fetchCPMGraphReq = function* fetchMonetizedImpsGraphReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchCPMGraph, payload);
        const graphData = AdOptDashboardUtils.parseCPMGraphData(data?.data);
        yield put(AdOptDashboardAction.setCPMGraph(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setCPMGraph([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch All Sites */
const fetchAllSitesReq = function* fetchAllSitesReq() {
    try {
        const { data } = yield call(Apis.fetchAllSites);
        yield put(AdOptDashboardAction.setAllSites(data?.sitesData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setAllSites([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
/** End Super Admin Dashboard of AdOptimization */

/** Sites List of Dashbord AdOptimisation */

/**Fetch All sites */
const fetchListOfSitesAllSitesReq = function* fetchListOfSitesAllSitesReq(action: CommonAction) {
    try {
        const { adOptReq, pageNumber } = action.payload;
        const { data } = yield call(Apis.fetchSites, adOptReq, pageNumber);
        yield put(AdOptDashboardAction.setAllSitesOfList(data?.sitesData?.data || []));
        const adOptDashboardState: AdOptDashboardState = yield select(adOptDashboard);
        const count = adOptDashboardState.count;
        yield put(
            AdOptDashboardAction.setSitesPaginationCount({
                ...count,
                siteCount: data?.sitesData?.total || 0,
            }),
        );
    } catch (err) {
        yield put(AdOptDashboardAction.setAllSitesOfList([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch favorites sites */
const fetchFavoriteSitesReq = function* fetchFavoriteSitesReq(action: CommonAction) {
    try {
        const { adOptReq, pageNumber } = action.payload;
        const { data } = yield call(Apis.fetchFavoriteSites, adOptReq, pageNumber);
        yield put(AdOptDashboardAction.setFavoriteSites(data?.favouriteSitesData || []));
        const adOptDashboardState: AdOptDashboardState = yield select(adOptDashboard);
        const count = adOptDashboardState.count;
        yield put(
            AdOptDashboardAction.setSitesPaginationCount({
                ...count,
                fCount: data?.favouriteSitesData?.total || 0,
            }),
        );
    } catch (err) {
        yield put(AdOptDashboardAction.setFavoriteSites([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch recent sites */
const fetchRecentSitesReq = function* fetchRecentSitesReq(action: CommonAction) {
    try {
        const payload = action.payload;
        const { data } = yield call(Apis.fetchRecentSites, payload);
        yield put(AdOptDashboardAction.setRecentSites(data?.recentSitesData || []));
        const adOptDashboardState: AdOptDashboardState = yield select(adOptDashboard);
        const count = adOptDashboardState.count;
        yield put(
            AdOptDashboardAction.setSitesPaginationCount({
                ...count,
                rCount: data?.recentSitesData?.length || 0,
            }),
        );
    } catch (err) {
        yield put(AdOptDashboardAction.setRecentSites([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch Favorites Unfavorites sites */
const fetchSitesFavUnfaveReq = function* fetchSitesFavUnfaveReq(action: CommonAction) {
    try {
        const { apiPayload, activetab } = action.payload;

        const { data } = yield call(Apis.fetchFavouriteUnfavourite, apiPayload);
        yield put(AdOptDashboardAction.setSitesFavUnfav(data || []));

        const adOptDashboardState: AdOptDashboardState = yield select(adOptDashboard);
        const onboardingState: OnboardingStates = yield select(onboarding);

        if (activetab === 'DashBoard') {
            const DashList = adOptDashboardState.allSites;
            const index = DashList.findIndex((d) => d.site_id === apiPayload.site_id);
            if (index !== -1) {
                DashList[index].favourite = apiPayload.favourite_flag;
            }
            yield put(AdOptDashboardAction.setAllSites(DashList));
        }

        if (activetab !== 'favorites') {
            let list = adOptDashboardState.favouriteSite;
            let nlist: FavoriteOrRecent[] = [];
            if (apiPayload.favourite_flag === 0) {
                const index = list.findIndex((d) => d.site_id === apiPayload.site_id);
                if (index !== -1) {
                    nlist = list.filter((item: any, id: any) => id !== index);
                }
            } else {
                const index = list.findIndex((d) => d.site_id === apiPayload.site_id);
                const list1 = activetab === 'all' ? adOptDashboardState.sites : adOptDashboardState.recentSite;
                if (index === -1) {
                    let data = list1.find((a) => a.site_id === apiPayload.site_id);
                    if (data) {
                        data.favourite = 1;
                        nlist = list;
                        nlist.push(data);
                    }
                }
            }
            yield put(AdOptDashboardAction.setFavoriteSites(nlist));
        }

        if (activetab === 'all') {
            const list = adOptDashboardState.sites;
            const index = list.findIndex((d) => d.site_id === apiPayload.site_id);
            if (index !== -1) {
                list[index].favourite = apiPayload.favourite_flag;
            }
            yield put(AdOptDashboardAction.setAllSites(list));
        }
        if (activetab === 'recent') {
            const list = adOptDashboardState.recentSite;
            const index = list.findIndex((d) => d.site_id === apiPayload.site_id);

            if (index !== -1) {
                list[index].favourite = apiPayload.favourite_flag;
            }
            yield put(AdOptDashboardAction.setRecentSites(list));
        }

        if (activetab === 'favorites') {
            let list = adOptDashboardState.favouriteSite;
            const index = list.findIndex((d) => d.site_id === apiPayload.site_id);
            let nlist: FavoriteOrRecent[] = [];
            if (index !== -1) {
                nlist = list.filter((item: any, id: any) => id !== index);
            }
            let all_site_list = adOptDashboardState.sites;
            const all_site_index = all_site_list.findIndex((d) => d.site_id === apiPayload.site_id);
            if (all_site_index !== -1) {
                all_site_list[all_site_index].favourite = apiPayload.favourite_flag;
            }
            let recent_site_list = adOptDashboardState.recentSite;
            const recent_site_index = recent_site_list.findIndex((d) => d.site_id === apiPayload.site_id);
            if (recent_site_index !== -1) {
                recent_site_list[recent_site_index].favourite = apiPayload.favourite_flag;
            }
            yield put(AdOptDashboardAction.setFavoriteSites(nlist));
            yield put(AdOptDashboardAction.setAllSites(all_site_list));
            yield put(AdOptDashboardAction.setRecentSites(recent_site_list));
        }

        if (activetab === 'favouriteDash') {
            let list = adOptDashboardState.favorites;
            const index = list.findIndex((d) => d.site_id === apiPayload.site_id);
            let nlist: FavoriteOrRecent[] = [];
            if (index !== -1) {
                nlist = list.filter((item: any, id: any) => id !== index);
            }
            let recent_list = adOptDashboardState.recents;
            const recent_index = recent_list.findIndex((d) => d.site_id === apiPayload.site_id);
            if (recent_index !== -1) {
                recent_list[recent_index].favourite = apiPayload.favourite_flag;
            }
            yield put(AdOptDashboardAction.setTop12Favorites(nlist));
            yield put(AdOptDashboardAction.setTop12Recents(recent_list));
        }
        if (activetab === 'recentDash') {
            let list = adOptDashboardState.recents;
            const index = list.findIndex((d) => d.site_id === apiPayload.site_id);
            let flist = adOptDashboardState.favorites;
            const findex = flist.findIndex((d) => d.site_id === apiPayload.site_id);
            if (index !== -1) {
                list[index].favourite = apiPayload.favourite_flag;
            }
            if (findex !== -1) {
                flist.splice(findex, 1);
            } else {
                flist.push(list[index]);
            }
            yield put(AdOptDashboardAction.setTop12Favorites(flist));
            yield put(AdOptDashboardAction.setTop12Recents(list));
        }

        if (activetab === 'onboardingSite') {
            const list = onboardingState?.onboardingAllSiteTable;
            const index = list.findIndex((d: any) => d.site_id === apiPayload.site_id);
            if (index !== -1) {
                list[index].favourite = apiPayload.favourite_flag;
            }
            yield put(OnboardActions.setOnboardAllSiteTableData(list));
        }
        if (activetab === 'onboardingRecent') {
            const list = onboardingState?.onboardingRecentTable;
            const index = list.findIndex((d: any) => d.site_id === apiPayload.site_id);
            if (index !== -1) {
                list[index].favourite = apiPayload.favourite_flag;
            }
            yield put(OnboardActions.setOnboardRecentTableData(list));
        }
        if (activetab === 'onboardingArchive') {
            const list = onboardingState?.onboardingArchiveTable;
            const index = list.findIndex((d: any) => d.site_id === apiPayload.site_id);
            if (index !== -1) {
                list[index].favourite = apiPayload.favourite_flag;
            }
            yield put(OnboardActions.setOnboardArchivesTableData(list));
        }
        if (activetab === 'onboardingFavorites') {
            let list = onboardingState?.onboardingFavoritesTable;
            const index = list.findIndex((d: any) => d.site_id === apiPayload.site_id);
            if (index !== -1) {
                //list[index].favourite = apiPayload.favourite_flag;
                list.splice(index, 1);
            }
            yield put(OnboardActions.setOnboardFavoritesTableData([...list]));
        }
    } catch (err) {
        yield put(AdOptDashboardAction.setSitesFavUnfav([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/**End Sites List of Dashbord AdOptimisation */

/** Site Detail Dashboard AdOptimisation */

/** CPM Grapth by Site */
const fetchCPMGraphBySiteReq = function* fetchCPMGraphBySiteReq(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchCpmGraphBySite, apiPayload, siteid);
        const graphData = AdOptDashboardUtils.parseCPMGraphBySite(data);
        yield put(AdOptDashboardAction.setCpmGraphBySite(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setCpmGraphBySite(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Revenue Grapth by Site */
const fetchRevenueGraphBySiteReq = function* fetchRevenueGraphBySiteReq(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchRevenueGraphBySite, apiPayload, siteid);
        const graphData = AdOptDashboardUtils.parseRevenueGraphBySite(data);

        yield put(AdOptDashboardAction.setRevenueGraphBySite(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setRevenueGraphBySite(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchImpsGraphBySiteReq = function* fetchImpsGraphBySiteReq(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchImpsGraphBySite, apiPayload, siteid);
        const graphData = AdOptDashboardUtils.parseImpsGraphBySite(data);
        yield put(AdOptDashboardAction.setImpaGraphBySite(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setImpaGraphBySite(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Request Grapth by Site */
const fetchRequestGraphBySitesReq = function* fetchRequestGraphBySitesReq(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchRequestGraphBySite, apiPayload, siteid);
        const graphData = AdOptDashboardUtils.parseRequestGraphBySite(data);
        yield put(AdOptDashboardAction.setRequestGraphBySite(graphData));
    } catch (err) {
        yield put(AdOptDashboardAction.setRequestGraphBySite(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/**Demand channel stat by site */
const fetchDemandChannelStatBySiteReq = function* fetchDemandChannelStatBySiteReq(action: CommonAction) {
    try {
        const { req, siteId } = action.payload;
        const { data } = yield call(Apis.fetchDemandChannelStat, req, siteId);
        yield put(AdOptDashboardAction.setDemandChannelStatBySite(data?.addemandChannelStatsData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setDemandChannelStatBySite([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchSizeStatBySiteReq = function* fetchSizeStatBySiteReq(action: CommonAction) {
    try {
        const { req, siteId } = action.payload;
        const { data } = yield call(Apis.fetchSizeStat, req, siteId);
        yield put(AdOptDashboardAction.setSizeBySite(data?.adSizesStatsData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setSizeBySite([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/**Fill, Unfill and Unrendered graph by site */
const fetchFillUnfillandUnrenderedGraphReq = function* fetchFillUnfillandUnrenderedGraphReq(action: CommonAction) {
    try {
        const { req, siteId } = action.payload;
        const { data } = yield call(Apis.fetchFillUnfillAndUnrendered, req, siteId);
        const graph = AdOptDashboardUtils.parseFillUnfillUnrenderedGraphBySite(data);
        yield put(AdOptDashboardAction.setFillUnfillUnrenderedGraph(graph || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setFillUnfillUnrenderedGraph([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

/** Fetch date table by site */
const fetchDateTableBySiteReq = function* fetchDateTableBySiteReq(action: CommonAction) {
    try {
        const { req, siteId } = action.payload;
        const { data } = yield call(Apis.fetchDateTableBySite, req, siteId);
        yield put(AdOptDashboardAction.setDateTableBySite(data?.adDateData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setDateTableBySite([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
/**fetch network table by site */
const fetchNetworkTableBySiteReq = function* fetchNetworkTableBySiteReq(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchNetworkSiteTable, apiPayload, siteid);
        yield put(AdOptDashboardAction.setNetworkTableBySite(data?.adNetworkData || []));
    } catch (error) {
        yield put(AdOptDashboardAction.setNetworkTableBySite([]));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchSizeTableBySite = function* fetchSizeTableBySite(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchSizeTable, apiPayload, siteid);
        yield put(AdOptDashboardAction.setSizeTableBySite(data?.adSizeData || []));
    } catch (error) {
        yield put(AdOptDashboardAction.setSizeTableBySite([]));
        yield put(LoginActions.forbiddenTokenIssue(error || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

const fetchSiteDateTable = function* fetchSiteDateTable(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchSiteTable, apiPayload, siteid);
        yield put(AdOptDashboardAction.setAdTable(data?.adDateData?.data || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setAdTable([]));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

// for realtime api actions
const fetchPageViewImpressionRealTimes = function* fetchPageViewImpressionRealTimes(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchPageViewImpressionRealTime, apiPayload, siteid);
        yield put(AdOptDashboardAction.setPageViewImpressionRealTimes(data?.data || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setPageViewImpressionRealTimes(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchRevReqGraphRealTimes = function* fetchRevReqGraphRealTimes(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchRevenueRequestRealTime, apiPayload, siteid);
        yield put(AdOptDashboardAction.setRevenueRequestGraphRealtime(data?.data || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setRevenueRequestGraphRealtime(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchCpmGraphRealTimes = function* fetchCpmGraphRealTimes(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchCpmGraphRealTime, apiPayload, siteid);
        yield put(AdOptDashboardAction.setCpmGraphRealtime(data?.data || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setCpmGraphRealtime(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchRpmGraphRealTimes = function* fetchRpmGraphRealTimes(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchRpmGraphRealTime, apiPayload, siteid);
        yield put(AdOptDashboardAction.setRpmGraphRealtime(data?.data || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setRpmGraphRealtime(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchSizeTableRealTimes = function* fetchSizeTableRealTimes(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchSizeTableRealTime, apiPayload, siteid);
        yield put(AdOptDashboardAction.setSizeTableRealtime(data?.sizeData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setSizeTableRealtime(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchNetworkTableRealTimes = function* fetchNetworkTableRealTimes(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchNetworkTableRealTime, apiPayload, siteid);
        yield put(AdOptDashboardAction.setNetworkTableRealtime(data?.networkData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setNetworkTableRealtime(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
const fetchPopularPageTableRealTimes = function* fetchPopularPageTableRealTimes(action: CommonAction) {
    try {
        const { apiPayload, siteid } = action.payload;
        const { data } = yield call(Apis.fetchPopularPageTableRealTime, apiPayload, siteid);
        yield put(AdOptDashboardAction.setPopularPageTableRealtime(data?.popularPagesData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setPopularPageTableRealtime(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};
// FETCH_SITES_LIST_AD_OPT_SITES_BY_NETWORK
const fetchSitesTableByNetwork = function* fetchSitesTableByNetwork(action: CommonAction) {
    try {
        const { apiPayload, networkid } = action.payload;
        const { data } = yield call(Apis.fetchSitesTableByNetwork, apiPayload, networkid);
        yield put(AdOptDashboardAction.setSitesTableByNetwork(data?.sitesData || []));
    } catch (err) {
        yield put(AdOptDashboardAction.setSitesTableByNetwork(undefined));
        yield put(LoginActions.forbiddenTokenIssue(err || '')); // TODO If Token Expires we are redirecting to Login page...
    }
};

export default function* sagas() {
    /**Super Admin Dashboard */
    yield takeLatest(AdOptDashboardTypes.FETCH_TOP_12_AD_OPT_FAVORITES, fetchTop12FavoritesReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_TOP_12_AD_OPT_RECENT, fetchTop12RecentsReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_TOP_TREND, fetchTopTrendReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_REVENUE_GRAPH, fetchRevenueGraphReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_DEMAND_CHANNEL, fetchDemandChannelReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_AD_REQUEST_GRAPH, fetchAdRequestGraphReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_FILLRATE_GRAPH, fetchFillRateGraphReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_MONETIZED_IMPS_GRAPH, fetchMonetizedImpsGraphReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_CPM_GRAPH, fetchCPMGraphReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_TOP_CARD_ADOPT, fetchTopCardAdOptReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_TOP_CARD_REVENUE_CPM, fetchTopCardRevenueCpmReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_All_SITES, fetchAllSitesReq);
    /**End Super Admin Dashboard */
    /** List of sites Ad Optimisation */
    yield takeLatest(AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_SITES, fetchListOfSitesAllSitesReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_FAVOURITE, fetchFavoriteSitesReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_RECENT, fetchRecentSitesReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITES_FAV_UNFAV, fetchSitesFavUnfaveReq);
    /** End List of sites Ad Optimisation */
    /** Site detail dashboard Ad Optimisation */
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_CPM_GRAPH_BY_SITE, fetchCPMGraphBySiteReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_REVENUE_GRAPH_BY_SITE, fetchRevenueGraphBySiteReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_REQUEST_GRAPH_BY_SITE, fetchRequestGraphBySitesReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_DEMAND_CHANNEL_STATS, fetchDemandChannelStatBySiteReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_SIZE_STATS, fetchSizeStatBySiteReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_FILL_UNFILL_LINE_GRAPH, fetchFillUnfillandUnrenderedGraphReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_DATE_TABLE, fetchDateTableBySiteReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_NETWORK_TABLE, fetchNetworkTableBySiteReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_AD_OPT_SIZE_TABLE, fetchSizeTableBySite);

    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_TABLE_DATE, fetchSiteDateTable);
    yield takeLatest(AdOptDashboardTypes.FETCH_SITE_AD_OPT_IMPS_GRAPH_BY_SITE, fetchImpsGraphBySiteReq);
    yield takeLatest(AdOptDashboardTypes.FETCH_PAGEVIEW_IMPRESSION_GRAPH_REALTIME, fetchPageViewImpressionRealTimes);
    yield takeLatest(AdOptDashboardTypes.FETCH_REVENUE_REQUEST_GRAPH_REALTIME, fetchRevReqGraphRealTimes);
    yield takeLatest(AdOptDashboardTypes.FETCH_CPM_GRAPH_SITE_REALTIME, fetchCpmGraphRealTimes);
    yield takeLatest(AdOptDashboardTypes.FETCH_RPM_GRAPH_SITE_REALTIME, fetchRpmGraphRealTimes);
    //
    yield takeLatest(AdOptDashboardTypes.FETCH_SIZE_TABLE_REALTIME, fetchSizeTableRealTimes);
    yield takeLatest(AdOptDashboardTypes.FETCH_NETWORK_TABLE_REALTIME, fetchNetworkTableRealTimes);
    yield takeLatest(AdOptDashboardTypes.FETCH_POPULAR_PAGE_REALTIME, fetchPopularPageTableRealTimes);

    // For Demand Partners
    yield takeLatest(AdOptDashboardTypes.FETCH_SITES_LIST_AD_OPT_SITES_BY_NETWORK, fetchSitesTableByNetwork);
}
