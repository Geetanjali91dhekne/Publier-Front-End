import { CommonAction } from '../../../../login/redux/types';
import { FavoriteOrRecent } from '../../AdOptimization/redux/types';
import AdBlockDashboardTypes, { AdBlockRecovery, TopCards } from './types';

//adblock recovery top cards
function fetchAdBlockTopCard(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_TOP_CARD,
          payload: data,
     };
}
function setAdBlockTopCard(data?: TopCards): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_TOP_CARD,
          payload: data,
     };
}

//adblock recovery pvs graph
function fetchAdBlockPvsGraph(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_PVS_GRAPH,
          payload: data,
     };
}
function setAdBlockPvsGraph(data?: any): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_PVS_GRAPH,
          payload: data,
     };
}

//adblock recovery percentage user graph
function fetchAdBlockPerUserGraph(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_PERUSER_GRAPH,
          payload: data,
     };
}
function setAdBlockPerUserGraph(data?: any): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_PERUSER_GRAPH,
          payload: data,
     };
}

//adblock recovery widget graph
function fetchAdBlockWidgetTable(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_WIDGET_TABLE,
          payload: data,
     };
}
function setAdBlockWidgetTable(data?: any): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_WIDGET_TABLE,
          payload: data,
     };
}

//adblock recovery country table
function fetchAdBlockCountryTable(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_COUNTRY_TABLE,
          payload: data,
     };
}
function setAdBlockCountryTable(data?: any): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_COUNTRY_TABLE,
          payload: data,
     };
}

//adblock recovery device table
function fetchAdBlockDeviceTable(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_DEVICE_TABLE,
          payload: data,
     };
}
function setAdBlockDeviceTable(data?: any): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_DEVICE_TABLE,
          payload: data,
     };
}

//adblock recovery device table
function fetchAdBlockDomainTable(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_DOMAIN_TABLE,
          payload: data,
     };
}
function setAdBlockDomainTable(data?: any): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_DOMAIN_TABLE,
          payload: data,
     };
}

//adblock recovery browser
function fetchAdBlockBrowser(data?: AdBlockRecovery): CommonAction {
     return {
          type: AdBlockDashboardTypes.FETCH_ADBLOCK_BROWSER,
          payload: data,
     };
}
function setAdBlockBrowser(data?: any): CommonAction {
     return {
          type: AdBlockDashboardTypes.SET_ADBLOCK_BROWSER,
          payload: data,
     };
}

//site list
function fetchAdBlockList(): CommonAction {
     return {
         type: AdBlockDashboardTypes.FETCH_ADBLOCK_LIST,
         payload: undefined
     }
 }
 
 function setAdBlockList(data?: FavoriteOrRecent[]): CommonAction {
     return {
         type: AdBlockDashboardTypes.SET_ADBLOCK_LIST,
         payload: data,
     }
 }
const AdBlockDashboardActions = {
     fetchAdBlockTopCard,
     setAdBlockTopCard,

     //adblock graphs
     fetchAdBlockPvsGraph,
     setAdBlockPvsGraph,
     fetchAdBlockPerUserGraph,
     setAdBlockPerUserGraph,

     //ad block tables
     fetchAdBlockWidgetTable,
     setAdBlockWidgetTable,
     fetchAdBlockCountryTable,
     setAdBlockCountryTable,
     fetchAdBlockDeviceTable,
     setAdBlockDeviceTable,
     fetchAdBlockDomainTable,
     setAdBlockDomainTable,
     fetchAdBlockBrowser,
     setAdBlockBrowser,

     fetchAdBlockList,
     setAdBlockList,

}
export default AdBlockDashboardActions;
