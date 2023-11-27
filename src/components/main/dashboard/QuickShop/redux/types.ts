const QuickShopDashboardTypes = {
    //for quickshop
    //quickshop topcards
    FETCH_QUICKSHOP_TOP_CARDS: 'FETCH_QUICKSHOP_TOP_CARDS',
    SET_QUICKSHOP_TOP_CARDS: 'SET_QUICKSHOP_TOP_CARDS',

    //quickshop earning graph
    FETCH_QUICKSHOP_EARNING_GRAPH: 'FETCH_QUICKSHOP_EARNING_GRAPH',
    SET_QUICKSHOP_EARNING_GRAPH: 'SET_QUICKSHOP_EARNING_GRAPH',

    //quickshop item graph
    FETCH_QUICKSHOP_ITEM_GRAPH: 'FETCH_QUICKSHOP_ITEM_GRAPH',
    SET_QUICKSHOP_ITEM_GRAPH: 'SET_QUICKSHOP_ITEM_GRAPH',

    //quickshop top item table
    FETCH_QUICKSHOP_TOP_ITEM_TABLE: 'FETCH_QUICKSHOP_TOP_ITEM_TABLE',
    SET_QUICKSHOP_TOP_ITEM_TABLE: 'SET_QUICKSHOP_TOP_ITEM_TABLE',

    //quickshop country graph
    FETCH_QUICKSHOP_COUNTRY_GRAPH: 'FETCH_QUICKSHOP_COUNTRY_GRAPH',
    SET_QUICKSHOP_COUNTRY_GRAPH: 'SET_QUICKSHOP_COUNTRY_GRAPH',

    //quickshop purchase graph
    FETCH_QUICKSHOP_PURCHASE_GRAPH: 'FETCH_QUICKSHOP_PURCHASE_GRAPH',
    SET_QUICKSHOP_PURCHASE_GRAPH: 'SET_QUICKSHOP_PURCHASE_GRAPH',

    //quickshop product pvs graph
    FETCH_QUICKSHOP_PRODUCT_PVS_GRAPH: 'FETCH_QUICKSHOP_PRODUCT_PVS_GRAPH',
    SET_QUICKSHOP_PRODUCT_PVS_GRAPH: 'SET_QUICKSHOP_PRODUCT_PVS_GRAPH',

    //quickshop conversion ratio graph
    FETCH_QUICKSHOP_CONVERSION_RATIO_GRAPH: 'FETCH_QUICKSHOP_CONVERSION_RATIO_GRAPH',
    SET_QUICKSHOP_CONVERSION_RATIO_GRAPH: 'SET_QUICKSHOP_CONVERSION_RATIO_GRAPH',
};

export default QuickShopDashboardTypes;

export interface QuickShop {
    start_date: string;
    end_date: string;
    revenue?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    site_id?: any;
}

export interface EarningOrDoners {
    graph: {
        name: string;
        amt: string;
        prev: string;
    }[];
    total: number;
    ad_server?: string;
    total_impressions?: number;
    total_page_view?: number;
}

export interface TopCards {
    total_revenue?: number;
    previous_total_revenue?: number;
    total_rev_percentage?: number;
    total_item_sold?: number;
    previous_total_item_sold?: number;
    total_item_sold_percentage?: number;
    total_avg_purchase: number;
    previous_total_avg_purchase: number;
    total_avg_purchase_percentage: number;
    total_product_pvs: number;
    previous_total_product_pvs: number;
    total_product_pvs_percentage: number;
    total_converstion_ratio: number;
    previous_total_converstion_ratio: number;
    total_converstion_ratio_percentage: number;
}
export interface QuickShopDashboardStates {
    quickShopTopCards?: TopCards;
    quickShopTopCardsLoader?: boolean;

    quickShopEarningGraph: any;
    quickShopEarningGraphLoader: boolean;

    quickShopItemsGraph: any;
    quickShopItemsGraphLoader: boolean;

    quickShopTopItemsTable?: any;
    quickShopTopItemsTableLoader?: boolean;

    quickShopCountryGraph?: any;
    quickShopCountryGraphLoader?: boolean;

    quickShopPurchaseGraph: any;
    quickShopPurchaseGraphLoader: boolean;

    quickShopProductPvsGraph: any;
    quickShopProductPvsGraphLoader: boolean;

    quickShopConversionRatioGraph: any;
    quickShopConversionRatioGraphLoader: boolean;
}
