import moment from 'moment';
import React, { useMemo, useState } from 'react';
import ComparisonSwitch from '../../../common/ComparisonSwitch';
import SearchClient from '../AdOptimization/components/dashboard/SearchClient';
import DateFilter from '../AdOptimization/components/DateFilter';
// import NetGrossFilter from '../AdOptimization/components/NetGrossFilter';
import AdBlockRecoveryCharts from './components/dashboard/AdBlockRecoveryCharts';
import AdBlockRecoveryTables from './components/dashboard/AdBlockRecoveryTables';
import InfoGraph from './components/dashboard/InfoGraph';
import AdBlockRecoveryTopCards from './components/dashboard/topCardsAdBlockRecovery';

export const API_date_format = 'YYYY/MM/DD';

const AdBlockRecoveryDashboard: React.FC = () => {
    const [applyDate, setApplyDate] = useState('last7Day');
    // const [revenueType, setRevenueType] = useState<string | undefined>('gross');
    const [customEndDate, setCustomEndDate] = useState<string | undefined>(undefined);
    const [customStartDate, setCustomStartDate] = useState<string | undefined>(undefined);
    const [compare, setCompare] = useState(false);
    const [dstring2, setDatestring2] = useState({
        sdate: '',
        edate: '',
    });
    const [compaison, setComparison] = useState(true);
    // const [searchedSiteId, setSiteId] = useState('');
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
    return (
        <div className="dashboard">
            <div className="relative pb-10 flex justify-between items-center">
                <SearchClient width={'35%'} dashBoardType={'adBlockRecovery'} />
                <div className="flex items-center gap-5 h-20">
                    <ComparisonSwitch title="Show Comparison" compaison={compaison} onChange={getComparison} />
                    {/* <NetGrossFilter revenueType={revenueType} setRevenueType={setRevenueType} /> */}
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
            <AdBlockRecoveryTopCards
                startDate={startDate}
                endDate={endDate}
                revenueType={' '}
                comparison={compaison}
                compare={compare}
                compare_start_date={compare ? dstring2.sdate : ''}
                compare_end_date={compare ? dstring2.edate : ''}
                siteId={null}
            />

            <InfoGraph startDate={startDate} endDate={endDate} siteId={null} />

            <AdBlockRecoveryTables startDate={startDate} endDate={endDate} comparison={compaison} compare={compare} compare_start_date={compare ? dstring2.sdate : ''} compare_end_date={compare ? dstring2.edate : ''} siteId={null} />

            <AdBlockRecoveryCharts
                startDate={startDate}
                endDate={endDate}
                revenueType={' '}
                compare={compaison}
                compare_start_date={compaison === false ? '' : dstring2.sdate}
                compare_end_date={compaison === false ? '' : dstring2.edate}
                siteId={null}
            />
        </div>
    );
};

export default AdBlockRecoveryDashboard;
