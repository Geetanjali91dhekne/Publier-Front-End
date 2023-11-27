import { GraphData } from "../../AdOptimization/redux/types";

const parseQuickShopEarningGraphData = (data: { lables: string[]; totalearnings: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.totalearnings[index]),
        });
    });
    return list;
};

const parseQuickShopItemsSoldGraphData = (data: { lables: string[]; itemsold: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.itemsold[index]),
        });
    });
    return list;
};

const parseQuickShopPurchaseGraphData = (data: { lables: string[]; avgpurchase: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.avgpurchase[index]),
        });
    });
    return list;
};

const parseQuickShopProductPvsGraphData = (data: { lables: string[]; prdoductpvs: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.prdoductpvs[index]),
        });
    });
    return list;
};

const parseQuickShopConversionRatioGraphData = (data: { lables: string[]; converstionratio: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.converstionratio[index]),
        });
    });
    return list;
};
const QuickShopUtils = {
    parseQuickShopEarningGraphData,
    parseQuickShopItemsSoldGraphData,
    parseQuickShopPurchaseGraphData,
    parseQuickShopProductPvsGraphData,
    parseQuickShopConversionRatioGraphData
}

export default QuickShopUtils
