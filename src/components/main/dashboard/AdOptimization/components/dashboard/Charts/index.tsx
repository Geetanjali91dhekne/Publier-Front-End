import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PTabs, { TabView } from '../../../../../../common/Tabs';
import AdOptDashboardAction from '../../../redux/actions';
import AdRequestCharts from './AdRequest';
import CPMCharts from './CPM';
import FillRateCharts from './Fillrate';
import MonetizedImpsCharts from './MonetizedImps';
import RevenueCharts from './Revenue';
const tabs: TabView[] = [
    {
        key: 'Revenue',
        title: 'Revenue',
    },
    {
        key: 'Monetized Imps',
        title: 'Monetized Impressions',
    },
    {
        key: 'Ad Requests',
        title: 'Ad Requests',
    },
    {
        key: 'CPM',
        title: 'CPM',
    },
    {
        key: 'Fillrate',
        title: 'Fill Rate',
    },
];

type Props = {
    startDate?: string;
    endDate?: string;
    revenueType?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    ad_server?: string;
};

const AdOptimizationCharts: React.FC<Props> = ({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, ad_server }) => {
    const dispatch = useDispatch();

    const [activeChart, setActiveChart] = useState('Revenue');
    const [dates, setDates] = useState<{
        revenue: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            ad_server?: string;
        };
        cpm: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            ad_server?: string;
        };
        fillrate: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            ad_server?: string;
        };
        adRequest: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            ad_server?: string;
        };
        monetized: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            ad_server?: string;
        };
    }>({
        revenue: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            ad_server: ad_server ? 'ON' : 'OFF',
        },
        cpm: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            ad_server: ad_server ? 'ON' : 'OFF',
        },
        fillrate: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            ad_server: ad_server ? 'ON' : 'OFF',
        },
        adRequest: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            ad_server: ad_server ? 'ON' : 'OFF',
        },
        monetized: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            ad_server: ad_server ? 'ON' : 'OFF',
        },
    });

    useEffect(() => {
        if (startDate && endDate) {
            if (activeChart === 'CPM' && (dates.cpm.startDate !== startDate || dates.cpm.endDate !== endDate || dates.cpm.revenue !== revenueType || dates.cpm.ad_server !== ad_server || dates.cpm.compare_start_date !== compare_start_date || dates.cpm.compare_end_date !== compare_end_date)) {
                setDates({
                    ...dates,
                    cpm: {
                        endDate: endDate,
                        startDate: startDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchCPMGraph({
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
            if (activeChart === 'Revenue' && (dates.revenue.startDate !== startDate || dates.revenue.endDate !== endDate || dates.revenue.revenue !== revenueType || dates.revenue.ad_server !== ad_server || dates.revenue.compare_start_date !== compare_start_date || dates.revenue.compare_end_date !== compare_end_date)) {
                setDates({
                    ...dates,
                    revenue: {
                        endDate: endDate,
                        startDate: startDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchRevenueGraph({
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
        }
    }, [startDate, endDate, dispatch, revenueType, activeChart, dates, compare, compare_start_date, compare_end_date, ad_server]);

    useEffect(() => {
        if (startDate && endDate) {
            if (activeChart === 'Ad Requests' && (dates.adRequest.startDate !== startDate || dates.adRequest.endDate !== endDate || dates.adRequest.ad_server !== ad_server || dates.adRequest.compare_start_date !== compare_start_date || dates.adRequest.compare_end_date !== compare_end_date)) {
                setDates({
                    ...dates,
                    adRequest: {
                        endDate: endDate,
                        startDate: startDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchAdRequestGraph({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    }),
                );
            }
            if (activeChart === 'Fillrate' && (dates.fillrate.startDate !== startDate || dates.fillrate.endDate !== endDate || dates.fillrate.ad_server !== ad_server || dates.fillrate.compare_start_date !== compare_start_date || dates.fillrate.compare_end_date !== compare_end_date)) {
                setDates({
                    ...dates,
                    fillrate: {
                        endDate: endDate,
                        startDate: startDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchFillRateGraph({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    }),
                );
            }
            if (activeChart === 'Monetized Imps' && (dates.monetized.startDate !== startDate || dates.monetized.endDate !== endDate || dates.monetized.ad_server !== ad_server || dates.monetized.compare_start_date !== compare_start_date || dates.monetized.compare_end_date !== compare_end_date)) {
                setDates({
                    ...dates,
                    monetized: {
                        endDate: endDate,
                        startDate: startDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchMonetizedImpsGraph({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    }),
                );
            }
        }
    }, [startDate, endDate, dispatch, activeChart, dates, compare, compare_start_date, compare_end_date, ad_server]);

    const onChangeTab = (tab: string) => {
        setActiveChart(tab);
    };

    const tabComponents = useMemo(() => {
        switch (activeChart) {
            case 'Revenue':
                return <RevenueCharts />;
            case 'Ad Requests':
                return <AdRequestCharts />;
            case 'Monetized Imps':
                return <MonetizedImpsCharts />;
            case 'Fillrate':
                return <FillRateCharts />;
            case 'CPM':
                return <CPMCharts />;
            default:
                return null;
        }
    }, [activeChart]);

    const filteredTabs:TabView[] = tabs.filter((item:TabView)=>{
        if(ad_server === 'OFF' ){
            if(item?.key === 'Revenue' || item?.key === 'Monetized Imps' || item?.key === 'CPM')
                return item;
        }else{
            return item;
        }
        return null;
    }) 

    return (
        <div>
            <PTabs tabs={filteredTabs} activeTab={activeChart} setActiveTab={onChangeTab} />
            <div className="py-4 pt-6">{tabComponents}</div>
        </div>
    );
};

export default AdOptimizationCharts;
