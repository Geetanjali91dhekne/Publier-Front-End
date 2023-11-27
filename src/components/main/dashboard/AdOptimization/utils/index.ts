import { CPMOrRevenueOrRequestGraphBySite, FillUnfillUnrendered, GraphData } from '../redux/types';

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

const parseAdRequestGraphData = (data: { lables: string[]; request: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.request[index]),
        });
    });
    return list;
};

const parseFillrateGraphData = (data: { lables: string[]; fillrate: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.fillrate[index]),
        });
    });
    return list;
};

const parseMonetizedImpsGraphData = (data: { lables: string[]; imps: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.imps[index]),
        });
    });
    return list;
};

const parseCPMGraphData = (data: { lables: string[]; cpms: string[] }): GraphData[] => {
    let list: GraphData[] = [];
    data?.lables?.forEach((l, index) => {
        list.push({
            date: l,
            value: parseFloat(data.cpms[index]),
        });
    });
    return list;
};

const parseCPMGraphBySite = (data: { cpm: { cpm: string[]; lables?: string[]; old_cpm: string[]; total_cpm: number } }): CPMOrRevenueOrRequestGraphBySite => {
    let graph: CPMOrRevenueOrRequestGraphBySite = {
        graph: [],
        total: 0,
    };
    data?.cpm?.lables?.forEach((l, index) => {
        graph.graph.push({
            name: l,
            amt: data?.cpm.cpm[index],
            prev: data?.cpm.old_cpm[index],
        });
    });
    graph.total = data?.cpm.total_cpm;
    return graph;
};

const parseRevenueGraphBySite = (data: { revenue: { revenue: string[]; lables?: string[]; old_revenue: string[]; total_revenue: number } }): CPMOrRevenueOrRequestGraphBySite => {
    let graph: CPMOrRevenueOrRequestGraphBySite = {
        graph: [],
        total: 0,
    };
    data?.revenue?.lables?.forEach((l, index) => {
        graph.graph.push({
            name: l,
            amt: data?.revenue.revenue[index],
            prev: data?.revenue.old_revenue[index],
        });
    });
    graph.total = data?.revenue.total_revenue;
    return graph;
};
const parseImpsGraphBySite = (data: { impression: { impressions: string[]; lables?: string[]; old_impressions: string[]; total_impressions: number } }): CPMOrRevenueOrRequestGraphBySite => {
    let graph: CPMOrRevenueOrRequestGraphBySite = {
        graph: [],
        total: 0,
    };
    data?.impression?.lables?.forEach((l, index) => {
        graph.graph.push({
            name: l,
            amt: data?.impression.impressions[index],
            prev: data?.impression.old_impressions[index],
        });
    });
    graph.total = data?.impression.total_impressions;
    return graph;
};

const parseRequestGraphBySite = (data: { requests: { requests: string[]; lables?: string[]; old_requests: string[]; total_request: number } }): CPMOrRevenueOrRequestGraphBySite => {
    let graph: CPMOrRevenueOrRequestGraphBySite = {
        graph: [],
        total: 0,
    };
    data?.requests?.lables?.forEach((l, index) => {
        graph.graph.push({
            name: l,
            amt: data?.requests.requests[index],
            prev: data?.requests.old_requests[index],
        });
    });
    graph.total = data?.requests.total_request;
    return graph;
};

const parseFillUnfillUnrenderedGraphBySite = (data: { fill: { filled: string[]; lables?: string[]; un_filled: string[]; unrendered: string[] } }): FillUnfillUnrendered[] => {
    let graph: FillUnfillUnrendered[] = [];
    data?.fill?.lables?.forEach((l, index) => {
        graph.push({
            day: l,
            filled: parseFloat(data.fill.filled[index]),
            unfilled: parseFloat(data.fill.un_filled[index]),
            unrendered: parseFloat(data.fill.unrendered[index]),
        });
    });

    return graph;
};

function convertDataInReal(type: any, data: any) {
    let allData = [];
    if (type === 'cpm' || type === 'rpm') {
        type === 'cpm'
            ? (allData = data?.cpms?.map((item: any, i: any) => {
                  return {
                      name: data?.hour[i],
                      amt: item,
                  };
              }))
            : (allData = data?.rpm?.map((item: any, i: any) => {
                  return {
                      name: data?.hour[i],
                      amt: item,
                  };
              }));
    } else {
        if (type === 'revReq') {
            allData = data?.request?.map((item: any, i: any) => {
                return {
                    hour: data?.hour[i],
                    request: item,
                    revenue: data?.revenue[i],
                };
            });
        } else {
            allData = data?.impressions?.map((item: any, i: any) => {
                return {
                    hour: data?.hour[i],
                    impressions: item,
                    page_view: data?.page_view[i],
                };
            });
        }
    }

    return allData;
}

function parsePageViewImpGraphData(data:any){
    const formatedData:any=[]
    data?.hour?.forEach((item:any,index:any)=>{
        formatedData.push({
            key:index,
            hour:item,
            page_view:data?.page_view[index]
        })
    })
    return formatedData;
}

const AdOptDashboardUtils = {
    parseRevenueGraphData,
    parseAdRequestGraphData,
    parseFillrateGraphData,
    parseMonetizedImpsGraphData,
    parseCPMGraphData,
    parseCPMGraphBySite,
    parseRevenueGraphBySite,
    parseRequestGraphBySite,
    parseFillUnfillUnrenderedGraphBySite,
    parseImpsGraphBySite,
    convertDataInReal,
    parsePageViewImpGraphData,
};

export default AdOptDashboardUtils;
