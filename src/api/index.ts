import api from './apiServices';

/**Login API */
const login = (payload: Object) => api.post(`/api/login`, payload);

/**Ad Optimization Dashboard */

/** Super Admin Dashboard of AdOptimization */

/** Favorites and Recents */
const fetchTop12Favorites = (payload: Object) => api.post(`/api/optimization/favourites`, payload);
const fetchTop12Recents = (payload: Object) => api.post(`/api/optimization/recents`, payload);

/** Fetch Ad Optimizition top card data */
const fetchTopCardAdOptimisation = (payload: Object) => api.post(`/api/optimization/topcard`, payload);
const fetchTopCardAdOptimisationRevenueCPM = (payload: Object) => api.post(`/api/optimization/revenue/topcard`, payload);

/**Fetch All sites */
const fetchAllSites = () => api.get(`/api/optimization/search/site`);

/** Fetch Top Trends */
const fetchTopTrends = (payload: Object) => api.post(`/api/optimization/trend`, payload);

/** Fetch Demand Channel */
const fetchDemandChannel = (payload: Object) => api.post(`/api/optimization/demand/channel`, payload);

/** Fetch Revenue Graph */
const fetchRevenueGraphReq = (payload: Object) => api.post(`/api/optimization/revenue/graph`, payload);

/** Fetch Ad Request Graph */
const fetchAdRequestGraph = (payload: Object) => api.post(`/api/optimization/request/graph`, payload);

/** Fetch Fill Rate Graph */
const fetchFillRateGraph = (payload: Object) => api.post(`/api/optimization/rate/fill/graph`, payload);

/** Fetch Monetized Imps Graph */
const fetchMonetizedImpsGraph = (payload: Object) => api.post(`/api/optimization/imps/graph`, payload);

/** Fetch CPM Graph */
const fetchCPMGraph = (payload: Object) => api.post(`/api/optimization/cpms/graph`, payload);

/** End Super Admin Dashboard of AdOptimization */

/** List of sites AdOptimisation */
/** Fetch Sites */
const fetchSites = (payload: Object, pageNumber: number) => api.post(`/api/optimization/all/sites?page=${pageNumber}`, payload);

/** Fetch Favorites sites */
const fetchFavoriteSites = (payload: Object, pageNumber: number) => api.post(`/api/optimization/favourites/sites?page=${pageNumber}`, payload);

/** Fetch Recent sites */
const fetchRecentSites = (payload: Object) => api.post(`/api/optimization/recents/sites`, payload);

/** Favorites and Unfavorites */
const fetchFavouriteUnfavourite = (payload: Object) => api.post(`/api/optimization/favourite/unfavourite`, payload);
/** List of sites AdOptimisation */

/**Site detail dashboard */
const fetchDemandChannelStat = (payload: Object, siteId: string) => api.post(`/api/optimization/demamd/channel/stats/${siteId}`, payload);
const fetchSizeStat = (payload: Object, siteId: string) => api.post(`/api/optimization/size/stats/${siteId}`, payload);
const fetchFillUnfillAndUnrendered = (payload: Object, siteId: string) => api.post(`/api/optimization/fill/comparison/graph/${siteId}`, payload);
const fetchDateTableBySite = (payload: Object, siteId: string) => api.post(`/api/optimization/date/table/${siteId}`, payload);

// graph data on details page
const fetchCpmGraphBySite = (payload: Object, siteid: string) => api.post(`/api/optimization/cpm/graph/${siteid}`, payload);
const fetchRevenueGraphBySite = (payload: Object, siteid: string) => api.post(`/api/optimization/revenue/graph/${siteid}`, payload);
const fetchRequestGraphBySite = (payload: Object, siteid: string) => api.post(`/api/optimization/request/graph/${siteid}`, payload);
const fetchNetworkSiteTable = (payload: Object, siteid: string) => api.post(`/api/optimization/networks/table/${siteid}`, payload);
const fetchSizeTable = (payload: Object, siteid: string) => api.post(`/api/optimization/sizes/table/${siteid}`, payload);

