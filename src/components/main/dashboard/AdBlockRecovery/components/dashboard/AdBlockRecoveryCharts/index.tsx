import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PTabs from '../../../../../../common/Tabs';
import AdBlockDashboardActions from '../../../redux/actions';
import PageViewsAdBlockRecovery from './PageViewsAdBlockRecovery';
import PercentageUserAdBlockRecovery from './PercentageUserAdBlockRecovery';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    compare?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    siteId: any;
    widgetId?: string|null;
};

const AdBlockRecoveryCharts: React.FC<Props> = ({ startDate, endDate, siteId, widgetId }) => {
    const dispatch = useDispatch();
    const [activeChart, setActiveChart] = useState('adblockPVs');
    const [dates, setDates] = useState<{
        adblockPVs: {
            startDate?: string;
            endDate?: string;
            siteId?: any;
            widgetId?: string|null;
        };
        perUser: {
            startDate?: string;
            endDate?: string;
            siteId?: any;
            widgetId?: string|null;
        };
    }>({
        adblockPVs: {
            startDate: undefined,
            endDate: undefined,
            siteId: undefined,
            widgetId: undefined,
        },
        perUser: {
            startDate: undefined,
            endDate: undefined,
            siteId: undefined,
            widgetId: undefined,
        },
    });
    const onChangeTab = (tab: string) => {
        setActiveChart(tab);
    };

    useEffect(() => {
        if (activeChart === 'adblockPVs' && (dates.adblockPVs.startDate !== startDate || dates.adblockPVs.endDate !== endDate || dates.adblockPVs.siteId !== siteId || dates.adblockPVs.widgetId !== widgetId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    adblockPVs: {
                        startDate: startDate,
                        endDate: endDate,
                        siteId: siteId,
                        widgetId: widgetId,
                    },
                });
                dispatch(
                    AdBlockDashboardActions.fetchAdBlockPvsGraph({
                        start_date: startDate,
                        end_date: endDate,
                        site_id: siteId,
                        widget_id: widgetId,
                    }),
                );
            }
        }
        if (activeChart === 'adblockUsers' && (dates.perUser.startDate !== startDate || dates.perUser.endDate !== endDate || dates.perUser.siteId !== siteId || dates.perUser.widgetId !== widgetId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    perUser: {
                        startDate: startDate,
                        endDate: endDate,
                        siteId: siteId,
                        widgetId: widgetId,
                    },
                });
                dispatch(
                    AdBlockDashboardActions.fetchAdBlockPerUserGraph({
                        start_date: startDate,
                        end_date: endDate,
                        site_id: siteId,
                        widget_id: widgetId,
                    }),
                );
            }
        }
    }, [startDate, endDate, dispatch, activeChart, dates, siteId, widgetId]);

    const tabComponents = useMemo(() => {
        switch (activeChart) {
            case 'adblockPVs':
                return <PageViewsAdBlockRecovery />;
            case 'adblockUsers':
                return <PercentageUserAdBlockRecovery />;
            // case 'adblockAlertShown':
            //      return <AdOptBarChart data={[]} loading={false} suffix="$" />;
            // case 'wishlisting':
            //      return <AdOptBarChart data={[]} loading={false} suffix="$" />;
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
                    { key: 'adblockPVs', title: 'Adblock PVs' },
                    { key: 'adblockUsers', title: '% Adblock Users' },
                    // { key: 'adblockAlertShown', title: 'Adblock Alert Shown' },
                    // { key: 'wishlisting', title: '% of Wishlisting' },
                ]}
            />
            <div className="py-4 pt-6">{tabComponents}</div>
        </div>
    );
};

export default AdBlockRecoveryCharts;
