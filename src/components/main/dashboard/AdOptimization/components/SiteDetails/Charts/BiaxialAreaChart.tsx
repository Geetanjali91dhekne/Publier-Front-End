import React from 'react';
import { Empty, Spin } from 'antd';

import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, TooltipProps } from 'recharts';
import { commaSeperator, numberFormatter } from '../../../../../../../utils/Validation';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

type Props = {
    data: any;
    totalPageView: number;
    loading?: boolean;
};
function BiaxialAreaChart({ data, totalPageView, loading }: Props) {

    const formatter = (value: string | number) => `${String(numberFormatter(Number(value)))}`;
    return (
        <div className="py-6 bg-white pb-2  rounded-xl drop-shadow-md mt-8">
            {!loading && (
                <>
                    <div className="flex justify-between mb-3">
                        <div className="ml-20 pl-3 border-l-[6px] border-l-[#056433]">
                            <p>Page Views</p>
                            <p className="font-bold text-[26px]">{numberFormatter(totalPageView)}</p>
                        </div>
                        {/* <div className="mr-20 pr-3 flex flex-col items-end border-r-[6px] border-r-[#965C08]">
                            <p>Impressions</p>
                            <p className="font-bold text-[26px]">{numberFormatter(totalImpression)}</p>
                        </div> */}
                    </div>
                    {data?.length !== 0 ?
                        <ResponsiveContainer width="100%" height={500}>
                            <ComposedChart
                                width={500}
                                height={400}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 20,
                                    bottom: 20,
                                }}
                            >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#056433" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#056433" stopOpacity={0.2} />
                                    </linearGradient>
                                    {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#965C08" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#FECA7F" stopOpacity={0.2} />
                                    </linearGradient> */}
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="hour" tickMargin={20} tick={{ fill: '#615E83', fontSize: '0.7rem', fontFamily: 'Inter' }} />
                                <YAxis yAxisId="left"
                                    tickFormatter={formatter}
                                    tick={{ fill: '#615E83', fontSize: '0.8rem', fontFamily: 'Inter' }} />
                                {/* <YAxis yAxisId="right" orientation="right"
                                    tickFormatter={formatter}
                                    tick={{ fill: '#615E83', fontSize: '0.8rem', fontFamily: 'Inter' }} /> */}
                                <Tooltip content={<CustomTooltip />} />
                                <Area yAxisId="left" type="monotone" dataKey="page_view" stackId="1" stroke="#8884d8" fill="url(#colorUv)" />
                                {/* <Area yAxisId="right" type="monotone" dataKey="impressions" stackId="1" stroke="#82ca9d" fill="url(#colorPv)" /> */}
                            </ComposedChart>
                        </ResponsiveContainer>
                        :
                        <div className="flex justify-center items-center h-40">
                            <Empty description={'No data found'} />
                        </div>
                    }
                </>
            )}
            {loading && (
                <div className="flex align-center justify-center">
                    <Spin className="m-auto" />
                </div>
            )}
        </div>
    );
}

export default React.memo(BiaxialAreaChart);

const CustomTooltip = ({ active, payload, label, labelClassName, wrapperClassName }: TooltipProps<ValueType, NameType>) => {
    if (active) {
        return (
            <div className="shadow rounded" style={{ background: 'rgba(30, 30, 30, 0.8)' }}>
                <div className="px-4 py-1" style={{ background: 'rgba(0, 0, 0, 0.7)', borderBottom: '1px solid #333' }}>
                    <p className="label text-xs roboto-medium text-white">{label}</p>
                </div>
                <div className="desc px-4 py-1 text-center">
                    {payload?.map((p, index) => (
                        <div key={`${index}_${p.name}`} className={'text-xs text-white flex justify-between items-center'}>
                            <p>
                                {p.name === 'page_view' ? 'Page Views' : 'Impressions'}
                                {' : '}&nbsp;
                            </p>
                            <p>{labelClassName ? ` ${labelClassName}${commaSeperator(parseFloat(String(p.value || 0)).toFixed(2))}` : commaSeperator(String(p.value || 0))}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};