//details page table data
const fetchSiteTable = (payload: Object, siteid: string) => api.post(`/api/optimization/date/table/${siteid}`, payload);
//export dashboard table xlsx
const fetchExportTable = (payload: Object, siteid: string) => api.post(`/api/optimization/export/table/${siteid}`, payload, { responseType: 'arraybuffer' });
const fetchSitesExportTable = (payload: Object) => api.post(`/api/optimization/export/table`, payload, { responseType: 'arraybuffer' });

// details page impression graph
const fetchImpsGraphBySite = (payload: Object, siteid: string) => api.post(`/api/optimization/imps/graph/${siteid}`, payload);

////// REALTIME API'S
const fetchPageViewImpressionRealTime = (payload: Object, siteid: string) => api.post(`/api/optimization/realtime/pageview/imp/graph/${siteid}`, payload);
const fetchRevenueRequestRealTime = (payload: Object, siteid: string) => api.post(`/api/optimization/realtime/rev/req/graph/${siteid}`, payload);
const fetchCpmGraphRealTime = (payload: Object, siteid: string) => api.post(`/api/optimization/realtime/cpm/graph/${siteid}`, payload);
const fetchRpmGraphRealTime = (payload: Object, siteid: string) => api.post(`/api/optimization/realtime/rpm/graph/${siteid}`, payload);

const fetchSizeTableRealTime = (payload: Object, siteid: string) => api.post(`/api/optimization/realtime/sizes/table/${siteid}`, payload);
const fetchNetworkTableRealTime = (payload: Object, siteid: string) => api.post(`/api/optimization/realtime/networks/table/${siteid}`, payload);
const fetchPopularPageTableRealTime = (payload: Object, siteid: string) => api.post(`/api/optimization/realtime/popularpages/table/${siteid}`, payload);

/// for subscriptions
const fetchSubscriptionTopCardApi = (payload: Object) => api.post(`/api/subscriptions/topcard`, payload);
const fetchSubscriptionWidgetOneApi = (payload: Object) => api.post(`/api/subscriptions/widget1/table`, payload);
const fetchSubscriptionDomainTableApi = (payload: Object) => api.post(`/api/subscriptions/domain/table`, payload);

// for subscriptons graphs and stats
const fetchSubscriptionRevenueGraphApi = (payload: Object) => api.post(`/api/subscriptions/revenue/graph`, payload);
const fetchSubscriptionDomainStats = (payload: Object) => api.post(`/api/subscriptions/domain/stats`, payload);
const fetchSubscriptionCountryStats = (payload: Object) => api.post(`/api/subscriptions/country/stats`, payload);
const fetchSubscriptionActiveGraphApi = (payload: Object) => api.post(`/api/subscriptions/active/graph`, payload);
const fetchSubscriptionNewGraphApi = (payload: Object) => api.post(`/api/subscriptions/new/graph`, payload);
const fetchSubscriptionUnsbscribeGraphApi = (payload: Object) => api.post(`/api/subscriptions/unsubcribes/graph`, payload);
const fetchSubscriptionRpmGraphApi = (payload: Object) => api.post(`/api/subscriptions/rpm/graph`, payload);

//for tables
const fetchCountryTableApi = (payload: Object) => api.post(`/api/subscriptions/countries/table`, payload);
const fetchDeviceTableApi = (payload: Object) => api.post(`/api/subscriptions/devices/table`, payload);
const fetchPageTableApi = (payload: Object) => api.post(`/api/subscriptions/pages/table`, payload);
const fetchSubscriberTableApi = (payload: Object) => api.post(`/api/subscriptions/subscribers/table`, payload);
const fetchsubscriptionDashboardExportTable = (payload: Object) => api.post(`/api/subscriptions/pageview/sub/export/table`, payload);

