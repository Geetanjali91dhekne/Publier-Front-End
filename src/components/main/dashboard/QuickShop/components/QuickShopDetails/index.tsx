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
import QuickShopCharts from '../dashboard/QuickShopCharts';
import QuickShopTable from '../dashboard/QuickShopTables';
import StatsQuickShop from '../dashboard/StatsQuickShop';
import QuickShopTopCards from '../dashboard/topCardsQuickShop';
export const API_date_format = 'YYYY/MM/DD';

const QuickShopDetails: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<string | undefined>(undefined);
    const [compaison, setComparison] = useState(true);
    const [compare, setCompare] = useState(false);
    const [revenueType, setRevenueType] = useState<string | undefined>('gross');
    const [applyDate, setApplyDate] = useState('last7Day');
    const [customEndDate, setCustomEndDate] = useState<string | undefined>(undefined);
    const [customStartDate, setCustomStartDate] = useState<string | undefined>(undefined);
    const [dstring2, setDatestring2] = useState({
        sdate: '',
        edate: '',
    });
    const siteId = params.siteId;
    const AllSitesloading = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const AllSitesdata = useSelector((state: RootState) => state.adOptDashboard.allSites);
    const siteName = AllSitesdata.find((d) => String(d.site_id) === params.siteId)?.site_name;

    useEffect(() => {
        if (!AllSitesloading && siteId) {
            setClient(siteId);
        }
    }, [AllSitesloading, siteId]);

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

    const onClickBack = () => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.quickShop}`);
    };
    return (
        <div className="mt-4">
            <div className="flex flex-row flex-wrap mx-2 justify-start items-center">
                <div className="w-3/4">
                    <Select
                        loading={AllSitesloading}
                        size="large"
                        value={AllSitesdata.find((d) => String(d.site_id) === client)?.site_name}
                        optionFilterProp="children"
                        onChange={(e) => {
                            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.quickShop}/${e}`);
                        }}
                        className="w-full"
                        showSearch
                        options={AllSitesdata.map((d) => {
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

            <div className="dashboard">
                <QuickShopTopCards
                    startDate={startDate}
                    endDate={endDate}
                    revenueType={revenueType}
                    comparison={compaison}
                    compare={compare}
                    compare_start_date={compare ? dstring2.sdate : ''}
                    compare_end_date={compare ? dstring2.edate : ''}
                    siteId={siteId}
                />

                <QuickShopTable startDate={startDate} endDate={endDate} revenueType={revenueType} compare={compaison} compare_start_date={dstring2.sdate} compare_end_date={dstring2.edate} siteId={siteId} />

                <StatsQuickShop startDate={startDate} endDate={endDate} revenueType={revenueType} siteId={siteId} />

                <QuickShopCharts
                    startDate={startDate}
                    endDate={endDate}
                    revenueType={revenueType}
                    compare={compaison}
                    compare_start_date={compaison === false ? '' : dstring2.sdate}
                    compare_end_date={compaison === false ? '' : dstring2.edate}
                    siteId={siteId}
                />
            </div>
        </div>
    );
};

export default QuickShopDetails;
