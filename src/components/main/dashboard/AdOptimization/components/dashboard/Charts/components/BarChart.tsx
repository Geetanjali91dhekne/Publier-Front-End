import moment from 'moment';
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps } from 'recharts';
import PCard from '../../../../../../../common/Card';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Empty, Spin } from 'antd';
import { GraphData } from '../../../../redux/types';
import { commaSeperator } from '../../../../../../../../utils/Validation';

type Props = {
    data: GraphData[];
    loading: boolean;
    suffix?: string;
    prefix?: string;
};

const AdOptBarChart: React.FC<Props> = ({ data, loading, suffix, prefix }) => {
    const formatter = (value: string | number) => `${suffix ? suffix : ''}${commaSeperator(String(value))}${prefix ? prefix : ''}`;
    const formatterX = (value: string | number) => `${moment(value).format(`MM-DD-YYYY`)}`;

    return (
        <>
            {!loading && data.length > 0 && (
                <PCard className="rounded-lg py-4 ">
                    <ResponsiveContainer height={400} width="99%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 10,
                                bottom: 44,
                                left: 40,
                            }}
                            // onMouseMove={(state) => {
                            //     if (state.isTooltipActive) {
                            //         setFocusBar(state.activeTooltipIndex);
                            //     } else {
                            //         setFocusBar(undefined);
                            //     }
                            // }}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#056433" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#056433" stopOpacity={0.6} />
                                </linearGradient>
                            </defs>
                            {/* <CartesianGrid stroke="#ededed" /> */}
                            <XAxis dataKey="date"  stroke="#fff" tickMargin={20} tickFormatter={formatterX} tick={{ fill: '#615E83', fontSize: '0.7rem', fontFamily: 'Inter' }} />
                            <YAxis tickLine={false} axisLine={false} type="number" allowDataOverflow={false} tickFormatter={formatter} tick={{ fill: '#615E83', fontSize: '0.8rem', fontFamily: 'Inter' }} />
                            <Tooltip cursor={false} content={<CustomTooltip labelClassName={suffix} wrapperClassName={prefix} />} />
                            <Bar dataKey="value" fillOpacity={1} fill="url(#colorUv)" radius={4} background={{ fill: 'rgba(5, 100, 51, 0.05)', radius: 5 }}>
                                {/* {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={focusBar === index ? '#056433' : '#c3dace'} />
                                ))} */}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </PCard>
            )}
            {loading && (
                <div className="flex justify-center items-center h-96">
                    <Spin />
                </div>
            )}
            {!loading && data.length === 0 && (
                <div className="flex justify-center items-center h-96">
                    <Empty description={'No data found'} />
                </div>
            )}
        </>
    );
};

export default AdOptBarChart;

const CustomTooltip = ({ active, payload, label, labelClassName, wrapperClassName }: TooltipProps<ValueType, NameType>) => {
    if (active) {
        return (
            <div className="shadow rounded" style={{ background: 'rgba(30, 30, 30, 0.8)' }}>
                <div className="px-4 py-1" style={{ background: 'rgba(0, 0, 0, 0.7)', borderBottom: '1px solid #333' }}>
                    <p className="label text-xs roboto-medium text-white">{moment((payload && payload.length > 0 && payload[0].payload?.date) || label).format(`DD-MMM-YYYY`)}</p>
                </div>
                <div className="desc px-4 py-1 text-center">
                    {payload?.map((p, index) => (
                        <div key={`${index}_${p.name}`} className={'text-xs text-white'}>
                            {labelClassName !== 'undefined' ? labelClassName : ''}
                            {labelClassName === undefined && wrapperClassName === undefined ? Number.isInteger(p.value) === false?commaSeperator(parseFloat(String(p.value || 0)).toFixed(2)): commaSeperator(String(p.value || 0)) : commaSeperator(parseFloat(String(p.value || 0)).toFixed(2))}
                            {wrapperClassName !== 'undefined' ? wrapperClassName : ''}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};
