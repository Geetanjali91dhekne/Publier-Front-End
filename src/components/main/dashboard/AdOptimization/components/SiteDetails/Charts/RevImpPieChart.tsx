import { Empty, Spin } from 'antd';
import React, { useMemo, useState } from 'react';
import { VscCircleFilled } from 'react-icons/vsc';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DemandChannelStat } from '../../../redux/types';

type Props = {
    list: DemandChannelStat[];
    title: any;
    loading: boolean;
    compaison: boolean;
    label1: string;
    label2: string;
};

const COLORS = [
    '#056433',
    '#0D934E',
    '#69A284',
    '#D5F0E2',
    '#000000',
];

const RevImpPieChart: React.FC<Props> = ({ compaison, list, title, loading, label1, label2 }) => {
    const [activeTab, setActiveTab] = useState('Revenue');
    const graph = useMemo(() => {
        let data: { name: string; value: string; amt: number; per: string }[] = [];
        let totalPer = 0;
        for (let i = 0; i < 4; i++) {
            if (list[i]) {
                let d = list[i];
                if (activeTab === 'Revenue') {
                    totalPer += parseFloat(d.revenue_per);
                }
                else {
                    totalPer += parseFloat(d.impressions_per);
                }
                data.push({
                    name: d.network_name || d?.dimensions,
                    value: activeTab === 'Revenue' ? parseFloat(String(d.revenue_percentage)).toFixed(2) : parseFloat(String(d.impressions_percentage)).toFixed(2),
                    amt: activeTab === 'Revenue' ? parseFloat(d.sum_revenue) : parseFloat(d.impressions),
                    per: activeTab === 'Revenue' ? parseFloat(d.revenue_per).toFixed(2) : parseFloat(d.impressions_per).toFixed(2),
                });
            }
        }

        let start: number = 4;
        let end: number = list.length;
        let others: { name: string; value: string; amt: number; per: string } = { name: 'Other', value: '0', amt: 0, per: '0' };
        let shouldAppend: boolean = false;
        while (start < end) {
            shouldAppend = true;
            let d = list[start];
            if (activeTab === 'Revenue') {
                others.value = parseFloat(String(parseFloat(String(others.value)) + parseFloat(String(d.revenue_percentage)))).toFixed(2);
                others.amt += parseFloat(d?.sum_revenue);
            } else {
                others.value = parseFloat(String(parseFloat(String(others.value)) + parseFloat(String(d.impressions_percentage)))).toFixed(2);
                others.amt += parseFloat(d?.impressions);
            }
            start++;
        }
        others.per = (100 - totalPer).toFixed(2);
        let newData = data.sort((a: any, b: any) => b.per - a.per);
        if (shouldAppend) {
            newData.push(others);
        }
        return newData;
    }, [list, activeTab]);

    const data = graph;

    return (
        <div className="rounded-lg drop-shadow-md bg-white h-full">
            <div className="text-center text-[24px] font-bold text-[#056433] inter">{title}</div>
            <div className="flex flex-row border-b border-solid border-gray-400 py-4 mx-8 justify-center ">
                <div
                    onClick={() => setActiveTab('Impressions')}
                    className={`w-[200px] font-semibold cursor-pointer py-2  text-center montserrat text-sm  rounded-l-lg ${activeTab === 'Impressions' ? 'text-white bg-[#056433]' : 'text-[#056433] bg-[#D5F0E2]'}`}
                >
                    {label1}
                </div>
                <div
                    onClick={() => setActiveTab('Revenue')}
                    className={`w-[200px] font-semibold py-2 cursor-pointer text-center montserrat text-sm  rounded-r-lg ${activeTab === 'Revenue' ? 'text-white bg-[#056433]' : 'text-[#056433] bg-[#D5F0E2]'}`}
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
                                <div key={Math.random() * key} className="flex flex-row justify-between mr-4 mb-2 ">
                                    <div className="flex flex-row items-center w-2/3">
                                        <div>
                                            <VscCircleFilled color={COLORS[key % COLORS.length]} />
                                        </div>
                                        <div className="text-[14px] inter font-medium">{item.name}</div>
                                    </div>
                                    <div className="w-1/3 text-[14px] inter text-center text-[#615E83] ">{item.per}%</div>
                                    {compaison && (
                                        <div className="w-1/3 text-[14px] inter text-center text-[#615E83]" style={parseInt(item.value) >= 0 ? { color: 'green' } : { color: 'red' }}>
                                            ({item.value}%)
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
                <div className="flex justify-center items-center h-14">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default RevImpPieChart;
