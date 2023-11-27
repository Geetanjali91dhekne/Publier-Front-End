import { Spin } from 'antd';
import React, { useMemo } from 'react';
import { VscCircleFilled } from 'react-icons/vsc';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { commaSeperator } from '../../../../../../../../utils/Validation';

type Props = {
    list: any;
    title: any;
    loading?: boolean;
    compaison: boolean;
    prefix: string;
    suffix: string;
    chart: string;
};

const COLORS = ['#056433', '#0D934E', '#69A284', '#D5F0E2', '#000000'];

const SimplePieChart: React.FC<Props> = ({ compaison, list, title, loading, prefix, suffix, chart }) => {
    const graph = useMemo(() => {
        let data: { name: string; value: number }[] = [];
        let other: { name: string; value: number } = { name: 'Other', value: 0 };
        let shouldAppend = false;
        if (list) {
            if (chart === 'country') {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (d?.country && d?.pageviews) {
                            data.push({
                                name: d.country,
                                value: parseInt(d.pageviews),
                            });
                        } else {
                            shouldAppend = true;
                            other.value += parseInt(d.pageviews);
                        }
                    }
                }
            } else if (chart === 'device') {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (d?.device && d?.pageviews) {
                            data.push({
                                name: d.device,
                                value: parseInt(d.pageviews),
                            });
                        } else {
                            shouldAppend = true;
                            other.value += parseInt(d.pageviews);
                        }
                    }
                }
            } else if (chart === 'CFEarnByCountry') {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (d?.country && d?.sum_earnings) {
                            data.push({
                                name: d?.country,
                                value: d?.sum_earnings,
                            });
                        } else {
                            shouldAppend = true;
                            other.value += d?.sum_earnings;
                        }
                    }
                }
            } else if (chart === 'CFEarnByDevices') {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (d?.device && d?.sum_earnings) {
                            data.push({
                                name: d?.device,
                                value: d?.sum_earnings,
                            });
                        } else {
                            shouldAppend = true;
                            other.value += d?.sum_earnings;
                        }
                    }
                }
            } else if (chart === 'CFDonorByCountry') {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (d?.country && d?.donors) {
                            data.push({
                                name: d?.country,
                                value: d?.donors,
                            });
                        } else {
                            shouldAppend = true;
                            other.value += d?.donors;
                        }
                    }
                }
            } else if (chart === 'CFDonorByDevices') {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (d?.device && d?.donors) {
                            data.push({
                                name: d?.device,
                                value: d?.donors,
                            });
                        } else {
                            shouldAppend = true;
                            other.value += d?.donors;
                        }
                    }
                }
            } else if (chart === 'QSEarnByCountry') {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        if (d?.country && d?.sum_earning) {
                            data.push({
                                name: d?.country,
                                value: Number(d?.sum_earning),
                            });
                        } else {
                            shouldAppend = true;
                            other.value += Number(d?.sum_earning);
                        }
                    }
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    if (list[i]) {
                        let d = list[i];
                        data.push({
                            name: d.name,
                            value: d.value,
                        });
                    }
                }
            }
        }
        let start: number = 4;
        let end: number = list?.length;
        while (start < end) {
            if (list[start]) {
                shouldAppend = true;
                let d = list[start];
                if (chart === 'country') {
                    other.value += parseInt(d.pageviews);
                } else if (chart === 'device') {
                    other.value += parseInt(d.pageviews);
                } else if (chart === 'CFEarnByCountry') {
                    other.value += d?.sum_earnings;
                } else if (chart === 'CFEarnByDevices') {
                    other.value += d?.sum_earnings;
                } else if (chart === 'CFDonorByCountry') {
                    other.value += d?.donors;
                } else if (chart === 'CFDonorByDevices') {
                    other.value += d?.donors;
                } else if (chart === 'QSEarnByCountry') {
                    other.value += Number(d?.sum_earning);
                } else {
                    other.value += d.value;
                }
            }
            start++;
        }
        const newData = data.sort((a: any, b: any) => b.value - a.value);
        if (shouldAppend) {
            newData.push(other);
        }
        return newData;
    }, [list, chart]);

    const data = graph;

    return (
        <div className="rounded-lg drop-shadow-md bg-white px-3  h-full">
            <div className="border-b border-solid border-gray-400 py-4 text-center text-[24px] font-bold text-[#056433] inter">{title}</div>

            {!loading && (
                <div className="flex flex-row mt-4 justify-center items-center">
                    <div className="w-1/2 ">
                        <ResponsiveContainer width="100%" height={200} className="-mt-4">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                                    {data.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 mt-4">
                        {data.map((item: any, key: number) => {
                            return (
                                <div key={key} className="flex flex-row justify-between mr-4 mb-2 ">
                                    <div className="flex flex-row items-center w-2/3">
                                        <div>
                                            <VscCircleFilled color={COLORS[key % COLORS.length]} />
                                        </div>
                                        <div className="text-[14px] inter font-medium">{item.name}</div>
                                    </div>
                                    <div className="w-1/3 flex justify-end text-[14px] inter text-[#615E83] ">
                                        {prefix}
                                        {prefix === '$' ? commaSeperator(parseFloat(item.value).toFixed(2)) : commaSeperator(String(item.value))}
                                        {suffix}
                                    </div>
                                    {compaison && (
                                        <div className="w-1/3 text-[14px] inter text-center text-[#615E83]" style={parseInt(item.value) >= 0 ? { color: 'green' } : { color: 'red' }}>
                                            ({prefix}
                                            {item.value}
                                            {suffix})
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
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

export default SimplePieChart;
