const PrebidDashboardTypes = {
    //
    FETCH_PREBID_NETWORK_LIST: 'FETCH_PREBID_NETWORK_LIST',
    SET_PREBID_NETWORK_LIST: 'SET_PREBID_NETWORK_LIST',

    FETCH_PREBID_FAILED_DATA: 'FETCH_PREBID_FAILED_DATA',
    SET_PREBID_FAILED_DATA: 'SET_PREBID_FAILED_DATA',
    SET_PREBID_FAILED_TOP_CARD_DATA: 'SET_PREBID_FAILED_TOP_CARD_DATA',
    SET_PREBID_FAILED_FLAG_LIST:'SET_PREBID_FAILED_FLAG_LIST',

    FETCH_PREBID_SITE_AND_SIZE: 'FETCH_PREBID_SITE_AND_SIZE',
    SET_PREBID_DROPDOWN_SITE: 'SET_PREBID_DROPDOWN_SITE',
    SET_PREBID_DROPDOWN_SIZE:'SET_PREBID_DROPDOWN_SIZE'
};
export default PrebidDashboardTypes;

export interface PrebidNetworklist {
    network_name: string;
    id: string;
}

export interface PrebidFailedData {
    id?: any;
    size_name?: number;
    site_name?: number;
    date?: string;
    revenue?: string;
    network_id?: string;
    impressions?: any;
    total_request?: any;
    clicks?: any;
    type?: any;
    status?: 1 | 0;
    isEdit?: boolean;
}

export interface PrebidInsertData {
    id?: number;
    site_name?: string;
    date?: string;
    site_id?: string;
    size_id?: string;
    network_id?: string;
    impressions?: string;
    revenue?: string;
    clicks?: string;
    type?: string;
}

export interface PrebidDashboardState {
    prebidNetworklist: PrebidNetworklist[];
    prebidNetworklistlLoading: boolean;

    prebidFailedData: PrebidFailedData[];
    prebidFailedDatalLoading: boolean;
    prebidFailedTopCardData:any;
    prebidFaildDataFlagList:any;

    prebidDropDownSite:[];
    prebidDropDownSize:[];
    prebidSiteAndSizeLoader:boolean;
}