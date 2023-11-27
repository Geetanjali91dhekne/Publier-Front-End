import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PTabs from '../../../../../../common/Tabs';
import AdOptDashboardAction from '../../../redux/actions';
import FavoritesSites from './components/FavoritesSites';
import RecentSites from './components/RecentSites';

type Props = {
    startDate?: string;
    endDate?: string;
    revenueType?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    ad_server?: string;
};

const FavoritesAndRecent: React.FC<Props> = ({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, ad_server }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('recent');
    const [dates, setDates] = useState<{
        recent: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            ad_server?: string;
        };
        favourite: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            ad_server?: string;
        };
    }>({
        recent: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            ad_server: undefined,
        },
        favourite: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            ad_server: undefined,
        },
    });

    useEffect(() => {
        if (startDate && endDate) {
            if (activeTab === 'recent' && (dates.recent.startDate !== startDate || dates.recent.endDate !== endDate || dates.recent.revenue !== revenueType || dates.recent.ad_server !== ad_server || dates.recent.compare_start_date !== compare_start_date || dates.recent.compare_end_date !== compare_end_date)) {
                setDates({
                    ...dates,
                    recent: {
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
                    AdOptDashboardAction.fetchTop12Recents({
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
            if (activeTab === 'favorites' && (dates.favourite.startDate !== startDate || dates.favourite.endDate !== endDate || dates.favourite.revenue !== revenueType || dates.favourite.ad_server !== ad_server || dates.favourite.compare_start_date !== compare_start_date || dates.favourite.compare_end_date !== compare_end_date)) {
                setDates({
                    ...dates,
                    favourite: {
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
                    AdOptDashboardAction.fetchTop12Favorites({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        ad_server: ad_server,
                    }),
                );
            }
        }
    }, [startDate, endDate, dispatch, activeTab, dates, revenueType, compare, compare_start_date, compare_end_date, ad_server]);

    const onTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const tabComponents = useMemo(() => {
        switch (activeTab) {
            case 'favorites':
                return <FavoritesSites />;
            case 'recent':
                return <RecentSites />;
            default:
                return null;
        }
    }, [activeTab]);

    return (
        <div>
            <PTabs
                activeTab={activeTab}
                setActiveTab={onTabChange}
                tabs={[
                    { key: 'recent', title: 'Recent' },
                    { key: 'favorites', title: 'Favorites' },
                ]}
            />
            {tabComponents}
        </div>
    );
};

export default FavoritesAndRecent;
