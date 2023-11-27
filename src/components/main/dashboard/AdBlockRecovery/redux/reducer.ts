import { CommonAction } from '../../../../login/redux/types';
import AdBlockDashboardTypes, { AdBlockDashboardStates } from './types';
const AdBlockInitialState: AdBlockDashboardStates = {
     adBlockPvsGraphData: [],
     adBlockPvsGraphLoader: false,
     adBlockWidgetTable: [],
     adBlockWidgetTableLoader: false,
     adBlockPerUserGraphData: [],
     adBlockPerUserGraphDataLoader: false,
     adBlockCountryTable: [],
     adBlockCountryTableLoader: false,
     adBlockDeviceTable: [],
     adBlockDeviceTableLoader: false,
     adBlockDomainTable: undefined,
     adBlockDomainTableLoader: false,
     adBlockBrowserData: undefined,
     adBlockBrowserDataLoader: false,
     adblockSiteList: [],
     adBlockSiteListLoader: false
}

const adBlockDashboardReducer = (state = AdBlockInitialState, action: CommonAction): AdBlockDashboardStates => {
     switch (action.type) {
          case AdBlockDashboardTypes.FETCH_ADBLOCK_TOP_CARD:
               return {
                    ...state,
                    adBlockTopCardsLoader: true,
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_TOP_CARD:
               return {
                    ...state,
                    adBlockTopCards: action.payload,
                    adBlockTopCardsLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_PVS_GRAPH:
               return {
                    ...state,
                    adBlockPvsGraphLoader: true,
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_PVS_GRAPH:
               return {
                    ...state,
                    adBlockPvsGraphData: action.payload,
                    adBlockPvsGraphLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_WIDGET_TABLE:
               return {
                    ...state,
                    adBlockWidgetTableLoader: true,
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_WIDGET_TABLE:
               return {
                    ...state,
                    adBlockWidgetTable: action.payload,
                    adBlockWidgetTableLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_PERUSER_GRAPH:
               return {
                    ...state,
                    adBlockPerUserGraphDataLoader: true,
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_PERUSER_GRAPH:
               return {
                    ...state,
                    adBlockPerUserGraphData: action.payload,
                    adBlockPerUserGraphDataLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_COUNTRY_TABLE:
               return {
                    ...state,
                    adBlockCountryTableLoader: true,
                    adBlockCountryTable:[],
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_COUNTRY_TABLE:
               return {
                    ...state,
                    adBlockCountryTable: action.payload,
                    adBlockCountryTableLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_DEVICE_TABLE:
               return {
                    ...state,
                    adBlockDeviceTableLoader: true,
                    adBlockDeviceTable:[],
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_DEVICE_TABLE:
               return {
                    ...state,
                    adBlockDeviceTable: action.payload,
                    adBlockDeviceTableLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_DOMAIN_TABLE:
               return {
                    ...state,
                    adBlockDomainTableLoader: true,
                    adBlockDomainTable:[],
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_DOMAIN_TABLE:
               return {
                    ...state,
                    adBlockDomainTable: action.payload,
                    adBlockDomainTableLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_BROWSER:
               return {
                    ...state,
                    adBlockBrowserDataLoader: true,
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_BROWSER:
               return {
                    ...state,
                    adBlockBrowserData: action.payload,
                    adBlockBrowserDataLoader: false,
               };

          case AdBlockDashboardTypes.FETCH_ADBLOCK_LIST:
               return {
                    ...state,
                    adBlockSiteListLoader: true,
               }
          case AdBlockDashboardTypes.SET_ADBLOCK_LIST:
               return {
                    ...state,
                    adblockSiteList: action.payload,
                    adBlockSiteListLoader: false,
               };
          default:
               return state;
     }
}

export default adBlockDashboardReducer;