//subscription by country and device
const fetchSubscriptionByCountryApi = (payload: Object) => api.post(`/api/subscriptions/countries/graph`, payload);
const fetchSubscriptionByDeviceApi = (payload: Object) => api.post(`/api/subscriptions/devices/graph`, payload);
const fetchReasonOfUnSubsApi = (payload: Object) => api.post(`/api/subscriptions/reason/unsub`, payload);

//subscriber list api
const fetchSubscriberListApi = () => api.get(`/api/subscriptions/subscribers/search`);

//subscription log table
const fetchSubscriptionLogTableApi = (payload: Object) => api.post(`/api/subscriptions/subscriber/log/table`, payload);
const fetchSubscriptionExportWidgetTableApi = (payload: Object) => api.post(`/api/subscriptions/widget/export/table`, payload);

//Crowdfunding apis
const fetchCrowdFunTopCardsApi = (payload: Object) => api.post(`/api/crowdfunds/topcard`, payload);
const fetchCrowdFunWidgetTableApi = (payload: Object) => api.post(`/api/crowdfunds/widget/table`, payload);
const fetchCrowdFunEarningGraphApi = (payload: Object) => api.post(`/api/crowdfunds/eranings/graph`, payload);
const fetchCrowdFunDonorGraphApi = (payload: Object) => api.post(`/api/crowdfunds/donors/graph`, payload);
const fetchCrowdFunFundraiserGraphApi = (payload: Object) => api.post(`/api/crowdfunds/fundraiser/graph`, payload);
const fetchCrowdFunEarnByCountryPieApi = (payload: Object) => api.post(`/api/crowdfunds/earning/country/graph`, payload);
const fetchCrowdFunEarnByDevicesPieApi = (payload: Object) => api.post(`/api/crowdfunds/earning/devices/graph`, payload);
const fetchCrowdFunDonorByCountryPieApi = (payload: Object) => api.post(`/api/crowdfunds/donors/country/graph`, payload);
const fetchCrowdFunDonorByDevicesPieApi = (payload: Object) => api.post(`/api/crowdfunds/donors/devices/graph`, payload);
const fetchCrowdFunExportWidgetTableApi = (payload: Object) => api.post(`/api/crowdfunds/widget/export/table`, payload);
const fetchCrowdFunAvgDonationGraphApi = (payload: Object) => api.post(`/api/crowdfunds/average/donation/graph`, payload);
const fetchCrowdFunEcpmGraphApi = (payload: Object) => api.post(`/api/crowdfunds/fund/ecpm/graph`, payload);
const fetchCrowdFunDomainTableApi = (payload: Object) => api.post(`/api/crowdfunds/domain/table`, payload);
const fetchCrowdFunCountryTableApi = (payload: Object) => api.post(`/api/crowdfunds/countries/table`, payload);
const fetchCrowdFunDeviceTableApi = (payload: Object) => api.post(`/api/crowdfunds/devices/table`, payload);
const fetchCrowdFunPagesTableApi = (payload: Object) => api.post(`/api/crowdfunds/pages/table`, payload);
const fetchCrowdFunExportTablesApi = (payload: Object) => api.post(`/api/crowdfunds/fundviews/export/table`, payload);

//Ad block recovery
const fetchAdBlockTopCardsApi = (payload: Object) => api.post(`/api/adblock/topcard`, payload);
const fetchAdBlockPvsGraphApi = (payload: Object) => api.post(`/api/adblock/pageviews/graph`, payload);
const fetchAdBlockPerUserGraphApi = (payload: Object) => api.post('/api/adblock/users/graph', payload);
const fetchAdBlockWidgetTableApi = (payload: Object) => api.post(`/api/adblock/widget/table`, payload);
const fetchAdBlockExportWidgetTableApi = (payload: Object) => api.post(`/api/adblock/widget/export/table`, payload);
const fetchAdBlockCountryTableApi = (payload: Object) => api.post(`/api/adblock/countries/table`, payload);
const fetchAdBlockDeviceTableApi = (payload: Object) => api.post(`/api/adblock/device/table`, payload);
const fetchAdBlockDomainTableApi = (payload: Object) => api.post(`/api/adblock/domain/table`, payload);
const fetchAdBlockTableExportApi = (payload: Object) => api.post(`/api/adblock/pvs/export/table`, payload);
const fetchAdBlockBrowserApi = (payload: Object) => api.post(`/api/adblock/browser/ratio`, payload);
const fetchAdBlockSiteList = () => api.get(`/api/adblock/new/sites`);

