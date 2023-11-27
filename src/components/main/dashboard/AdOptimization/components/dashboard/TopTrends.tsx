import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/RootReducer';
import { commaSeperator } from '../../../../../../utils/Validation';
import PTable from '../../../../../common/Table';
import AdOptDashboardAction from '../../redux/actions';
import { TopTrend } from '../../redux/types';
import DeltaBox from '../../../../../common/DeltaBox';
import { useNavigate } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';

type Props = {
    startDate?: string;
    endDate?: string;
    revenueType?: string;
    comparison?: boolean;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    ad_server?: string;
};

const TopTrends: React.FC<Props> = ({ startDate, endDate, revenueType, comparison, compare, compare_start_date, compare_end_date, ad_server }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state: RootState) => state.adOptDashboard.topTrendLoading);
    const data = useSelector((state: RootState) => state.adOptDashboard.topTrends);

    useEffect(() => {
        if (startDate && endDate && ad_server) {
            dispatch(
                AdOptDashboardAction.fetchTopTrends({
                    start_date: startDate,
                    end_date: endDate,
                    compare: compare,
                    compare_start_date: compare_start_date,
                    compare_end_date: compare_end_date,
                    ad_server: ad_server,
                }),
            );
        }
    }, [startDate, endDate, dispatch, compare, compare_start_date, compare_end_date, ad_server]);

    const redirectToDetail = (id: string) => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}/${id}`);
    };

    const columns = [
        {
            dataIndex: 'site_name',
            title: 'Name',
            render: (text: string, row: TopTrend) => (
                <div className="justify-end">
                    <span className="underline" onClick={() => redirectToDetail(row.site_id)}>
                        {text}
                    </span>
                </div>
            ),
            sorter: (a: TopTrend, b: TopTrend) => String(a.site_name).localeCompare(String(b.site_name)),
        },
        {
            dataIndex: 'total_request',
            title: 'Requests',
            render: (text: string, row: TopTrend) => {
                return (
                    <div className="flex items-center justify-end">
                        <span>{commaSeperator(String(text))}</span>
                        {comparison && <DeltaBox row={row.total_request_percentage} />}
                    </div>
                );
            },
            sorter: (a: TopTrend, b: TopTrend) => a.total_request - b.total_request,
        },
        {
            dataIndex: 'impressions',
            title: 'Impressions',
            render: (text: string, row: TopTrend) => {
                return (
                    <div className="flex items-center justify-end">
                        <span>{commaSeperator(String(row.total_impressions))}</span>
                        {comparison && <DeltaBox row={row.impressions_percentage} />}
                    </div>
                );
            },
            sorter: (a: TopTrend, b: TopTrend) => parseInt(a.impressions || '0') - parseInt(b.impressions || '0'),
        },
        {
            dataIndex: 'revenue',
            title: 'Revenue',
            render: (text: string, row: TopTrend) => (
                <div className="flex items-center justify-end">
                    <span>${commaSeperator(parseFloat(revenueType === 'net' ? row.net_total_revenue : row.gross_total_revenue).toFixed(2) || '0')}</span>
                    {comparison && <DeltaBox row={revenueType === 'net' ? row.net_revenue_percentage : row.gross_revenue_percentage} />}
                </div>
            ),
            sorter: (a: TopTrend, b: TopTrend) => (revenueType === 'net' ? parseFloat(a.net_total_revenue || '0') - parseFloat(b.net_total_revenue || '0') : parseFloat(a.gross_total_revenue || '0') - parseFloat(b.gross_total_revenue || '0')),
        },
    ];

    return (
        <div className="pt-6 pb-4">
            <div className='flex'>
                <p className="roboto-medium leading-7 text-2xl">Top Trends</p>
                <div className='tooltip'>
                    <svg className="w-6 h-8 ml-1 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <span className="tooltipText">Sorted by Revenue growth, with a minimum of $1,000 revenue growth</span>
                </div>
            </div>

            <div className="pt-4">
                <PTable columns={columns} data={data} className="dashboard_table" rowKey={(d: TopTrend) => `${d.site_id}_${Math.random()}`} loading={loading} />
            </div>
        </div>
    );
};

export default TopTrends;
