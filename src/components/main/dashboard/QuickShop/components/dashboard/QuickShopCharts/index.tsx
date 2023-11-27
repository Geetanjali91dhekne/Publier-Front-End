import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PTabs from '../../../../../../common/Tabs';
import QuickShopDashboardActions from '../../../redux/actions';
import AvgPurchaseQuickShop from './AvgPurchaseQuickShop';
import ConversionRatioQuickShop from './ConversionRatioQuickShop';
import ItemsSoldQuickShop from './ItemsSoldQuickShop';
import ProductPvsGraph from './ProductPvsGraph';
import TotalEarningsQuickShop from './TotalEarningQuickShop';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    compare?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    siteId?: any;
};

const QuickShopCharts: React.FC<Props> = ({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, siteId }) => {
    const dispatch = useDispatch();
    const [activeChart, setActiveChart] = useState('totalEarning');
    const [dates, setDates] = useState<{
        totalEarning: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        itemSold: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        purchase: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        productPvs: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        conversionRatio: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
    }>({
        totalEarning: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        itemSold: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        purchase: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        productPvs: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        conversionRatio: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
    });

    useEffect(() => {
        if (activeChart === 'totalEarning' && (dates.totalEarning.startDate !== startDate || dates.totalEarning.endDate !== endDate || dates.totalEarning.revenue !== revenueType || dates.totalEarning.siteId !== siteId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    totalEarning: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    QuickShopDashboardActions.fetchQuickShopEarningGrpah({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (activeChart === 'itemsSold' && (dates.itemSold.startDate !== startDate || dates.itemSold.endDate !== endDate || dates.itemSold.revenue !== revenueType || dates.itemSold.siteId !== siteId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    itemSold: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    QuickShopDashboardActions.fetchQuickShopItemsGrpah({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (activeChart === 'avgPurchaseValue' && (dates.purchase.startDate !== startDate || dates.purchase.endDate !== endDate || dates.purchase.revenue !== revenueType || dates.purchase.siteId !== siteId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    purchase: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    QuickShopDashboardActions.fetchQuickShopPurchaseGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (activeChart === 'productpvs' && (dates.productPvs.startDate !== startDate || dates.productPvs.endDate !== endDate || dates.productPvs.revenue !== revenueType || dates.productPvs.siteId !== siteId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    productPvs: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    QuickShopDashboardActions.fetchQuickShopProductPvsGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (activeChart === 'conversionRatio' && (dates.conversionRatio.startDate !== startDate || dates.conversionRatio.endDate !== endDate || dates.conversionRatio.revenue !== revenueType || dates.conversionRatio.siteId !== siteId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    conversionRatio: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    QuickShopDashboardActions.fetchQuickShopConversionRatioGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
    }, [dispatch, activeChart, startDate, endDate, revenueType, siteId, dates]);

    const onChangeTab = (tab: string) => {
        setActiveChart(tab);
    };

    const tabComponents = useMemo(() => {
        switch (activeChart) {
            case 'totalEarning':
                return <TotalEarningsQuickShop />;
            case 'itemsSold':
                return <ItemsSoldQuickShop />;
            case 'avgPurchaseValue':
                return <AvgPurchaseQuickShop />;
            case 'productpvs':
                return <ProductPvsGraph />;
            case 'conversionRatio':
                return <ConversionRatioQuickShop />;
            default:
                return null;
        }
    }, [activeChart]);
    return (
        <div className="mt-14">
            <PTabs
                activeTab={activeChart}
                setActiveTab={onChangeTab}
                tabs={[
                    { key: 'totalEarning', title: 'Total Earning' },
                    { key: 'itemsSold', title: 'Items Sold' },
                    { key: 'avgPurchaseValue', title: 'Avg Purchase Value' },
                    { key: 'productpvs', title: 'Product PVs' },
                    { key: 'conversionRatio', title: 'Conversion Ratio' },
                ]}
            />
            <div className="py-4 pt-6">{tabComponents}</div>
        </div>
    );
};

export default QuickShopCharts;
