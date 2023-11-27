import { GraphData } from "../../AdOptimization/redux/types";

const parseEarningGraphData = (data: { lables: string[]; totalearnings: string[] }): GraphData[] => {
     let list: GraphData[] = [];
     data?.lables?.forEach((l, index) => {
         list.push({
             date: l,
             value: parseFloat(data.totalearnings[index]),
         });
     });
     return list;
 };

 const parseDonorGraphData = (data: { lables: string[]; totaldonors: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.totaldonors[index]),
        });
    });
    return list;
};

const parseFundraiserGraphData = (data: { lables: string[]; fundraiserViews: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.fundraiserViews[index]),
        });
    });
    return list;
};

const parseAvgDonationGraphData = (data: { lables: string[]; averageDonation: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.averageDonation[index]),
        });
    });
    return list;
};

const parseEcpmGraphData = (data: { lables: string[]; fundEcpm: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.fundEcpm[index]),
        });
    });
    return list;
};
 const CrowdFundUtils = {
     parseEarningGraphData,
     parseDonorGraphData,
     parseFundraiserGraphData,
     parseAvgDonationGraphData,
     parseEcpmGraphData
 }

 export default CrowdFundUtils
