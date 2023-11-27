import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import AdOptDashboardAction from '../../redux/actions';
import Apis from '../../../../../../api';
import download from 'downloadjs';
import MessageActions from '../../../../../message/redux/actions';
import { BiArrowBack } from 'react-icons/bi';
import { Input, Space } from 'antd';
import ComparisonSwitch from '../../../../../common/ComparisonSwitch';
import NetGrossFilter from '../NetGrossFilter';
import DateFilter from '../DateFilter';
import PButton from '../../../../../common/Button';
import Networks from '../demandChannel/Networks';

const API_date_format = 'YYYY/MM/DD';

const DemandchannelDetails: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const networkName = location.state?.network_name;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [adServer, serAdServer] = useState(false);
    const [applyDate, setApplyDate] = useState(location.state?.time_interval ?? 'last7Day');
    const [revenueType, setRevenueType] = useState<string | undefined>('gross');
    const [customEndDate, setCustomEndDate] = useState<string | undefined>(undefined);
    const [customStartDate, setCustomStartDate] = useState<string | undefined>(undefined);
    const [compaison, setComparison] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
    const [compare, setCompare] = useState(false);
    const [fileLoading, setLoading] = useState(false);
    const [dstring2, setDatestring2] = useState({
        sdate: '',
        edate: '',
    });
    const [dates, setDates] = useState<{
        startDate?: string;
        endDate?: string;
        revenue?: string;
        compare?: boolean;
        compare_start_date?: string;
        compare_end_date?: string;
        search?: string;
        pageNumber: number;
        time_interval?: string;
        ad_server: string;
    }>({
        startDate: location.state?.start_date,
        endDate: location.state?.end_date,
        revenue: undefined,
        compare: undefined,
        compare_start_date: undefined,
        compare_end_date: undefined,
        search: undefined,
        pageNumber: 0,
        time_interval: applyDate,
        ad_server: adServer ? 'ON' : 'OFF',
    });

    const onClickBack = () => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}`);
    };

    const onClickSearch = () => {
        setSearch(searchInput);
        setDates({
            ...dates,
            pageNumber: 1,
            ad_server: adServer ? 'ON' : 'OFF',
        });
        setPageNumber(1);
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

    useEffect(() => {
        if (startDate && endDate) {
            if (
                (dates.startDate !== startDate ||
                    dates.endDate !== endDate ||
                    (compare && (dates.compare_start_date !== dstring2.sdate || dates.compare_end_date !== dstring2.edate)) ||
                    dates.pageNumber !== pageNumber ||
                    (dates.ad_server === 'ON' ? true : false) !== adServer)
            ) {
                setDates({
                    ...dates,
                    endDate: endDate,
                    startDate: startDate,
                    compare: compare,
                    compare_start_date: dstring2.sdate,
                    compare_end_date: dstring2.edate,
                    pageNumber: pageNumber,
                    ad_server: adServer ? 'ON' : 'OFF',
                });
                dispatch(
                    AdOptDashboardAction.fetchSitesTableByNetwork(
                        {
                            start_date: startDate,
                            end_date: endDate,
                            revenue: revenueType,
                            time_interval: applyDate === 'last1Day' || applyDate === 'last7Day' || applyDate === 'last30Day' ? applyDate + 's' : 'customDates',
                            compare: compare,
                            compare_start_date: compare ? dstring2.sdate : '',
                            compare_end_date: compare ? dstring2.edate : '',
                            search_site: search,
                            ad_server: adServer ? 'ON' : 'OFF',
                            network_id: params.networkId
                        },
                        pageNumber,
                    ),
                );
            }
        }
    }, [dispatch, startDate, endDate, dates, compare, dstring2, pageNumber, search, applyDate, adServer, params.networkId]);

    const handleExport = () => {
        if (startDate && endDate) {
            const interval = applyDate === 'last1Day' ? 'last1days' : applyDate === 'last7Day' ? 'last7days' : applyDate === 'last30Day' ? 'last30days' : 'customDates';
            const data = {
                start_date: `${startDate}`,
                end_date: `${endDate}`,
                table_type: 'all',
                search_site: '',
                compare: compare,
                revenue: `${revenueType}`,
                time_interval: `${interval}`,
                compare_start_date: `${dstring2.sdate}`,
                compare_end_date: `${dstring2.edate}`,
                ad_server: adServer ? 'ON' : 'OFF',
                network_id: params.networkId
            };
            setLoading(true);

            Apis.fetchSitesByNewtorkExportTable(data)
                .then(({ data }) => {
                    download(data, `${moment().format('YYYY/MM/DD')}_Demand_partner_${networkName}.xlsx`);
                })
                .catch((err) => {
                    dispatch(MessageActions.showMessage({ text: String('Something went wrong'), error: true }));
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <div>
            <div className="relative flex flex-wrap justify-between items-center pb-14">
                <div className="flex items-center mt-4">
                    <div onClick={onClickBack} className="bg-[#B4D0C133] cursor-pointer h-10 flex items-center px-4 rounded-lg mr-2 mt-1">
                        <BiArrowBack className="mr-2" />
                        <span>Back</span>
                    </div>
                    <Space direction="vertical" className="searchBox">
                        <Input.Search
                            placeholder="Search for Sites / Clients"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    onClickSearch();
                                }
                            }}
                            size="large"
                            value={searchInput}
                            className="h-10 border-none max-w-xs w-88"
                            onSearch={onClickSearch}
                            enterButton
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </Space>
                </div>
                <div className="flex items-center gap-4">
                    <ComparisonSwitch title="Show Comparison" compaison={compaison} onChange={(e: any) => setComparison(e)} />
                    <ComparisonSwitch title="GAM Only" compaison={adServer} onChange={(e: any) => serAdServer(e)} />
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
            <div className="w-[100%] relative flex flex-row-reverse -mt-8">
                <PButton loading={fileLoading} className="top-12" title={'Export'} onClick={handleExport} />
            </div>
            <div className="font-bold pl-5 pt-4">
                <h2 className="">{networkName}</h2>
            </div>
            <Networks compaison={compaison} setPageNumber={setPageNumber} pageNumber={pageNumber} revenueType={revenueType} ad_server={dates?.ad_server} />
        </div>
    );
};

export default DemandchannelDetails;