//quickshop
const fetchQuickShopTopCardsApi = (payload: Object) => api.post(`/api/quickshop/topcard`, payload);
const fetchQuickShopEarningGraphApi = (payload: Object) => api.post(`/api/quickshop/eranings/graph`, payload);
const fetchQuickShopItemsGraphApi = (payload: Object) => api.post(`/api/quickshop/item/graph`, payload);
const fetchQuickShopTopItemsTableApi = (payload: Object) => api.post(`/api/quickshop/topitems/table`, payload);
const fetchQuickShopExportTopItemsTableApi = (payload: Object) => api.post(`/api/quickshop/topitems/export/table`, payload);
const fetchQuickShopCountryGraphApi = (payload: Object) => api.post('/api/quickshop/country/graph', payload);
const fetchQuickShopPurchaseGraphApi = (payload: Object) => api.post(`/api/quickshop/purchase/graph`, payload);
const fetchQuickShopProductPvsGraphApi = (payload: Object) => api.post(`/api/quickshop/product/graph`, payload);
const fetchQuickShopConversionRatioApi = (payload: Object) => api.post(`/api/quickshop/converstion/graph`, payload);

//SETUP

//setup adblockrecovery
const textTranslate = (text: any, target: any, source: any) => api.post(`https://translation.googleapis.com/language/translate/v2?q=${text}&target=${target}&source=${source}&key=`);
const createPresetAdBlockRecovery = (payload: Object) => api.post(`/api/setup/adblock/create`, payload);
const fetchSetupAdblockAllPresetsApi = (siteId: any) => api.get(`/api/setup/adblock/${siteId}`);
const fetchSetupAdBlockPresetByWididApi = (widId: any) => api.get(`/api/setup/adblock/preset/${widId}`);
const editPresetAdBlockRecovery = (payload: Object, widId: any) => api.post(`/api/setup/adblock/edit/${widId}`, payload);
const setupAdBlockUpdatePresetStatusApi = (payload: Object) => api.post(`/api/setup/adblock/update/status`, payload);
const fetchPresetCompareDataApi = (payload: Object) => api.post(`/api/setup/adblock/compare`, payload);
const deletePresetApi = (widId: string) => api.get(`/api/setup/delete/${widId}`);

/* PreBid Upload */
const fetchPrebidAllNetwork = () => api.get(`/api/prebid/network`);
const fetchPrebidFailedData = (payload: Object) => api.post(`/api/prebid/faileddata`, payload);
const prebidInsertData = (payload: Object) => api.post(`/api/prebid/insertfaileddata`, payload);
const fetchPrebidSiteAndSize = (payload: Object) => api.post(`/api/prebid/networksitessizes`, payload);
const networkUploadCsv = (payload: Object) => api.post(`/api/prebid/insertfaileddatacsv`, payload);
const editNetworkSiteAlias = (payload: Object) => api.post(`/api/networks/editnetworksite`, payload);
const deleteNetworkSiteAlias = (payload: Object) => api.post(`/api/networks/deletenetworksite`, payload);
const editNetworkSizeAlias = (payload: Object) => api.post(`/api/networks/editnetworksize`, payload);
const deleteNetworkSizeAlias = (payload: Object) => api.post(`/api/networks/deletenetworksize`, payload);
const insertNewRowPrebidApi = (payload:Object) => api.post(`/api/prebid/insertnewdatarow`,payload);
const deletePrebidUploadRecords = (payload:Object) => api.post(`/api/prebid/deleteallrecords`,payload);

