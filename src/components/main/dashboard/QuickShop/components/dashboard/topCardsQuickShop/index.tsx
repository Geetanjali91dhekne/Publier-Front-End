import React, { useEffect } from 'react';
import { Spin } from 'antd';
// import { useNavigate } from 'react-router-dom';
import PCard from '../../../../../../common/Card';
import DeltaBox from '../../../../../../common/DeltaBox';
// import { HEADERMENU_PATH } from '../../../../../../../routes/RoutesURL';
import { commaSeperator } from '../../../../../../../utils/Validation';
import { useDispatch, useSelector } from 'react-redux';
import QuickShopDashboardActions from '../../../redux/actions';
import { RootState } from '../../../../../../../store/RootReducer';

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

const QuickShopTopCards: React.FC<Props> = ({ startDate, endDate, revenueType, comparison, compare, compare_start_date, compare_end_date, siteId }) => {
    //  const navigate = useNavigate();
    const dispatch = useDispatch();
    const topcards = useSelector((state: RootState) => state.quickShopDashboard.quickShopTopCards);
    const loader = useSelector((state: RootState) => state.quickShopDashboard.quickShopTopCardsLoader);
    useEffect(() => {
        if (startDate && endDate) {
            dispatch(
                QuickShopDashboardActions.fetchQuickShopTopCard({
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
    }, [startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, siteId, dispatch]);
    const tops = [
        {
            title: 'Revenue',
            percentage: topcards?.total_rev_percentage && parseFloat(String(topcards?.total_rev_percentage)).toFixed(2),
            isUp: (topcards?.total_rev_percentage || 0) > 0,
            value: topcards?.total_revenue && `$${commaSeperator(parseFloat(String(topcards?.total_revenue)).toFixed(2))}`,
            loading: loader,
            text: topcards?.previous_total_revenue !== undefined && `Previous Period: $${commaSeperator(parseFloat(String(topcards?.previous_total_revenue)).toFixed(2))}`,
            key: 'Revenue',
        },
        {
            title: 'Total Items Sold',
            percentage: topcards?.total_item_sold_percentage && parseFloat(String(topcards?.total_item_sold_percentage)).toFixed(2),
            isUp: (topcards?.total_item_sold_percentage || 0) > 0,
            value: topcards?.total_item_sold && `${commaSeperator(String(topcards?.total_item_sold))}`,
            loading: loader,
            text: topcards?.previous_total_item_sold !== undefined && `Previous Period: ${commaSeperator(String(topcards?.previous_total_item_sold))}`,
            key: 'Total Items Sold',
        },
        {
            title: 'Average Purchase Value',
            percentage: topcards?.total_avg_purchase_percentage && parseFloat(String(topcards?.total_avg_purchase_percentage)).toFixed(2),
            isUp: (topcards?.total_avg_purchase_percentage || 0) > 0,
            value: topcards?.total_avg_purchase && `$${commaSeperator(parseFloat(String(Number(topcards?.total_avg_purchase))).toFixed(2))}`,
            loading: loader,
            text: topcards?.previous_total_avg_purchase !== undefined && `Previous Period: $${commaSeperator(parseFloat(String(Number(topcards?.previous_total_avg_purchase))).toFixed(2))}`,
            key: 'Average Purchase Value',
        },
        {
            title: 'Product PVs',
            percentage: topcards?.total_product_pvs_percentage && parseFloat(String(topcards?.total_product_pvs_percentage)).toFixed(2),
            isUp: (topcards?.total_product_pvs_percentage || 0) > 0,
            value: topcards?.total_product_pvs && `${commaSeperator(String(Number(topcards?.total_product_pvs)))}`,
            loading: loader,
            text: topcards?.previous_total_product_pvs !== undefined && `Previous Period: ${commaSeperator(String(Number(topcards?.previous_total_product_pvs)))}`,
            key: 'Product PVs',
        },
        {
            title: 'Conversion Ratio',
            percentage: topcards?.total_converstion_ratio_percentage && parseFloat(String(topcards?.total_converstion_ratio_percentage)).toFixed(2),
            isUp: (topcards?.total_converstion_ratio_percentage || 0) > 0,
            value: topcards?.total_converstion_ratio && `${commaSeperator(String(Number(topcards?.total_converstion_ratio).toFixed(2)))}`,
            loading: loader,
            text: topcards?.previous_total_converstion_ratio !== undefined && `Previous Period: ${commaSeperator(String(Number(topcards?.previous_total_converstion_ratio).toFixed(2)))}`,
            key: 'Conversion Ratio',
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

export default QuickShopTopCards;
