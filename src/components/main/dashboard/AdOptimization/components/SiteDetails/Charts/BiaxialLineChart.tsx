import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { VscCircleFilled } from 'react-icons/vsc';
import { Empty, Spin } from 'antd';
import { TooltipProps, } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { commaSeperator, numberFormatter } from '../../../../../../../utils/Validation';

type Props = {
     title1: string;
     title2: string;
     value1: string;
     value2: string;
     data: any;
     loading?: boolean;
     suffix?: string;
     prefix1?: string;
     prefix2?: string;
};


const BiaxialLineChart: React.FC<Props> = ({ title1, title2, value1, value2, data, loading, suffix, prefix1, prefix2 }) => {

     const formatterRight = (value: string | number) => `${String(numberFormatter(Number(value)))}`;
     const formatterLeft = (value: string | number) => `${prefix1 ? prefix1 : " "}${String(numberFormatter(Number(value)))}`;

     return (
          <div className="py-6 bg-white pb-2  rounded-xl drop-shadow-md">
               {!loading && (
                    <>
                         <div className="flex flex-row justify-between mx-6 text-gray-500">
                              <div >
                                   <div className='flex flex-row items-center'>
                                        <VscCircleFilled color="#056433" />
                                        <div className="text-[#9291A5] inter">{title1}</div>
                                   </div>
                                   <div>
                                        <p className="my-2 text-[#1E1B39] px-2 inter font-bold text-lg">{value1}</p>
                                   </div>
                              </div>
                              <div >
                                   <div className='flex flex-row items-center ' >
                                        <VscCircleFilled color="#979797" />
                                        <div className="text-[#9291A5] inter">{title2}</div>
                                   </div>
                                   <div className='flex flex-row justify-end' >
                                        <p className="my-2 text-[#1E1B39]  inter font-bold text-lg">{value2}</p>
                                   </div>
                              </div>

                         </div>
                         {
                              data?.length !== 0 ?
                                   <ResponsiveContainer height={285} width="100%">
                                        <LineChart
                                             data={data?.map((d: any) => {
                                                  return { ...d, revenue: parseFloat(d.revenue), request: parseInt(d.request) }
                                             })}
                                             margin={{
                                                  top: 10,
                                                  right: 0,
                                                  bottom: 40,
                                                  left: 0,
                                             }}
                                        >

                                             <XAxis dataKey="hour" tickMargin={20} tick={{ fill: '#615E83', fontSize: '0.7rem', fontFamily: 'Inter' }} />
                                             <YAxis tickFormatter={formatterLeft} yAxisId="left" tickCount={10} tick={{ fill: '#615E83', fontSize: '0.8rem', fontFamily: 'Inter' }} />
                                             <YAxis yAxisId="right" tickFormatter={formatterRight} tickCount={10} orientation="right" tick={{ fill: '#615E83', fontSize: '0.8rem', fontFamily: 'Inter' }} />
                                             <Tooltip content={<CustomTooltip />} />
                                             <Line yAxisId="left" type="monotone" dot={false} dataKey="revenue" stroke="#056433" strokeWidth={3} />
                                             <Line yAxisId="right" type="monotone" dot={false} dataKey="request" stroke="#CCCDCDB2" strokeWidth={3} />
                                        </LineChart>
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

export default React.memo(BiaxialLineChart);

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
                                   <p>{p.name === 'revenue' ? 'Revenue: ' : 'Request: '}&nbsp;</p>
                                   <p>{labelClassName ? ` ${p.name === 'revenue' ? '$' : ''}${commaSeperator(String(p.value))}` : `${p.name === 'revenue' ? '$' : ''}${commaSeperator(String(p.value || 0))}`}</p>
                              </div>
                         ))}
                    </div>
               </div>
          );
     }

     return null;
};
