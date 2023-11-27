import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import PCard from '../../../../../../common/Card';
import DeltaBox from '../../../../../../common/DeltaBox';
import { HEADERMENU_PATH } from '../../../../../../../routes/RoutesURL';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import SubsDashboardAction from '../../../redux/actions';
import { commaSeperator } from '../../../../../../../utils/Validation';

type Props = {
    startDate: any;
    endDate: any;
    revenueType: any;
    comparison: boolean;
    compare: boolean;
    compare_start_date: any;
    compare_end_date: string;
    siteId: any;
};

const SubscriptionsTopCards: React.FC<Props> = ({ startDate, endDate, revenueType, comparison, compare, compare_start_date, compare_end_date, siteId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const topdata = useSelector((state: RootState) => state.subsDashboard.subscritptionTopCard);
    const loading = useSelector((state: RootState) => state.subsDashboard.subscritptionTopCardLoader);
    const [dates, setDates] = useState<{
        start_date?: string;
        end_date?: string;
        revenue?: string;
        compare?: boolean;
        compare_start_date?: string;
        compare_end_date?: string;
        site_id?: string;
    }>({
        start_date: undefined,
        end_date: undefined,
        revenue: undefined,
        compare: undefined,
        compare_start_date: undefined,
        compare_end_date: undefined,
        site_id: undefined,
    });

    useEffect(() => {
        if (startDate && endDate) {
            if (
                dates.start_date !== startDate ||
                dates.end_date !== endDate ||
                dates.revenue !== revenueType ||
                dates.site_id !== siteId ||
                (compare && (dates.compare_start_date !== compare_start_date || dates.compare_end_date !== compare_end_date))
            ) {
                setDates({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    compare: compare,
                    compare_start_date: compare_start_date,
                    compare_end_date: compare_end_date,
                    site_id: siteId,
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionTopCard({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }
        }
    }, [dispatch, dates, startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, siteId]);

    const tops = [
        {
            title: 'Revenue',
            percentage: topdata?.revenue_percentage && parseFloat(String(topdata?.revenue_percentage)).toFixed(2),
            isUp: (topdata?.revenue_percentage || 0) > 0,
            value: topdata?.total_revenue && `$${commaSeperator(String(Number(topdata?.total_revenue).toFixed(2)))}`,
            loading: loading,
            text: topdata?.previous_total_revenue !== undefined && `Previous Period: $${commaSeperator(String(Number(topdata?.previous_total_revenue).toFixed(2)))}`,
            key: 'revenue',
        },
        {
            title: 'Active Subscriptions',
            percentage: topdata?.active_sub_percentage && parseFloat(String(topdata?.active_sub_percentage)).toFixed(2),
            isUp: (topdata?.active_sub_percentage || 0) > 0,
            value: topdata?.total_active_sub && `${commaSeperator(String(Number(topdata?.total_active_sub)))}`,
            loading: loading,
            text: topdata?.previous_total_active_sub !== undefined && `Previous Period: ${commaSeperator(String(Number(topdata?.previous_total_active_sub)))}`,
            key: 'Active Subscriptions',
        },
        {
            title: 'New Subscriptions',
            percentage: topdata?.new_sub_percentage && parseFloat(String(topdata?.new_sub_percentage)).toFixed(2),
            isUp: (topdata?.new_sub_percentage || 0) > 0,
            value: topdata?.total_new_sub && `${commaSeperator(String(Number(topdata?.total_new_sub)))}`,
            loading: loading,
            text: topdata?.previous_total_new_sub !== undefined && `Previous Period: ${commaSeperator(String(Number(topdata?.previous_total_new_sub)))}`,
            key: 'New Subscriptions',
        },
        {
            title: 'Unsubscriptions',
            percentage: topdata?.unsub_percentage && parseFloat(String(topdata?.unsub_percentage)).toFixed(2),
            isUp: (topdata?.unsub_percentage || 0) > 0,
            value: topdata?.total_unsub && `${commaSeperator(String(Number(topdata?.total_unsub)))}`,
            loading: loading,
            text: topdata?.previous_total_unsub !== undefined && `Previous Period: ${commaSeperator(String(Number(topdata?.previous_total_unsub)))}`,
            key: 'UnSubscriptions',
        },
        {
            title: 'RPM',
            percentage: topdata?.rpm_percentage && parseFloat(String(topdata?.rpm_percentage)).toFixed(2),
            isUp: (topdata?.rpm_percentage || 0) > 0,
            value: topdata?.total_rpm && `$${commaSeperator(String(Number(topdata?.total_rpm).toFixed(2)))}`,
            loading: loading,
            text: topdata?.previous_total_rpm !== undefined && `Previous Period: $${commaSeperator(String(Number(topdata?.previous_total_rpm).toFixed(2)))}`,
            key: 'rpm',
        },
    ];

    return (
        <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {tops.map((t, index) => (
                    <PCard
                        className="px-4 py-3 pb-2 w-full cursor-pointer topCard rounded-lg flex flex-col justify-between"
                        key={`${index}_${t.title}`}
                        onClick={() => navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.subscriptions}?key=${t.key}&&id=${siteId ? siteId : ''}`)}
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-xs roboto-medium color-056433 title">{t.title}</p>
                            {!t.loading ? comparison && <DeltaBox width="w-auto" row={t.percentage} /> : <div className="h-7" />}
                        </div>
                        <div className="my-4 mb-3">
                            {!t.loading && <p className="roboto-medium font-semibold text-2xl value">{t.value}</p>}
                            {t.loading && (
                                <div className="flex justify-center items-center">
                                    <Spin />
                                </div>
                            )}
                        </div>
                        {t.text ? comparison && <p className="text-xs roboto text">{t.text}</p> : <div className="h-4" />}
                    </PCard>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionsTopCards;
