import React, { useEffect } from 'react';
import PCard from '../../../../../../common/Card';
import { useDispatch, useSelector } from 'react-redux';
import AdOptDashboardAction from '../../../redux/actions';
import { RootState } from '../../../../../../../store/RootReducer';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { HEADERMENU_PATH } from '../../../../../../../routes/RoutesURL';
import { commaSeperator, numberFormatter } from '../../../../../../../utils/Validation';
import DeltaBox from '../../../../../../common/DeltaBox';

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

const AdOptimizationTopCards: React.FC<Props> = ({ startDate, endDate, revenueType, comparison, compare, compare_start_date, compare_end_date, ad_server }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchTopAdOpt = useSelector((state: RootState) => state.adOptDashboard.topAdOpt);
    const fetcAdOptLoading = useSelector((state: RootState) => state.adOptDashboard.topAdOptLoader);
    const fetchTopCpm = useSelector((state: RootState) => state.adOptDashboard.topCpm);
    const fetchTopCpmLoader = useSelector((state: RootState) => state.adOptDashboard.topCpmLoader);

    useEffect(() => {
        if (startDate && endDate && ad_server) {
            dispatch(
                AdOptDashboardAction.fetchTopCardAdOpt({
                    end_date: endDate,
                    start_date: startDate,
                    compare: compare,
                    compare_start_date: compare_start_date,
                    compare_end_date: compare_end_date,
                    ad_server: ad_server,
                }),
            );
        }
    }, [startDate, endDate, dispatch, compare, compare_start_date, compare_end_date, ad_server]);

    useEffect(() => {
        if (startDate && endDate && ad_server) {
            dispatch(
                AdOptDashboardAction.fetchTopCardRevenueCPM({
                    end_date: endDate,
                    start_date: startDate,
                    revenue: revenueType,
                    compare: compare,
                    compare_start_date: compare_start_date,
                    compare_end_date: compare_end_date,
                    ad_server: ad_server,
                }),
            );
        }
    }, [startDate, endDate, revenueType, dispatch, compare, compare_start_date, compare_end_date, ad_server]);

    const tops = [
        {
            title: 'Revenue',
            percentage: fetchTopCpm?.revenue_percentage && parseFloat(String(fetchTopCpm?.revenue_percentage)).toFixed(2),
            isUp: (fetchTopCpm?.revenue_percentage || 0) > 0,
            value: fetchTopCpm?.total_revenue && `$${commaSeperator(String(Number(fetchTopCpm?.total_revenue).toFixed(2)))}`,
            loading: fetchTopCpmLoader,
            text: fetchTopAdOpt?.total_request !== undefined && `Previous Period: $${commaSeperator(String(Number(fetchTopCpm?.previous_total_revenue).toFixed(2)))}`,
            key: 'revenue',
            gam:'ON'
        },
        {
            title: 'Monetized Impressions',
            percentage: fetchTopAdOpt?.total_impressions_percentage && parseFloat(String(fetchTopAdOpt.total_impressions_percentage)).toFixed(2),
            isUp: (fetchTopAdOpt?.total_impressions_percentage || 0) > 0,
            value: fetchTopAdOpt?.total_impressions && `${commaSeperator(String(fetchTopAdOpt?.total_impressions))}`,
            text: fetchTopAdOpt?.total_request !== undefined && `Previous Period: ${commaSeperator(String(fetchTopAdOpt?.previous_total_impressions))}`,
            loading: fetcAdOptLoading,
            key: 'monetizedimpression',
            gam:'ON'
        },
        {
            title: 'Ad Requests',
            percentage: fetchTopAdOpt?.total_request_percentage && parseFloat(String(fetchTopAdOpt.total_request_percentage)).toFixed(2),
            isUp: (fetchTopAdOpt?.total_request_percentage || 0) > 0,
            value: fetchTopAdOpt?.total_request && commaSeperator(String(fetchTopAdOpt.total_request)),
            text: fetchTopAdOpt?.total_pageview && `Previous Period: ${commaSeperator(String(fetchTopAdOpt.previous_total_request))}`,
            loading: fetcAdOptLoading,
            key: 'adrequest',
            gam:ad_server
        },
        {
            title: 'CPM',
            percentage: fetchTopCpm?.total_cpms_percentage && parseFloat(String(fetchTopCpm.total_cpms_percentage)).toFixed(2),
            isUp: (fetchTopCpm?.total_cpms_percentage || 0) > 0,
            value: fetchTopCpm?.total_cpms && `$${parseFloat(String(fetchTopCpm.total_cpms)).toFixed(2)}`,
            loading: fetchTopCpmLoader,
            text: fetchTopCpm?.total_revenue && fetchTopAdOpt?.total_impressions && `Previous Period: $${parseFloat(String(fetchTopCpm.previous_total_cpms)).toFixed(2)}`,
            key: 'cpm',
            gam:'ON'
        },
        {
            title: 'Fill Rate',
            percentage: fetchTopAdOpt?.total_fill_rate_percentage && parseFloat(String(fetchTopAdOpt?.total_fill_rate_percentage)).toFixed(2),
            isUp: (fetchTopAdOpt?.total_fill_rate_percentage || 0) > 0,
            value: fetchTopAdOpt?.total_fill_rate && `${Number(numberFormatter(fetchTopAdOpt.total_fill_rate)).toFixed(2)}%`,
            loading: fetcAdOptLoading,
            text: fetchTopAdOpt?.total_impressions && fetchTopAdOpt?.total_request && `Previous Period: ${fetchTopAdOpt?.previous_total_fill_rate?.toFixed(2)}%`,
            key: 'fetchTopALl',
            gam:ad_server
        },
    ];

    //TODO: Update this

    return (
        <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {tops.map((t, index) => (
                    t?.gam === "ON" && <PCard
                        className="px-4 py-3 pb-2 w-full cursor-pointer topCard rounded-lg flex flex-col justify-between"
                        key={`${index}_${t.title}`}
                        onClick={() => navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}?key=${t.key}`)}
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

export default AdOptimizationTopCards;
