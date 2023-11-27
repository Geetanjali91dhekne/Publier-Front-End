import { Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import { RootState } from '../../../../../../store/RootReducer';
import ComparisonSwitch from '../../../../../common/ComparisonSwitch';
import DateFilter from '../../../AdOptimization/components/DateFilter';
import NetGrossFilter from '../../../AdOptimization/components/NetGrossFilter';
import BreakDown from '../dashboard/BreakDown';
import CountryDeviceSubscription from '../dashboard/Charts/components/CountryDeviceSubscription';
import SubscriptionsCharts from '../dashboard/Charts/SubscriptionCharts/SubscriptionsCharts';
import ReasonForUnsubscribing from '../dashboard/ReasonForUnsubscribing';
import SubscriptionsTables from '../dashboard/SubscriptionTables';
import SubscriptionsTopCards from '../dashboard/topCardsSubscriptions';
// import WidgetSubscriptions from '../dashboard/Widgets';
export const API_date_format = 'YYYY/MM/DD';

const SubscriptionSiteDetails: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [compaison, setComparison] = useState(true);
    const [compare, setCompare] = useState(false);
    const [revenueType, setRevenueType] = useState<string | undefined>('gross');
    const [applyDate, setApplyDate] = useState('last7Day');
    const [customEndDate, setCustomEndDate] = useState<string | undefined>(undefined);
    const [customStartDate, setCustomStartDate] = useState<string | undefined>(undefined);
    const [client, setClient] = useState<string | undefined>(undefined);
    const [dstring2, setDatestring2] = useState({
        sdate: '',
        edate: '',
    });
    const siteId = params.siteId;
    const sites = useSelector((state: RootState) => state.adOptDashboard.allSites);
    const sitesloading = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const siteName = sites.find((d) => String(d.site_id) === siteId)?.site_name;

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
        if (!sitesloading && siteId) {
            setClient(siteId);
        }
    }, [sitesloading, siteId]);

    const onClickBack = () => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.subscriptions}`);
    };
    return (
        <>
            <div className="flex flex-row flex-wrap mx-2 mb-4 mt-4">
                <div className="w-3/4">
                    <Select
                        loading={sitesloading}
                        size="large"
                        value={sites.find((d) => String(d.site_id) === client)?.site_name}
                        optionFilterProp="children"
                        onChange={(e) => {
                            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.subscriptions}/${e}`);
                        }}
                        className="w-full"
                        showSearch
                        options={sites.map((d) => {
                            return { value: d.site_id, label: d.site_name };
                        })}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    />
                </div>
            </div>

            <div className=" bg-gray-100 mt-4 py-8  px-4">
                <div className="bg-white rounded-xl drop-shadow-md pb-5">
                    <div className="relative bg-white pl-4 py-4 pr-4 rounded-xl">
                        <div className="flex flex-row justify-between items-center gap-3">
                            <div className="flex flex-row items-center gap-3">
                                <div onClick={onClickBack} className="bg-[#B4D0C133] cursor-pointer h-10 flex items-center px-4 rounded-lg mr-2 mt-1">
                                    <BiArrowBack className="mr-2" />
                                    <span>Back</span>
                                </div>
                                <div className="text-lg font-bold">{siteName}</div>
                                <div className="mb-4">
                                    <ComparisonSwitch compaison={compaison} onChange={(e: any) => setComparison(e)} title={'Show Comparison'} />
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 items-center">
                                <div className="-mt-4">
                                    <NetGrossFilter revenueType={revenueType} setRevenueType={setRevenueType}></NetGrossFilter>
                                </div>
                                <div className="-mt-4">
                                    <DateFilter
                                        applyDate={applyDate}
                                        setApplyDate={setApplyDate}
                                        setCustomEndDate={setCustomEndDate}
                                        setCustomStartDate={setCustomStartDate}
                                        dstring2={dstring2}
                                        compare={compare}
                                        setCompare={setCompare}
                                        setDatestring2={setDatestring2}
                                        showCompare={compaison}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="dashboard">
                <SubscriptionsTopCards
                    startDate={startDate}
                    endDate={endDate}
                    revenueType={revenueType}
                    comparison={compaison}
                    compare={compare}
                    compare_start_date={compare ? dstring2.sdate : ''}
                    compare_end_date={compare ? dstring2.edate : ''}
                    siteId={siteId}
                />

                {/* <WidgetSubscriptions startDate={startDate} endDate={endDate} revenueType={revenueType} siteId={siteId} /> */}

                <CountryDeviceSubscription startDate={startDate} endDate={endDate} siteId={siteId} />
                <ReasonForUnsubscribing startDate={startDate} endDate={endDate} siteId={siteId} />

                <SubscriptionsTables
                    startDate={startDate}
                    endDate={endDate}
                    revenueType={revenueType}
                    compare={compare}
                    comparison={compaison}
                    compare_start_date={compare ? dstring2.sdate : ''}
                    compare_end_date={compare ? dstring2.edate : ''}
                    siteId={siteId}
                />

                <SubscriptionsCharts
                    startDate={startDate}
                    endDate={endDate}
                    revenueType={revenueType}
                    compare={compare}
                    compare_start_date={compaison === false ? '' : dstring2.sdate}
                    compare_end_date={compaison === false ? '' : dstring2.edate}
                    siteId={siteId}
                />

                <BreakDown comparison={compaison} siteId={siteId} />
            </div>
        </>
    );
};

export default SubscriptionSiteDetails;
