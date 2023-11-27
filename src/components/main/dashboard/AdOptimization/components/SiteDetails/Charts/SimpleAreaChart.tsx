import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { VscCircleFilled } from 'react-icons/vsc';
import { Empty, Spin } from 'antd';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { commaSeperator } from '../../../../../../../utils/Validation';

type Props = {
    title: string;
    value: string;
    data: any;
    loading?: boolean;
    compaison: boolean;
    suffix?: string;
    prefix?:string;
};

const SimpleAreaChart: React.FC<Props> = ({ title, value, data, loading, compaison, suffix ,prefix}) => {
    const formatter = (value: string | number) => `${prefix ? prefix : " "}${commaSeperator(String(value))}`;

    return (
        <div className="py-6 bg-white pb-2  rounded-xl drop-shadow-md">
            {!loading && (
                <>
                    <div className="flex flex-row justify-between mx-6 text-gray-500">
                        <div className="text-[#9291A5] inter">{title}</div>
                        <div className="flex flex-row items-center">
                            <div>{compaison ? <VscCircleFilled color="#979797" /> : null}</div>
                            <div className="inter text-[#615E83] text-sm">{compaison ? 'Previous Period' : null}</div>
                        </div>
                    </div>
                    <p className="my-2 text-[#1E1B39] px-6 inter font-bold text-2xl">{value}</p>
                    {data?.length !== 0 ?
                        <ResponsiveContainer height={280} width="100%">
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 15,
                                    bottom: 40,
                                    left: 15,
                                }}
                            >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#056433" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#056433" stopOpacity={0.2} />
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#CCCDCDB2" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#CCCDCDB2" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                {/* <CartesianGrid stroke="#f5f5f5" /> */}
                                <XAxis dataKey="name" padding={{ right: 20 }} tickCount={2} tickMargin={20} tick={{ fill: '#615E83', fontSize: '0.7rem', fontFamily: 'Inter' }} />
                                <YAxis tickFormatter={formatter} tick={{ fill: '#615E83', fontSize: '0.8rem', fontFamily: 'Inter' }} />
                                <Tooltip content={<CustomTooltip labelClassName={suffix ? suffix : ''} />} />
                                <Area type="linear" name="amount" dataKey="amt" stroke="#056433" strokeWidth={2} fill="url(#colorUv)" />
                                {compaison ? <Area type="linear" name="previous" dataKey="prev" stroke="#979797" strokeWidth={2} fill="url(#colorPv)" /> : null}
                            </AreaChart>
                        </ResponsiveContainer>
                        :
                        <div className="flex justify-center items-center h-[280]">
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
};

export default React.memo(SimpleAreaChart);

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
                            <p>{'Amount : '}&nbsp;</p>
                            <p>{labelClassName ? ` ${labelClassName}${commaSeperator(parseFloat(String(p.value || 0)).toFixed(2))}` : commaSeperator(String(p.value || 0))}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};
