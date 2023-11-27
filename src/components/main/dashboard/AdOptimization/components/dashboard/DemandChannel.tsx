import React, { useEffect, useMemo } from 'react';

import PTable from '../../../../../common/Table';
import { RootState } from '../../../../../../store/RootReducer';
import { useDispatch, useSelector } from 'react-redux';
import AdOptDashboardAction from '../../redux/actions';
import { commaSeperator } from '../../../../../../utils/Validation';
import { DemandChannel } from '../../redux/types';
import DeltaBox from '../../../../../common/DeltaBox';
type Props = {
    startDate?: string;
    endDate?: string;
    revenueType?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    ad_server?: string;
    comparison?: boolean;
};
const DemandChannelList: React.FC<Props> = ({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, ad_server, comparison }) => {
    const dispatch = useDispatch();

    const loading = useSelector((state: RootState) => state.adOptDashboard.demandChannelLoading);
    const data = useSelector((state: RootState) => state.adOptDashboard.demandChannel);

    useEffect(() => {
        if (startDate && endDate && ad_server) {
            dispatch(
                AdOptDashboardAction.fetchDemandChannel({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    compare: compare,
                    compare_start_date: compare_start_date,
                    compare_end_date: compare_end_date,
                    ad_server: ad_server,
                }),
            );
        }
    }, [startDate, endDate, dispatch, revenueType, compare, compare_start_date, compare_end_date, ad_server]);

    const columns = [
        {
            dataIndex: 'network_name',
            title: 'Name',
            render: (text: string) => <span>{text}</span>,
            sorter: (a: DemandChannel, b: DemandChannel) => String(a.network_name).localeCompare(String(b.network_name)),
        },
        {
            dataIndex: 'total_impressions',
            title: 'Impression Share',
            render: (text?: string, row?: DemandChannel) => {
                return (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(text)}` : ''}</span>
                        {comparison && <DeltaBox row={row?.impressions_percentage} />}
                    </div>
                );
            },
            sorter: (a: DemandChannel, b: DemandChannel) => parseInt(a.total_impressions) - parseInt(b.total_impressions),
        },
        {
            dataIndex: 'total_revenue',
            title: 'Revenue',
            render: (text?: string, row?: DemandChannel) => (
                <div className="flex justify-end">
                    <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : ''}</span>
                    {comparison && <DeltaBox row={row?.revenue_percentage} />}
                </div>
            ),
            sorter: (a: DemandChannel, b: DemandChannel) => parseFloat(a.total_revenue || '0') - parseFloat(b.total_revenue || '0'),
        },
        {
            dataIndex: 'total_cpm',
            title: 'CPM',
            render: (text?: string, row?: DemandChannel) => (
                <div className="flex justify-end">
                    <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : ''}</span>
                    {comparison && <DeltaBox row={row?.total_cpm_percentage} />}
                </div>
            ),
            sorter: (a: DemandChannel, b: DemandChannel) => parseFloat(a.total_cpm || '0') - parseFloat(b.total_cpm || '0'),
        },
    ];

    useMemo(() => {
        data?.sort((a: any, b: any) => {
            return String(a.network_name).localeCompare(String(b.network_name));
        });
    }, [data]);
    
    return (
        <div className="pt-6 pb-4">
            <p className="roboto-medium leading-7 text-2xl">Demand Partners</p>
            <div className="pt-4">
                <PTable columns={columns} data={data} pagination={{isShow:true }} className="dashboard_table" rowKey={(d) => `${d.network_id}_${Math.random()}`} loading={loading} />
            </div>
        </div>
    );
};

export default DemandChannelList;
