import { Empty, Spin } from 'antd';
import React, { useMemo, useState } from 'react';
import { VscCircleFilled } from 'react-icons/vsc';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type Props = {
    list: any;
    title: any;
    loading?: boolean;
    comparison: boolean;
    label1: string;
    label2: string;
    graphtype: string;
};

const COLORS = ['#056433', '#0D934E', '#69A284', '#D5F0E2', '#000000'];

const PVsSubPVsPieChart: React.FC<Props> = ({ comparison, list, title, loading, label1, label2, graphtype }) => {
    const [activeTab, setActiveTab] = useState('Subscription PVs');
    const graph = useMemo(() => {
        let data: { name: string; value: string; amt: number; per: number }[] = [];
        if (graphtype === 'domainStats') {
            if (list) {
                let totalPer = 0;
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (activeTab === 'Subscription PVs') {
                            totalPer += parseFloat(d.total_sub_pvs_per);
                        } else {
                            totalPer += parseFloat(d.total_pvs_per);
                        }
                        data.push({
                            name: d.domain_name,
                            value: activeTab === 'Subscription PVs' ? parseFloat(d.sub_pageview_per).toFixed(2) : parseFloat(d.pageview_per).toFixed(2),
                            amt: activeTab === 'Subscription PVs' ? parseInt(d.sub_pageviews) : parseInt(d.total_pageview),
                            per: activeTab === 'Subscription PVs' ? d.total_sub_pvs_per : d.total_pvs_per,
                        });
                    }
                }

                let start: number = 4;
                let end: number = list?.length;
                let others: { name: string; value: string; amt: number; per: number } = { name: 'Other', value: '0', amt: 0, per: 0 };
                let shouldAppend: boolean = false;
                while (start < end) {
                    shouldAppend = true;
                    let d = list[start];
                    if (activeTab === 'Subscription PVs') {
                        others.value = parseFloat(String(parseFloat(others.value).toFixed(2) + parseFloat(d.sub_pageview_per).toFixed(2))).toFixed(2);
                        others.amt += d.sub_pageviews;
                    } else {
                        others.value = parseFloat(String(parseFloat(others.value) + parseFloat(d.pageview_per))).toFixed(2);
                        others.amt += d.total_pageview;
                    }
                    start++;
                }
                others.per = 100 - totalPer;
                if (others.per === 100) {
                    others.amt = 100;
                }
                let newData = data.sort((a: any, b: any) => b.per - a.per);
                if (shouldAppend) {
                    newData.push(others);
                }
                return newData;
            }
        } else if (graphtype === 'countryStats') {
            if (list) {
                let totalPer = 0;
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (activeTab === 'Subscription PVs') {
                            totalPer += parseFloat(d.total_sub_pvs_per);
                        } else {
                            totalPer += parseFloat(d.total_pvs_per);
                        }
                        data.push({
                            name: d.country,
                            value: activeTab === 'Subscription PVs' ? parseFloat(d.sub_pageview_per).toFixed(2) : parseFloat(d.pageview_per).toFixed(2),
                            amt: activeTab === 'Subscription PVs' ? parseInt(d.sub_pageviews) : parseInt(d.total_pageview),
                            per: activeTab === 'Subscription PVs' ? d.total_sub_pvs_per : d.total_pvs_per,
                        });
                    }
                }

                let start: number = 4;
                let end: number = list?.length;
                let others: { name: string; value: string; amt: number; per: number } = { name: 'Other', value: '0', amt: 0, per: 0 };
                let shouldAppend: boolean = false;
                while (start < end) {
                    shouldAppend = true;
                    let d = list[start];
                    if (activeTab === 'Subscription PVs') {
                        others.value = parseFloat(String(parseFloat(others.value).toFixed(2) + parseFloat(d.sub_pageview_per).toFixed(2))).toFixed(2);
                        others.amt += d.sub_pageviews;
                    } else {
                        others.value = parseFloat(String(parseFloat(others.value) + parseFloat(d.pageview_per))).toFixed(2);
                        others.amt += d.total_pageview;
                    }
                    start++;
                }
                others.per = 100 - totalPer;
                if (others.per === 100) {
                    others.amt = 100;
                }
                let newData = data.sort((a: any, b: any) => b.per - a.per);
                if (shouldAppend) {
                    newData.push(others);
                }
                return newData;
            }
        }

        return data;
    }, [list, activeTab, graphtype]);

    const data = graph;

    return (
        <div className="relative rounded-lg drop-shadow-md bg-white h-full">
            <div className="text-center text-[24px] font-bold text-[#056433] inter">{title}</div>
            <div className="flex flex-row border-b border-solid border-gray-400 py-4 mx-8 justify-center ">
                <div onClick={() => setActiveTab('PVs')} className={`w-[200px] font-semibold cursor-pointer py-2  text-center montserrat text-sm  rounded-l-lg ${activeTab === 'PVs' ? 'text-white bg-[#056433]' : 'text-[#056433] bg-[#D5F0E2]'}`}>
                    {label1}
                </div>
                <div
                    onClick={() => setActiveTab('Subscription PVs')}
                    className={`w-[200px] font-semibold py-2 cursor-pointer text-center montserrat text-sm  rounded-r-lg ${activeTab === 'Subscription PVs' ? 'text-white bg-[#056433]' : 'text-[#056433] bg-[#D5F0E2]'}`}
                >
                    {label2}
                </div>
            </div>

            {!loading && data?.length !== 0 && (
                <div className="flex flex-row mt-4 justify-center items-center">
                    <div className="w-1/2 ">
                        <ResponsiveContainer width="100%" height={200} className="-mt-4">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="amt">
                                    {data.map((entry: any, index: number) => {
                                        return <Cell key={`cell-${Math.random() * index}`} fill={COLORS[index % COLORS.length]} />;
                                    })}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 mt-4">
                        {data.map((item: any, key: number) => {
                            return (
                                <div key={Math.random() * key} className="flex flex-row  justify-between mr-4 mb-2 ">
                                    <div className="flex flex-row items-center w-2/3">
                                        <div>
                                            <VscCircleFilled color={COLORS[key % COLORS.length]} />
                                        </div>
                                        <div className="text-[14px] inter font-medium truncate  max-w-[90%]">{item?.name}</div>
                                    </div>
                                    <div className="w-1/3 text-[14px] inter text-center text-[#615E83] ">{parseFloat(item?.per).toFixed(2)}%</div>
                                    {comparison && (
                                        <div className="w-1/3 text-[14px] inter text-center text-[#615E83]" style={parseInt(item?.value) >= 0 ? { color: 'green' } : { color: 'red' }}>
                                            ({item?.value}%)
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {!loading && data?.length === 0 && (
                <div className="flex justify-center items-center h-40">
                    <Empty description={'No data found'} />
                </div>
            )}
            {loading && (
                <div className="flex justify-center items-center h-20">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default PVsSubPVsPieChart;
