import moment from 'moment-timezone';
import React, { useMemo, useState } from 'react';
import AdOptimizationCharts from './components/dashboard/Charts';
import DateFilter from './components/DateFilter';
import DemandChannel from './components/dashboard/DemandChannel';
import FavoritesAndRecent from './components/dashboard/favoritesAndRecent';
import NetGrossFilter from './components/NetGrossFilter';
import SearchClient from './components/dashboard/SearchClient';
import AdOptimizationTopCards from './components/dashboard/topCards';
import TopTrends from './components/dashboard/TopTrends';
import { useSearchParams } from 'react-router-dom';
import ComparisonSwitch from '../../../common/ComparisonSwitch';
import SitesListOfAdOptimisation from './ListOfSites';

export const API_date_format = 'YYYY/MM/DD';

const AdOptimizationDashboard: React.FC = () => {
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
    const [adServer, serAdServer] = useState(false);
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

    const getComparison = (e: any) => {
        setComparison(e);
    };
    const getAdServer = (e: any) => {
        serAdServer(e);
    };

    if (searchParams.get('key') === 'revenue' || searchParams.get('key') === 'monetizedimpression' || searchParams.get('key') === 'adrequest' || searchParams.get('key') === 'cpm' || searchParams.get('key') === 'fetchTopALl') {
        return <SitesListOfAdOptimisation />;
    }
    return (
        <div className="dashboard ">
            <div className="relative pb-10 flex flex-wrap justify-between items-center gap-5">
                <SearchClient width={'35%'} dashBoardType={'adoptimization'}/>
                <div className="flex flex-wrap items-center gap-5 ">
                    <ComparisonSwitch title="Show Comparison" compaison={compaison} onChange={getComparison} />
                    <ComparisonSwitch title="GAM Only" compaison={adServer} onChange={getAdServer} />
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

            <AdOptimizationTopCards
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                comparison={compaison}
                compare={compare}
                compare_start_date={compare === false ? '' : dstring2.sdate}
                compare_end_date={compare === false ? '' : dstring2.edate}
                ad_server={adServer ? 'ON' : 'OFF'}
            />
            <FavoritesAndRecent
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                compare={compare}
                compare_start_date={compare === false ? '' : dstring2.sdate}
                compare_end_date={compare === false ? '' : dstring2.edate}
                ad_server={adServer ? 'ON' : 'OFF'}
            />
            <AdOptimizationCharts
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                compare={compare}
                compare_start_date={compare === false ? '' : dstring2.sdate}
                compare_end_date={compare === false ? '' : dstring2.edate}
                ad_server={adServer ? 'ON' : 'OFF'}
            />
            <DemandChannel
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                compare={compare}
                comparison={compaison}
                compare_start_date={compare === false ? '' : dstring2.sdate}
                compare_end_date={compare === false ? '' : dstring2.edate}
                ad_server={adServer ? 'ON' : 'OFF'}
                time_interval={applyDate}
            />
            <TopTrends
                startDate={startDate}
                endDate={endDate}
                revenueType={revenueType}
                comparison={compaison}
                compare={compare}
                compare_start_date={compare === false ? '' : dstring2.sdate}
                compare_end_date={compare === false ? '' : dstring2.edate}
                ad_server={adServer ? 'ON' : 'OFF'}
            />
        </div>
    );
};

export default AdOptimizationDashboard;
