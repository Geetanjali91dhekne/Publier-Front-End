const NetwrokSettingTypes = {
     FETCH_NETWORK_SETTING_ALL_NETWORK_LIST: 'FETCH_NETWORK_SETTING_ALL_NETWORK_LIST',
     SET_NETWORK_SETTING_ALL_NETWORK_LIST: 'SET_NETWORK_SETTING_ALL_NETWORK_LIST',

     FETCH_NETWORK_SETTING_ALL_SITES: 'FETCH_NETWORK_SETTING_ALL_SITES',
     SET_NETWORK_SETTING_ALL_SITES: 'SET_NETWORK_SETTING_ALL_SITES',

     FETCH_NETWORK_SETTING_ALL_SIZES: 'FETCH_NETWORK_SETTING_ALL_SIZES',
     SET_NETWORK_SETTING_ALL_SIZES: 'SET_NETWORK_SETTING_ALL_SIZES',

     FETCH_NETWORK_SETTING_SITES_SIZE_TABLE: 'FETCH_NETWORK_SETTING_SITES_SIZE_TABLE',
     SET_NETWORK_SETTING_SITES_SIZE_TABLE: 'SET_NETWORK_SETTING_SITES_SIZE_TABLE',

};
export default NetwrokSettingTypes;

export interface networkSettingGetData{
     id?:any;
     network_name?:any;
     dimensions?:any;
     size_name?:any;
}

export interface NetworkSettingState {
     networkSettingAllNetworks: networkSettingGetData[];
     networkSettingAllNetworksLoader: boolean;

     networkSettingAllSites: [];
     networkSettingAllSitesLoader: boolean;

     networkSettingAllSize:[];
     networkSettingAllSizesLoader:boolean,

     networkSettingSiteSizeTable:any;
     networkSettingSiteSizeTableLoader:boolean,
}