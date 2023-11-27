import React, { useEffect } from 'react';
import { Spin } from 'antd';
// import { useNavigate } from 'react-router-dom';
import PCard from '../../../../../../common/Card';
import DeltaBox from '../../../../../../common/DeltaBox';
// import { HEADERMENU_PATH } from '../../../../../../../routes/RoutesURL';
import { commaSeperator } from '../../../../../../../utils/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import CrowdFundingDashboardActions from '../../../redux/actions';

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

const CrowdFundingTopCards: React.FC<Props> = ({ startDate, endDate, revenueType, comparison, compare, compare_start_date, compare_end_date, siteId }) => {
    //  const navigate = useNavigate();
    const dispatch = useDispatch();
    const topcards = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingTopCards);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingTopCardsLoader);
    useEffect(() => {
        if (startDate && endDate && compare_start_date && compare_end_date) {
            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundTopCard({
                    start_date: startDate,
                    end_date: endDate,
                    compare: compare,
                    revenue: revenueType,
                    compare_start_date: compare_start_date,
                    compare_end_date: compare_end_date,
                    site_id: siteId,
                }),
            );
        }
    }, [dispatch, startDate, endDate, compare, revenueType, compare_start_date, compare_end_date, siteId]);
    const tops = [
        {
            title: 'Total Earnings',
            percentage: topcards?.earnings_percentage && parseFloat(String(topcards?.earnings_percentage)).toFixed(2),
            isUp: (36 || 0) > 0,
            value: topcards?.total_earnings && `$${commaSeperator(parseFloat(String(topcards?.total_earnings)).toFixed(2))}`,
            loading: loader,
            text: topcards?.previous_total_earnings !== undefined && `Previous Period: $${commaSeperator(parseFloat(String(topcards?.previous_total_earnings)).toFixed(2))}`,
            key: 'Total Earnings',
        },
        {
            title: 'Total Donors',
            percentage: topcards?.donors_percentage && parseFloat(String(topcards?.donors_percentage)).toFixed(2),
            isUp: (topcards?.donors_percentage || 0) > 0,
            value: topcards?.total_donors && `${commaSeperator(String(Number(topcards?.total_donors)))}`,
            loading: loader,
            text: topcards?.previous_total_donors !== undefined && `Previous Period: ${commaSeperator(String(Number(topcards?.previous_total_donors)))}`,
            key: 'Total Donors',
        },
        {
            title: 'Average Donation',
            percentage: topcards?.average_donation_percentage && parseFloat(String(topcards?.average_donation_percentage)).toFixed(2),
            isUp: (topcards?.average_donation_percentage || 0) > 0,
            value: topcards?.average_donation && `$${commaSeperator(parseFloat(String(Number(topcards?.average_donation))).toFixed(2))}`,
            loading: loader,
            text: topcards?.previous_average_donation !== undefined && `Previous Period: $${commaSeperator(parseFloat(String(Number(topcards?.previous_average_donation))).toFixed(2))}`,
            key: 'Average Donation',
        },
        {
            title: 'Fundraiser Views',
            percentage: topcards?.fund_views_percentage && parseFloat(String(topcards?.fund_views_percentage)).toFixed(2),
            isUp: (topcards?.fund_views_percentage || 0) > 0,
            value: topcards?.total_fund_views && `${commaSeperator(String(Number(topcards?.total_fund_views)))}`,
            loading: loader,
            text: topcards?.previous_total_fund_views !== undefined && `Previous Period: ${commaSeperator(String(Number(topcards?.previous_total_fund_views)))}`,
            key: 'Fundraiser Views',
        },
        {
            title: 'Fundraiser eCPM',
            percentage: topcards?.fund_ecpm_percentage && parseFloat(String(topcards?.fund_ecpm_percentage)).toFixed(2),
            isUp: (topcards?.fund_ecpm_percentage || 0) > 0,
            value: topcards?.fund_ecpm && `$${commaSeperator(String(Number(topcards?.fund_ecpm).toFixed(2)))}`,
            loading: loader,
            text: topcards?.previous_fund_ecpm !== undefined && `Previous Period: $${commaSeperator(String(Number(topcards?.previous_fund_ecpm).toFixed(2)))}`,
            key: 'Fundraiser eCPM',
        },
    ];

    return (
        <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {tops.map((t, index) => (
                    <PCard
                        className="px-4 py-3 pb-2 w-full cursor-pointer topCard rounded-lg flex flex-col justify-between"
                        key={`${index}_${t.title}`}
                        // onClick={() => navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.subscriptions}?key=${t.key}`)}
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
                        {t.text && comparison ? <p className="text-xs roboto text">{t.text}</p> : <div className="h-4" />}
                    </PCard>
                ))}
            </div>
        </div>
    );
};

export default CrowdFundingTopCards;