// netwrok settings
const fetchNetworkSettingAllNetwork = () => api.get(`/api/networks/network`);
const fetchNetworkSettingAllSites = () => api.get(`/api/networks/allsites`);
const fetchNetworkSettingAllSizes = () => api.get(`/api/networks/allsizes`);
const fetchNetworkSettingSitesAndSizeTable = (payload: Object) => api.post(`/api/networks/networksitesandsizes`, payload);
const networkSettingAddSites = (payload: Object) => api.post(`/api/networks/addnetworksite`, payload);
const networkSettingAddSize = (payload: Object) => api.post(`/api/networks/addnetworksize`, payload);

// onboarding apis
const fetchallSiteListOnboardApi = () => api.get(`/api/onboarding/adoptimization/siteslist`);
const fetchpublisherListOnboardApi = () => api.get(`/api/onboarding/adoptimization/publisherlist`);
const fetchprebidListOnboardApi = () => api.get(`/api/onboarding/adoptimization/prebidlist`);
const fetchaccountManagerListOnboardApi = () => api.get(`/api/onboarding/adoptimization/accountlist`);
const fetchallSiteDetailesOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/allsites`, payload);
const fetchallRecentOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/recent`, payload);
const fetchallfavoritesOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/favourites`, payload);
const fetchallArchivesitesOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/archivesites`, payload);
const fetchgetSiteDetailsOnboardApi = (siteId: string) => api.get(`/api/onboarding/adoptimization/site/${siteId}`);
const fetchgetPublisherDetailsOnboardApi = (publisherId: string) => api.get(`/api/onboarding/adoptimization/publisher/${publisherId}`);
const editSiteOnboardApi = (payload: Object, siteID: any) => api.put(`/api/onboarding/adoptimization/site/${siteID}`, payload);
const updateSiteStatusOnboardApi = (payload: Object) => api.put(`api/onboarding/adoptimization/update/status`, payload);
const editPublisherOnboardApi = (payload: Object, publisherId: any) => api.put(`/api/onboarding/adoptimization/publisher/${publisherId}`, payload);
const createNewSiteOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/site/create`, payload);
const createNewPublisherOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/publisher/create`, payload);
const saveAccountManager = (payload: Object) => api.post(`/api/onboarding/adoptimization/assignmanager`, payload);
const createMockupOnboardApi = (payload: Object) => api.post(`/api/onboarding/general/mockup`, payload);
const createBillingOnboardApi = (payload: Object) => api.post(`/api/onboarding/general/billing`, payload);
const editBillingOnbaordApi = (payload: Object, Id?: string) => api.post(`/api/onboarding/general/billing/${Id}`, payload);
const createAgreementOnboardApi = (payload: Object) => api.post(`/api/onboarding/general/agreement`, payload);
const fetchgetGeneralTabDetailsOnboardApi = (siteId: string) => api.get(`/api/onboarding/general/${siteId}`);
const editGeneralMockupOnboardApi = (payload: Object, siteId: string) => api.post(`/api/onboarding/general/mockup/${siteId}`, payload);
const createVettingGuildlinesApi = (payload: Object) => api.post(`/api/onboarding/general/vetting`, payload);
const editVettingGuildlinesApi = (payload: Object, siteId: string) => api.put(`/api/onboarding/general/vetting/${siteId}`, payload);
const editGeneralAgreementOnboardApi = (payload: Object, siteId: string) => api.post(`/api/onboarding/general/agreement/${siteId}`, payload);
const createCustomTaskOnboardApi = (payload: Object) => api.post(`/api/onboarding/general/custom/task`, payload);
const editCustomTaskOnboardApi = (payload: Object, siteId: string) => api.post(`/api/onboarding/general/custom/task/${siteId}`, payload)
const getSendBillingMailOnboardApi = (payload: Object) => api.post(`/api/onboarding/general/billing/mail`,payload);
const getSendMockupMailOnboardApi = (payload: Object) => api.post(`/api/onboarding/general/mockup/mail`,payload);
const createMcmInviteOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/mcminvite`, payload);
const editMcmInviteOnboardApi = (payload: Object, Id: any) => api.put(`/api/onboarding/adoptimization/mcminvite/${Id}`, payload);
const createAdTagOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/adtags/`, payload);
const editAdTagOnboardApi = (payload: Object, Id: any) => api.put(`/api/onboarding/adoptimization/adtags/${Id}`, payload);
const createPrebidOnboardApi = (payload: Object) => api.post(`/api/onboarding/adoptimization/prebid/`, payload);
const editPrebidOnboardApi = (payload: Object, Id: any) => api.put(`/api/onboarding/adoptimization/prebid/${Id}`, payload);



