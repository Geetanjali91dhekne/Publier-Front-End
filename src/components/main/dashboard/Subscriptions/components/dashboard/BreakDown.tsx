import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import DateFilter from '../../../AdOptimization/components/DateFilter';
import { useDispatch, useSelector } from 'react-redux';
import SubsDashboardAction from '../../redux/actions';
import PVsSubPVsPieChart from './Charts/components/PVsSubPVsPieChart';
import { RootState } from '../../../../../../store/RootReducer';
export const API_date_format = 'YYYY/MM/DD';

type Props = {
    comparison: boolean;
    siteId: any;
};

const BreakDown: React.FC<Props> = ({ comparison, siteId }) => {
    const [applyDate, setApplyDate] = useState('last7Day');
    const [customEndDate, setCustomEndDate] = useState<string | undefined>(undefined);
    const [customStartDate, setCustomStartDate] = useState<string | undefined>(undefined);
    const [compare, setCompare] = useState(false);
    const [dstring2, setDatestring2] = useState({
        sdate: '',
        edate: '',
    });

    const [dates, setDates] = useState<{
        start_date?: string;
        end_date?: string;
        compare?: boolean;
        compare_start_date?: string;
        compare_end_date?: string;
        site_id?: string;
    }>({
        start_date: undefined,
        end_date: undefined,
        compare: undefined,
        compare_start_date: undefined,
        compare_end_date: undefined,
        site_id: undefined,
    });

    const dispatch = useDispatch();
    const domainStats = useSelector((state: RootState) => state.subsDashboard.subscriptionDomainStatsGraph);
    const domainLoading = useSelector((state: RootState) => state.subsDashboard.subscriptionDomainStatsLoader);

    const countryStats = useSelector((state: RootState) => state.subsDashboard.subscriptionCountryStatsGraph);
    const countryLoading = useSelector((state: RootState) => state.subsDashboard.subscriptionCountryStatsLoader);

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

    useEffect(() => {
        if (startDate && endDate) {
            if (dates.start_date !== startDate || dates.end_date !== endDate || dates.site_id !== siteId || (compare && (dates.compare_start_date !== dstring2.sdate || dates.compare_end_date !== dstring2.edate))) {
                setDates({
                    start_date: startDate,
                    end_date: endDate,
                    compare: compare,
                    compare_start_date: compare ? dstring2.sdate : '',
                    compare_end_date: compare ? dstring2.edate : '',
                    site_id: siteId,
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionDomainStats({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare ? dstring2.sdate : '',
                        compare_end_date: compare ? dstring2.edate : '',
                        site_id: siteId,
                    }),
                );
                dispatch(
                    SubsDashboardAction.fetchSubscriptionCountryStats({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare ? dstring2.sdate : '',
                        compare_end_date: compare ? dstring2.edate : '',
                        site_id: siteId,
                    }),
                );
            }
        }
    }, [dispatch, dates, startDate, endDate, dstring2.sdate, dstring2.edate, siteId, compare]);

    return (
        <div className="mt-16 pb-10">
            <div className="relative pb-5 flex justify-between items-center">
                <div className="mx-5 text-[32px] font-bold">Breakdown of PVs/Subscription PVs</div>
                <DateFilter
                    applyDate={applyDate}
                    setApplyDate={setApplyDate}
                    setCustomEndDate={setCustomEndDate}
                    setCustomStartDate={setCustomStartDate}
                    setDatestring2={setDatestring2}
                    dstring2={dstring2}
                    compare={compare}
                    setCompare={setCompare}
                    showCompare={true}
                />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
                <div className="min-w-[400px] ">
                    <PVsSubPVsPieChart comparison={comparison} loading={countryLoading} list={countryStats} title={'Country Stats'} label1={'PVs'} label2={'Subscription PVs'} graphtype={'countryStats'} />
                </div>
                <div className="min-w-[400px] ">
                    <PVsSubPVsPieChart comparison={comparison} loading={domainLoading} list={domainStats} title={'Domains'} label1={'PVs'} label2={'Subscription PVs'} graphtype={'domainStats'} />
                </div>
            </div>
        </div>
    );
};

export default BreakDown;
