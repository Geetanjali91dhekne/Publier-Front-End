import { GraphData } from "../../AdOptimization/redux/types";

const parsePvsGraphData = (data: { lables: string[]; pvs: string[] }): GraphData[] => {
     let list: GraphData[] = [];
     data?.lables?.forEach((l, index) => {
         list.push({
             date: l,
             value: parseFloat(data.pvs[index]),
         });
     });
     return list;
 };

 const parsePerUserGraphData = (data: { lables: string[]; adblockusers: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.adblockusers[index]),
        });
    });
    return list;
};

 const AdBlockRecoveryUtils = {
     parsePvsGraphData,
     parsePerUserGraphData,
 }

 export default AdBlockRecoveryUtils;