const Apis = {
    login,
    fetchTop12Favorites,
    fetchTop12Recents,
    fetchTopTrends,
    fetchRevenueGraphReq,
    fetchAdRequestGraph,
    fetchDemandChannel,
    fetchFillRateGraph,
    fetchMonetizedImpsGraph,
    fetchCPMGraph,
    fetchSites,
    fetchTopCardAdOptimisation,
    fetchTopCardAdOptimisationRevenueCPM,
    fetchFavoriteSites,
    fetchRecentSites,
    fetchAllSites,
    fetchFavouriteUnfavourite,
    fetchCpmGraphBySite,
    fetchSiteTable,
    fetchRevenueGraphBySite,
    fetchRequestGraphBySite,
    fetchDemandChannelStat,
    fetchSizeStat,
    fetchFillUnfillAndUnrendered,
    fetchDateTableBySite,
    fetchNetworkSiteTable,
    fetchSizeTable,
    fetchExportTable,
    fetchSitesExportTable,
    fetchImpsGraphBySite,
    fetchSizeTableRealTime,

    //realtime
    fetchPageViewImpressionRealTime,
    fetchRevenueRequestRealTime,
    fetchCpmGraphRealTime,
    fetchRpmGraphRealTime,
    fetchNetworkTableRealTime,
    fetchPopularPageTableRealTime,

    // for subscriptions
    fetchSubscriptionTopCardApi,
    fetchSubscriptionWidgetOneApi,
    fetchSubscriptionDomainTableApi,
    fetchSubscriptionRevenueGraphApi,
    fetchSubscriptionDomainStats,
    fetchSubscriptionCountryStats,
    fetchSubscriptionActiveGraphApi,
    fetchSubscriptionNewGraphApi,
    fetchSubscriptionUnsbscribeGraphApi,
    fetchSubscriptionRpmGraphApi,

    //for tables
    fetchCountryTableApi,
    fetchDeviceTableApi,
    fetchPageTableApi,
    fetchSubscriberTableApi,
    fetchsubscriptionDashboardExportTable,

    fetchSubscriptionByCountryApi,
    fetchSubscriptionByDeviceApi,
    fetchReasonOfUnSubsApi,
    fetchSubscriberListApi,
    fetchSubscriptionLogTableApi,
    fetchSubscriptionExportWidgetTableApi,

    //crowdfunging apis
    fetchCrowdFunTopCardsApi,
    fetchCrowdFunWidgetTableApi,
    fetchCrowdFunEarningGraphApi,
    fetchCrowdFunDonorGraphApi,
    fetchCrowdFunFundraiserGraphApi,
    fetchCrowdFunEarnByCountryPieApi,
    fetchCrowdFunEarnByDevicesPieApi,
    fetchCrowdFunDonorByCountryPieApi,
    fetchCrowdFunDonorByDevicesPieApi,
    fetchCrowdFunExportWidgetTableApi,
    fetchCrowdFunAvgDonationGraphApi,
    fetchCrowdFunEcpmGraphApi,
    fetchCrowdFunDomainTableApi,
    fetchCrowdFunCountryTableApi,
    fetchCrowdFunDeviceTableApi,
    fetchCrowdFunPagesTableApi,
    fetchCrowdFunExportTablesApi,

    //ad block recovery apis
    fetchAdBlockTopCardsApi,
    fetchAdBlockPvsGraphApi,
    fetchAdBlockPerUserGraphApi,
    fetchAdBlockWidgetTableApi,
    fetchAdBlockExportWidgetTableApi,
    fetchAdBlockCountryTableApi,
    fetchAdBlockDeviceTableApi,
    fetchAdBlockDomainTableApi,
    fetchAdBlockTableExportApi,
    fetchAdBlockBrowserApi,
    fetchAdBlockSiteList,

    //quickshop apis
    fetchQuickShopTopCardsApi,
    fetchQuickShopEarningGraphApi,
    fetchQuickShopItemsGraphApi,
    fetchQuickShopTopItemsTableApi,
    fetchQuickShopExportTopItemsTableApi,
    fetchQuickShopCountryGraphApi,
    fetchQuickShopPurchaseGraphApi,
    fetchQuickShopProductPvsGraphApi,
    fetchQuickShopConversionRatioApi,

    //setup adblock recovery
    textTranslate,
    createPresetAdBlockRecovery,
    fetchSetupAdblockAllPresetsApi,
    fetchSetupAdBlockPresetByWididApi,
    editPresetAdBlockRecovery,
    setupAdBlockUpdatePresetStatusApi,
    fetchPresetCompareDataApi,
    deletePresetApi,

    //prebid upload
    fetchPrebidAllNetwork,
    fetchPrebidFailedData,
    prebidInsertData,
    fetchPrebidSiteAndSize,
    networkUploadCsv,
    editNetworkSiteAlias,
    deleteNetworkSiteAlias,
    editNetworkSizeAlias,
    deleteNetworkSizeAlias,
    insertNewRowPrebidApi,
    deletePrebidUploadRecords,

    //network settings
    fetchNetworkSettingAllNetwork,
    fetchNetworkSettingAllSites,
    fetchNetworkSettingAllSizes,
    fetchNetworkSettingSitesAndSizeTable,
    networkSettingAddSites,
    networkSettingAddSize,

    //onboarding api
    fetchallSiteListOnboardApi,
    fetchpublisherListOnboardApi,
    fetchprebidListOnboardApi,
    fetchaccountManagerListOnboardApi,
    fetchallSiteDetailesOnboardApi,
    fetchallRecentOnboardApi,
    fetchallfavoritesOnboardApi,
    fetchallArchivesitesOnboardApi,
    fetchgetSiteDetailsOnboardApi,
    fetchgetPublisherDetailsOnboardApi,
    editSiteOnboardApi,
    updateSiteStatusOnboardApi,
    editPublisherOnboardApi,
    createNewSiteOnboardApi,
    createNewPublisherOnboardApi,
    saveAccountManager,
    createMockupOnboardApi,
    createBillingOnboardApi,
    createAgreementOnboardApi,
    fetchgetGeneralTabDetailsOnboardApi,
    editGeneralMockupOnboardApi,
    createVettingGuildlinesApi,
    editVettingGuildlinesApi,
    editBillingOnbaordApi,
    editGeneralAgreementOnboardApi,
    createCustomTaskOnboardApi,
    editCustomTaskOnboardApi,
    getSendBillingMailOnboardApi,
    getSendMockupMailOnboardApi,
    createMcmInviteOnboardApi,
    editMcmInviteOnboardApi,
    createAdTagOnboardApi,
    editAdTagOnboardApi,
    createPrebidOnboardApi,
    editPrebidOnboardApi,
    
};

export default Apis;
