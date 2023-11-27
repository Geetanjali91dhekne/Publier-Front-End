import { CommonAction } from '../../../../login/redux/types';
import QuickShopDashboardTypes, { QuickShop, TopCards } from './types';

//quick shop top cards
function fetchQuickShopTopCard(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_TOP_CARDS,
        payload: data,
    };
}
function setQuickShopTopCard(data?: TopCards): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_TOP_CARDS,
        payload: data,
    };
}

//quick shop earning graph
function fetchQuickShopEarningGrpah(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_EARNING_GRAPH,
        payload: data,
    };
}
function setQuickShopEarningGrpah(data?: any): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_EARNING_GRAPH,
        payload: data,
    };
}

//quick shop items graph
function fetchQuickShopItemsGrpah(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_ITEM_GRAPH,
        payload: data,
    };
}
function setQuickShopItemsGrpah(data?: any): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_ITEM_GRAPH,
        payload: data,
    };
}

//quick shop top items table
function fetchQuickShopTopItemsTable(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_TOP_ITEM_TABLE,
        payload: data,
    };
}
function setQuickShopTopItemsTable(data?: any): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_TOP_ITEM_TABLE,
        payload: data,
    };
}

//quick shop top country graph
function fetchQuickShopCountryGraph(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_COUNTRY_GRAPH,
        payload: data,
    };
}
function setQuickShopCountryGraph(data?: any): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_COUNTRY_GRAPH,
        payload: data,
    };
}

//quick shop top purchase graph
function fetchQuickShopPurchaseGraph(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_PURCHASE_GRAPH,
        payload: data,
    };
}
function setQuickShopPurchaseGraph(data?: any): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_PURCHASE_GRAPH,
        payload: data,
    };
}

//quick shop product pvs graph
function fetchQuickShopProductPvsGraph(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_PRODUCT_PVS_GRAPH,
        payload: data,
    };
}
function setQuickShopProductPvsGraph(data?: any): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_PRODUCT_PVS_GRAPH,
        payload: data,
    };
}

//quick shop conversion ratio graph
function fetchQuickShopConversionRatioGraph(data?: QuickShop): CommonAction {
    return {
        type: QuickShopDashboardTypes.FETCH_QUICKSHOP_CONVERSION_RATIO_GRAPH,
        payload: data,
    };
}
function setQuickShopConversionRatioGraph(data?: any): CommonAction {
    return {
        type: QuickShopDashboardTypes.SET_QUICKSHOP_CONVERSION_RATIO_GRAPH,
        payload: data,
    };
}
const QuickShopDashboardActions = {
    fetchQuickShopTopCard,
    setQuickShopTopCard,
    fetchQuickShopEarningGrpah,
    setQuickShopEarningGrpah,
    fetchQuickShopItemsGrpah,
    setQuickShopItemsGrpah,
    fetchQuickShopTopItemsTable,
    setQuickShopTopItemsTable,
    fetchQuickShopCountryGraph,
    setQuickShopCountryGraph,
    fetchQuickShopPurchaseGraph,
    setQuickShopPurchaseGraph,
    fetchQuickShopProductPvsGraph,
    setQuickShopProductPvsGraph,
    fetchQuickShopConversionRatioGraph,
    setQuickShopConversionRatioGraph,
};
export default QuickShopDashboardActions;
