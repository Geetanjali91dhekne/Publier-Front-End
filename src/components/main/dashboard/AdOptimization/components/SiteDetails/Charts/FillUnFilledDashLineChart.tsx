import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, TooltipProps } from 'recharts';
import { VscCircleFilled } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import { Empty, Spin } from 'antd';
import moment from 'moment';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { commaSeperator } from '../../../../../../../utils/Validation';

const FillUnFilledDashLineChart: React.FC = () => {
    const data = useSelector((state: RootState) => state.adOptDashboard.fillUnfillUnrendered);
    const loading = useSelector((state: RootState) => state.adOptDashboard.fillUnfillUnrenderedLoading);
    return (
        <div className=" bg-white pt-4 rounded-xl drop-shadow-md">
            <div className="mx-8 py-4 mb-8 flex flex-row items-center justify-between border-b border-solid">
                <div>
                    <div>
                        <span className="inter font-bold text-[#1E1B39] text-[22px] mr-1">Fill% </span>vs
                        <span className="inter font-bold text-[#1E1B39] text-[22px] mx-1">Unfilled%</span>vs
                        <span className="inter font-bold text-[#1E1B39] text-[22px] mx-1">Unrendered%</span>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#296140" />
                        </div>
                        <div className="inter">Filled</div>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#869F90" />
                        </div>
                        <div className="inter">Unfilled</div>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#42F533" />
                        </div>
                        <div className="inter">Unrendered</div>
                    </div>
                </div>
            </div>
            {!loading && data?.length !== 0 && (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickFormatter={(date) => {
                                return moment(date).format('MM-DD-YYYY');
                            }}
                            tick={{ fill: '#615E83', fontSize: '0.7rem', fontFamily: 'Inter' }}
                        />
                        <YAxis unit={'%'} width={50} axisLine={false} tickLine={false} tick={{ fill: '#615E83', fontSize: '0.7rem', fontFamily: 'Inter' }} />
                        <Tooltip content={<CustomTooltip />} />

                        <Line type="linear" dataKey="filled" stroke="#296140" strokeWidth={3} label={<CustomizedLabel color="#296140" />} />
                        <Line type="linear" dataKey="unfilled" stroke="#869F90" strokeWidth={3} label={<CustomizedLabel color="#869F90" />} />
                        <Line type="linear" dataKey="unrendered" stroke="#42F533" strokeWidth={3} label={<CustomizedLabel color="#42F533" />} />
                    </LineChart>
                </ResponsiveContainer>
            )}
            {!loading && data?.length === 0 && (
                <div className="flex justify-center items-center h-40">
                    <Empty description={'No data found'} />
                </div>
            )}
            {loading && (
                <div className="flex justify-center items-center h-16">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default FillUnFilledDashLineChart;

const CustomTooltip = ({ active, payload, label, labelClassName, wrapperClassName }: TooltipProps<ValueType, NameType>) => {
    if (active) {
        return (
            <div className="shadow rounded" style={{ background: 'rgba(30, 30, 30, 0.8)' }}>
                <div className="px-4 py-1" style={{ background: 'rgba(0, 0, 0, 0.7)', borderBottom: '1px solid #333' }}>
                    <p className="label text-xs roboto-medium text-white">{moment((payload && payload.length > 0 && payload[0].payload?.date) || label).format(`DD-MMM-YYYY`)}</p>
                </div>
                <div className="desc px-4 py-1 text-center">
                    {payload?.map((p, index) => (
                        <div key={`${index}_${p.name}`} className={'text-xs text-white flex justify-between items-center'}>
                            <p className="capitalize">{p.name}:&nbsp;</p>
                            <p>
                                {labelClassName ? ` ${labelClassName}${commaSeperator(parseFloat(String(p.value || 0)).toFixed(2))}` : commaSeperator(parseFloat(String(p.value || 0)).toFixed(2))}
                                {' %'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};
type props = {
    x?: number;
    y?: number;
    value?: any;
    color?: string;
};
const CustomizedLabel = ({ x, y, value, color }: props) => {
    return (
        <text x={x} y={y} dy={-5} fill={color} fontSize={10} textAnchor="middle">
            {parseFloat(value).toFixed(2)}%
        </text>
    );
};
