import { GraphData } from '../redux/types';

const parseRevenueGraphData = (data: { lables: string[]; rev: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.rev[index]),
        });
    });
    return list;
};

const parseActiveSubsGraphData = (data: { lables: string[]; newsub: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.newsub[index]),
        });
    });
    return list;
};

const parseUnSubsGraphData = (data: { lables: string[]; unsub: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.unsub[index]),
        });
    });
    return list;
};

const parseRpmGraphData = (data: { lables: string[]; rpm: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.rpm[index]),
        });
    });
    return list;
};

const SubsDashboardUtils = {
    parseRevenueGraphData,
    parseActiveSubsGraphData,
    parseUnSubsGraphData,
    parseRpmGraphData,
};

export default SubsDashboardUtils;
