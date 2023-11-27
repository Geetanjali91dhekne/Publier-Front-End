import React, { useEffect } from 'react';
import { Spin } from 'antd';
// import { useNavigate } from 'react-router-dom';
import PCard from '../../../../../../common/Card';
import DeltaBox from '../../../../../../common/DeltaBox';
// import { HEADERMENU_PATH } from '../../../../../../../routes/RoutesURL';
import { commaSeperator } from '../../../../../../../utils/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdBlockDashboardActions from '../../../redux/actions';
type Props = {
    startDate: any;
    endDate: any;
    revenueType: any;
    comparison: boolean;
    compare: boolean;
    compare_start_date: any;
    compare_end_date: string;
    siteId: any;
    widgetId?: string | null;
};
const AdBlockRecoveryTopCards: React.FC<Props> = ({ startDate, endDate, revenueType, comparison, compare, compare_start_date, compare_end_date, siteId, widgetId }) => {
    //  const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.adBlockDashboard.adBlockTopCards);
    const loader = useSelector((state: RootState) => state.adBlockDashboard.adBlockTopCardsLoader);

    useEffect(() => {
        if (startDate && endDate) {
            dispatch(
                AdBlockDashboardActions.fetchAdBlockTopCard({
                    start_date: startDate,
                    end_date: endDate,
                    compare: compare,
                    compare_start_date: compare_start_date,
                    compare_end_date: compare_end_date,
                    site_id: siteId,
                    widget_id: widgetId,
                }),
            );
        }
    }, [startDate, endDate, compare_start_date, compare_end_date, dispatch, compare, siteId, widgetId]);

    const tops = [
        {
            title: 'Adblock Page Views',
            percentage: data?.ab_pageview_percentage && parseFloat(String(data?.ab_pageview_percentage)).toFixed(2),
            isUp: (data?.ab_pageview_percentage || 0) > 0,
            value: data?.total_ab_pageview && `${commaSeperator(String(data?.total_ab_pageview))}`,
            loading: loader,
            text: data?.previous_total_ab_pageview !== undefined && `Previous Period: ${loader === false ? commaSeperator(String(data?.previous_total_ab_pageview)) : 0}`,
            key: 'Adblock Page Views',
        },
        {
            title: 'Percentage of Adblock Users',
            percentage: data?.ab_user_per_percentage && parseFloat(String(data?.ab_user_per_percentage)).toFixed(2),
            isUp: (data?.ab_user_per_percentage || 0) > 0,
            value: data?.ab_user_per && `${parseFloat(String(data?.ab_user_per)).toFixed(2)}%`,
            loading: loader,
            text: data?.previous_ab_user_per !== undefined && `Previous Period: ${loader === false ? parseFloat(String(data?.previous_ab_user_per)).toFixed(2) : 0}%`,
            key: 'Percentage of Adblock Users',
        },
        {
            title: 'Adblock Notice Engagement Rate',
            percentage: data?.engagement_rate_percentage && parseFloat(String(data?.engagement_rate_percentage)).toFixed(2),
            isUp: (data?.engagement_rate_percentage || 0) > 0,
            value: data?.engagement_rate && `${commaSeperator(String(data?.engagement_rate))}`,
            loading: loader,
            text: data?.previous_engagement_rate !== undefined && `Previous Period: ${loader === false ? commaSeperator(String(data?.previous_engagement_rate)) : 0}`,
            key: 'Adblock Notice Engagement Rate',
        },
        {
            title: 'Adblock Removal rate',
            percentage: data?.removal_rate_percentage && parseFloat(String(data?.removal_rate_percentage)).toFixed(2),
            isUp: (data?.removal_rate_percentage || 0) > 0,
            value: data?.removal_rate && `${commaSeperator(String(data?.removal_rate))}`,
            loading: loader,
            text: data?.previous_removal_rate !== undefined && `Previous Period: ${loader === false ? commaSeperator(String(data?.previous_removal_rate)) : 0}`,
            key: 'Adblock Removal rate',
        },
    ];

    return (
        <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tops.map((t, index) => (
                    <PCard
                        className="px-4 py-3 pb-2 w-full cursor-pointer topCard rounded-lg flex flex-col justify-between"
                        key={`${index}_${t.title}`}
                    // onClick={() => navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.subscriptions}?key=${t.key}`)}
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-xs roboto-medium color-056433 title">{t.title}</p>
                            {!t.loading && t.percentage !== undefined ? comparison && <DeltaBox width="w-auto" row={t.percentage} /> : <div className="h-7" />}
                        </div>
                        <div className="my-4 mb-3">
                            {!t.loading && <p className="roboto-medium font-semibold text-2xl value">{t.value}</p>}
                            {/* {t?.noData && <p className="text-xs roboto text flex justify-center">{'No Data'}</p>} */}
                            {t.loading && (
                                <div className="flex justify-center items-center">
                                    <Spin />
                                </div>
                            )}
                        </div>
                        {t.text && comparison ? <p className="text-xs roboto text">{t.text}</p> : <div className="h-4" />}
                    </PCard>
                ))}
            </div>
        </div>
    );
};

export default AdBlockRecoveryTopCards;
