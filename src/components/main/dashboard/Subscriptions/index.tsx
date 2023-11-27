import moment from 'moment';
import React, { useMemo, useState } from 'react';
import ComparisonSwitch from '../../../common/ComparisonSwitch';
import SearchClient from '../AdOptimization/components/dashboard/SearchClient';
import DateFilter from '../AdOptimization/components/DateFilter';
import NetGrossFilter from '../AdOptimization/components/NetGrossFilter';
import { useSearchParams } from 'react-router-dom';
import SubscriptionsTopCards from './components/dashboard/topCardsSubscriptions';

import ReasonForUnsubscribing from './components/dashboard/ReasonForUnsubscribing';
import SubscriptionsTables from './components/dashboard/SubscriptionTables';
import SubscriptionsCharts from './components/dashboard/Charts/SubscriptionCharts/SubscriptionsCharts';
import BreakDown from './components/dashboard/BreakDown';
import CountryDeviceSubscription from './components/dashboard/Charts/components/CountryDeviceSubscription';
import TopCardDetails from './components/TopCardDetails/TopCardDetails';
export const API_date_format = 'YYYY/MM/DD';

const SubscriptionsDashboard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [applyDate, setApplyDate] = useState('last7Day');
    const [revenueType, setRevenueType] = useState<string | undefined>('gross');
    const [customEndDate, setCustomEndDate] = useState<string | undefined>(undefined);
    const [customStartDate, setCustomStartDate] = useState<string | undefined>(undefined);
    const [compare, setCompare] = useState(false);
    const [dstring2, setDatestring2] = useState({
        sdate: '',
        edate: '',
    });
    const [compaison, setComparison] = useState(true);
    const getComparison = (e: any) => {
        setComparison(e);
    };

    const endDate = useMemo(() => {
        switch (applyDate) {
            case 'last1Day':
            case 'last7Day':
            case 'last30Day':
                return moment().startOf('day').subtract(1, 'day').format(API_date_format);
            default:
                return customEndDate;
        }
    }, [applyDate, customEndDate]);

    const startDate = useMemo(() => {
        switch (applyDate) {
            case 'last1Day':
                return moment().startOf('day').subtract(1, 'day').format(API_date_format);
            case 'last7Day':
                return moment().subtract(7, 'day').format(API_date_format);
            case 'last30Day':
                return moment().subtract(30, 'day').format(API_date_format);
            default:
                return customStartDate;
        }
    }, [applyDate, customStartDate]);

    if (searchParams.get('key') === 'revenue' || searchParams.get('key') === 'New Subs' || searchParams.get('key') === 'Active Subscriptions' || searchParams.get('key') === 'UnSubs' || searchParams.get('key') === 'rpm') {
        return <TopCardDetails startDate={startDate} endDate={endDate} />;
    }

    return (
        <div className="dashboard">
            <div className="relative pb-10 flex justify-between items-center">
                <SearchClient width={'35%'} dashBoardType={'subscription'} />
                <div className="flex items-center gap-5 h-20">
                    <ComparisonSwitch title="Show Comparison" compaison={compaison} onChange={getComparison} />
                    <NetGrossFilter revenueType={revenueType} setRevenueType={setRevenueType} />
                    <DateFilter
                        applyDate={applyDate}
                        setApplyDate={setApplyDate}
                        setCustomEndDate={setCustomEndDate}
                        setCustomStartDate={setCustomStartDate}
                        setDatestring2={setDatestring2}
                        dstring2={dstring2}
                        compare={compare}
                        setCompare={setCompare}
                        showCompare={compaison}
                    />
                </div>
            </div>
            <SubscriptionsTopCards
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                comparison={compaison}
                compare={compare}
                compare_start_date={compare ? dstring2.sdate : ''}
                compare_end_date={compare ? dstring2.edate : ''}
                siteId={null}
            />

            <CountryDeviceSubscription startDate={startDate} endDate={endDate} siteId={null} />

            <ReasonForUnsubscribing startDate={startDate} endDate={endDate} siteId={null} />

            <SubscriptionsTables
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                compare={compare}
                comparison={compaison}
                compare_start_date={compare ? dstring2.sdate : ''}
                compare_end_date={compare ? dstring2.edate : ''}
                siteId={null}
            />

            <SubscriptionsCharts
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                compare={compare}
                compare_start_date={compaison === false ? '' : dstring2.sdate}
                compare_end_date={compaison === false ? '' : dstring2.edate}
                siteId={null}
            />

            <BreakDown comparison={compaison} siteId={null} />
        </div>
    );
};

export default SubscriptionsDashboard;
