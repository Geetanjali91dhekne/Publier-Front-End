import { CommonAction } from '../../../../login/redux/types';
import QuickShopDashboardTypes, { QuickShopDashboardStates } from './types';

const QuickShopInitialState: QuickShopDashboardStates = {
    quickShopEarningGraph: [],
    quickShopEarningGraphLoader: false,
    quickShopItemsGraph: [],
    quickShopItemsGraphLoader: false,
    quickShopPurchaseGraph: [],
    quickShopPurchaseGraphLoader: false,
    quickShopProductPvsGraph: undefined,
    quickShopProductPvsGraphLoader: false,
    quickShopConversionRatioGraph: undefined,
    quickShopConversionRatioGraphLoader: false,
};

const quickShopDashboardReducer = (state = QuickShopInitialState, action: CommonAction): QuickShopDashboardStates => {
    switch (action.type) {
        //fetching and setting quickshop topcards
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_TOP_CARDS:
            return {
                ...state,
                quickShopTopCardsLoader: true,
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_TOP_CARDS:
            return {
                ...state,
                quickShopTopCards: action.payload,
                quickShopTopCardsLoader: false,
            };

        //fetching and setting quickshop earining graph.
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_EARNING_GRAPH:
            return {
                ...state,
                quickShopEarningGraphLoader: true,
                quickShopEarningGraph: [],
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_EARNING_GRAPH:
            return {
                ...state,
                quickShopEarningGraph: action.payload,
                quickShopEarningGraphLoader: false,
            };

        //fetching and setting quickshop item graph.
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_ITEM_GRAPH:
            return {
                ...state,
                quickShopItemsGraphLoader: true,
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_ITEM_GRAPH:
            return {
                ...state,
                quickShopItemsGraph: action.payload,
                quickShopItemsGraphLoader: false,
            };

        //fetching and setting quickshop top item table.
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_TOP_ITEM_TABLE:
            return {
                ...state,
                quickShopTopItemsTableLoader: true,
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_TOP_ITEM_TABLE:
            return {
                ...state,
                quickShopTopItemsTable: action.payload,
                quickShopTopItemsTableLoader: false,
            };

        //fetching and setting quickshop country graph.
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_COUNTRY_GRAPH:
            return {
                ...state,
                quickShopCountryGraphLoader: true,
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_COUNTRY_GRAPH:
            return {
                ...state,
                quickShopCountryGraph: action.payload,
                quickShopCountryGraphLoader: false,
            };

        //fetching and setting quickshop purchase graph.
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_PURCHASE_GRAPH:
            return {
                ...state,
                quickShopPurchaseGraphLoader: true,
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_PURCHASE_GRAPH:
            return {
                ...state,
                quickShopPurchaseGraph: action.payload,
                quickShopPurchaseGraphLoader: false,
            };

        //fetching and setting quickshop Proudct pvs graph.
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_PRODUCT_PVS_GRAPH:
            return {
                ...state,
                quickShopProductPvsGraphLoader: true,
                quickShopProductPvsGraph: [],
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_PRODUCT_PVS_GRAPH:
            return {
                ...state,
                quickShopProductPvsGraph: action.payload,
                quickShopProductPvsGraphLoader: false,
            };

        //fetching and setting quickshop conversion ratio graph.
        case QuickShopDashboardTypes.FETCH_QUICKSHOP_CONVERSION_RATIO_GRAPH:
            return {
                ...state,
                quickShopConversionRatioGraphLoader: true,
                quickShopConversionRatioGraph: [],
            };
        case QuickShopDashboardTypes.SET_QUICKSHOP_CONVERSION_RATIO_GRAPH:
            return {
                ...state,
                quickShopConversionRatioGraph: action.payload,
                quickShopConversionRatioGraphLoader: false,
            };
        default:
            return state;
    }
};

export default quickShopDashboardReducer;
