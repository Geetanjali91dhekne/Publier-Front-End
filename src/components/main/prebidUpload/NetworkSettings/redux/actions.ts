import { CommonAction } from '../../../../login/redux/types';
import NetwrokSettingTypes, { networkSettingGetData } from './types';


function fetchNetworkSettingNetworkList(): CommonAction {
     return {
          type: NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_NETWORK_LIST,
          payload: undefined,
     };
}

function setNetworkSettingNetworkList(data?: networkSettingGetData): CommonAction {
     return {
          type: NetwrokSettingTypes.SET_NETWORK_SETTING_ALL_NETWORK_LIST,
          payload: data,
     };
}

function fetchNetworkSettingSites(): CommonAction {
     return {
          type: NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_SITES,
          payload: undefined,
     };
}

function setNetworkSettingSites(data?:any): CommonAction {
     return {
          type: NetwrokSettingTypes.SET_NETWORK_SETTING_ALL_SITES,
          payload: data,
     };
}

function fetchNetworkSettingSizes(): CommonAction {
     return {
          type: NetwrokSettingTypes.FETCH_NETWORK_SETTING_ALL_SIZES,
          payload: undefined,
     };
}

function setNetworkSettingSizes(data?: any): CommonAction {
     return {
          type: NetwrokSettingTypes.SET_NETWORK_SETTING_ALL_SIZES,
          payload: data,
     };
}

function fetchNetworkSettingSiteSizeTable(data?: any): CommonAction {
     return {
          type: NetwrokSettingTypes.FETCH_NETWORK_SETTING_SITES_SIZE_TABLE,
          payload: data,
     };
}

function setNetworkSettingSiteSizeTable(data?: networkSettingGetData): CommonAction {
     return {
          type: NetwrokSettingTypes.SET_NETWORK_SETTING_SITES_SIZE_TABLE,
          payload: data,
     };
}



const NetworkSettingAction = {
     fetchNetworkSettingNetworkList,
     setNetworkSettingNetworkList,
     fetchNetworkSettingSites,
     setNetworkSettingSites,
     fetchNetworkSettingSizes,
     setNetworkSettingSizes,
     fetchNetworkSettingSiteSizeTable,
     setNetworkSettingSiteSizeTable,
};

export default NetworkSettingAction;
