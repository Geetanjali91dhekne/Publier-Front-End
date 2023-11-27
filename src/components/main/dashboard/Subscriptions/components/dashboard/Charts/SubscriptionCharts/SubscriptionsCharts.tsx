import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PTabs from '../../../../../../../common/Tabs';
import SubsDashboardAction from '../../../../redux/actions';
// import ActiveSub from './ActiveSub';
import NewSub from './NewSub';
import RevenueSub from './RevenueSub';
import Rpm from './Rpm';
import UnSub from './UnSub';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    compare?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    siteId?: any;
};

const SubscriptionsCharts: React.FC<Props> = ({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, siteId }) => {
    const [activeChart, setActiveChart] = useState('Revenue');
    const dispatch = useDispatch();
    const [dates, setDates] = useState<{
        revenue: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        activesubscription: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        newsubscription: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        unsubscribes: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
        rpm: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            siteId?: any;
        };
    }>({
        revenue: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        activesubscription: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        newsubscription: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        unsubscribes: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        rpm: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
    });

    useEffect(() => {
        if (startDate && endDate) {
            if (activeChart === 'Revenue' && (dates.revenue.startDate !== startDate || dates.revenue.endDate !== endDate || dates.revenue.revenue !== revenueType)) {
                setDates({
                    ...dates,
                    revenue: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionRevenueGraphTable({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }

            // if (activeChart === 'ActiveSubscriptions' && (dates.activesubscription.startDate !== startDate || dates.activesubscription.endDate !== endDate || dates.activesubscription.revenue !== revenueType)) {
            //   setDates({
            //     ...dates,
            //     activesubscription: {
            //       startDate: startDate,
            //       endDate: endDate,
            //       revenue: revenueType,
            //       siteId: siteId,
            //     }
            //   })
            //   dispatch(
            //     SubsDashboardAction.fetchSubscriptionActiveSubsGraph({
            //       start_date: startDate,
            //       end_date: endDate,
            //       revenue: revenueType,
            //       site_id: siteId
            //     }));
            // }

            if (activeChart === 'NewSubscriptions' && (dates.newsubscription.startDate !== startDate || dates.newsubscription.endDate !== endDate || dates.newsubscription.revenue !== revenueType)) {
                setDates({
                    ...dates,
                    newsubscription: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionNewSubsGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }

            if (activeChart === 'UnSubscribes' && (dates.unsubscribes.startDate !== startDate || dates.unsubscribes.endDate !== endDate || dates.unsubscribes.revenue !== revenueType)) {
                setDates({
                    ...dates,
                    unsubscribes: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionUnSubsGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }

            if (activeChart === 'RPM' && (dates.rpm.startDate !== startDate || dates.rpm.endDate !== endDate || dates.rpm.revenue !== revenueType)) {
                setDates({
                    ...dates,
                    rpm: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionnRpmGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
    }, [dispatch, activeChart, startDate, dates, endDate, revenueType, siteId]);

    const onChangeTab = (tab: string) => {
        setActiveChart(tab);
    };

    const tabComponents = useMemo(() => {
        switch (activeChart) {
            case 'Revenue':
                return <RevenueSub />;
            // case 'ActiveSubscriptions':
            //   return <ActiveSub />;
            case 'NewSubscriptions':
                return <NewSub />;
            case 'UnSubscribes':
                return <UnSub />;
            case 'RPM':
                return <Rpm />;
            default:
                return null;
        }
    }, [activeChart]);
    return (
        <div className="mt-8">
            <PTabs
                activeTab={activeChart}
                setActiveTab={onChangeTab}
                tabs={[
                    { key: 'Revenue', title: 'Revenue' },
                    // { key: 'ActiveSubscriptions', title: 'Active Subscriptions' },
                    { key: 'NewSubscriptions', title: 'New Subscriptions' },
                    { key: 'UnSubscribes', title: 'Unsubscribes' },
                    { key: 'RPM', title: 'RPM' },
                ]}
            />
            <div className="py-4 pt-6">{tabComponents}</div>
        </div>
    );
};

export default SubscriptionsCharts;
