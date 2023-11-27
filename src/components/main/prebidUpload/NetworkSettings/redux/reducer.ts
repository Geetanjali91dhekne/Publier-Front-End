import { CommonAction } from "../../../../login/redux/types";
import NetwrokSettingTypes, { NetworkSettingState } from "./types";


const networkSettingInitialState: NetworkSettingState = {
     networkSettingAllNetworks: [],
     networkSettingAllNetworksLoader: false,
     networkSettingAllSites: [],
     networkSettingAllSitesLoader: false,
     networkSettingAllSize: [],
     networkSettingAllSizesLoader: false,
     networkSettingSiteSizeTable: [],
     networkSettingSiteSizeTableLoader: false
};

const networkSettingReducer = (state = networkSettingInitialState, action: CommonAction): NetworkSettingState => {
     switch (action.type) {
          case NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_NETWORK_LIST:
               return {
                    ...state,
                    networkSettingAllNetworks: [],
                    networkSettingAllNetworksLoader: true,
               };
          case NetwrokSettingTypes.SET_NETWORK_SETTING_ALL_NETWORK_LIST:
               return {
                    ...state,
                    networkSettingAllNetworks: action.payload,
                    networkSettingAllNetworksLoader: false,
               };

          case NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_SITES:
               return {
                    ...state,
                    networkSettingAllSites: [],
                    networkSettingAllSitesLoader: true,
               };
          case NetwrokSettingTypes.SET_NETWORK_SETTING_ALL_SITES:
               return {
                    ...state,
                    networkSettingAllSites: action.payload,
                    networkSettingAllSitesLoader: false,
               };

          case NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_SIZES:
               return {
                    ...state,
                    networkSettingAllSize: [],
                    networkSettingAllSizesLoader: true,
               };
          case NetwrokSettingTypes.SET_NETWORK_SETTING_ALL_SIZES:
               return {
                    ...state,
                    networkSettingAllSize: action.payload,
                    networkSettingAllSizesLoader: false,
               };

          case NetwrokSettingTypes.FETCH_NETWORK_SETTING_SITES_SIZE_TABLE:
               return {
                    ...state,
                    networkSettingSiteSizeTable: [],
                    networkSettingSiteSizeTableLoader: true,
               };
          case NetwrokSettingTypes.SET_NETWORK_SETTING_SITES_SIZE_TABLE:
               return {
                    ...state,
                    networkSettingSiteSizeTable: action.payload,
                    networkSettingSiteSizeTableLoader: false,
               };


          default:
               return state;
     }
};

export default networkSettingReducer;
