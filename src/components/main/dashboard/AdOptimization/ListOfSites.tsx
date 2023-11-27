import React, { useEffect, useMemo, useState } from 'react';
import PTabs from '../../../common/Tabs';
import DateFilter from './components/DateFilter';
import NetGrossFilter from './components/NetGrossFilter';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../routes/RoutesURL';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import AdOptDashboardAction from './redux/actions';
import Sites from './components/sitesList/Sites';
import ComparisonSwitch from '../../../common/ComparisonSwitch';
import { Input, Space } from 'antd';
import PButton from '../../../common/Button';
import Apis from '../../../../api';
import download from 'downloadjs';
import MessageActions from '../../../message/redux/actions';

const API_date_format = 'YYYY/MM/DD';

const SitesListOfAdOptimisation: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [adServer, serAdServer] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [applyDate, setApplyDate] = useState('last7Day');
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
        all: {
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
        };
        recent: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            search?: string;
            pageNumber: number;
            ad_server?: string;
        };
        favourite: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            search?: string;
            pageNumber: number;
            ad_server?: string;
        };
    }>({
        all: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            search: undefined,
            pageNumber: 0,
            time_interval: applyDate,
            ad_server: adServer ? 'ON' : 'OFF',
        },
        recent: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            search: undefined,
            pageNumber: 0,
            ad_server: adServer ? 'ON' : 'OFF',
        },
        favourite: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            search: undefined,
            pageNumber: 0,
            ad_server: adServer ? 'ON' : 'OFF',
        },
    });

    const onTabChange = (tab: string) => {
        setPageNumber(tab === 'all' ? (dates.all.pageNumber === 0 ? 1 : dates.all.pageNumber) : tab === 'favorites' ? (dates.favourite.pageNumber === 0 ? 1 : dates.favourite.pageNumber) : dates.recent.pageNumber === 0 ? 1 : dates.recent.pageNumber);
        setActiveTab(tab);
        setSearch(undefined);
        setSearchInput(undefined);
    };

    const onClickBack = () => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}`);
    };

    const onClickSearch = () => {
        setSearch(searchInput);
        if (activeTab === 'all') {
            setDates({
                ...dates,
                all: {
                    pageNumber: 1,
                    ad_server: adServer ? 'ON' : 'OFF',
                },
            });
        }
        if (activeTab === 'favorites') {
            setDates({
                ...dates,
                favourite: {
                    pageNumber: 1,
                    ad_server: adServer ? 'ON' : 'OFF',
                },
            });
        }
        if (activeTab === 'recent') {
            setDates({
                ...dates,
                favourite: {
                    pageNumber: 1,
                    ad_server: adServer ? 'ON' : 'OFF',
                },
            });
        }
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
                activeTab === 'all' &&
                (dates.all.startDate !== startDate ||
                    dates.all.endDate !== endDate ||
                    (compare && (dates.all.compare_start_date !== dstring2.sdate || dates.all.compare_end_date !== dstring2.edate)) ||
                    dates.all.pageNumber !== pageNumber ||
                    (dates.all.ad_server === 'ON' ? true : false) !== adServer)
            ) {
                setDates({
                    ...dates,
                    all: {
                        endDate: endDate,
                        startDate: startDate,
                        compare: compare,
                        compare_start_date: dstring2.sdate,
                        compare_end_date: dstring2.edate,
                        pageNumber: pageNumber,
                        ad_server: adServer ? 'ON' : 'OFF',
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchAllSitesOfList(
                        {
                            start_date: startDate,
                            end_date: endDate,
                            time_interval: applyDate === 'last1Day' || applyDate === 'last7Day' || applyDate === 'last30Day' ? applyDate + 's' : 'customDates',
                            compare: compare,
                            compare_start_date: compare ? dstring2.sdate : '',
                            compare_end_date: compare ? dstring2.edate : '',
                            search_site: search,
                            ad_server: adServer ? 'ON' : 'OFF',
                        },
                        pageNumber,
                    ),
                );
            }
            if (
                activeTab === 'favorites' &&
                (dates.favourite.startDate !== startDate ||
                    dates.favourite.endDate !== endDate ||
                    (compare && (dates.favourite.compare_start_date !== dstring2.sdate || dates.favourite.compare_end_date !== dstring2.edate)) ||
                    dates.favourite.pageNumber !== pageNumber ||
                    (dates.favourite.ad_server === 'ON' ? true : false) !== adServer)
            ) {
                setDates({
                    ...dates,
                    favourite: {
                        endDate: endDate,
                        startDate: startDate,
                        compare: compare,
                        compare_start_date: dstring2.sdate,
                        compare_end_date: dstring2.edate,
                        pageNumber: pageNumber,
                        ad_server: adServer ? 'ON' : 'OFF',
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchFavoriteSites(
                        {
                            start_date: startDate,
                            end_date: endDate,
                            compare: compare,
                            compare_start_date: compare ? dstring2.sdate : '',
                            compare_end_date: compare ? dstring2.edate : '',
                            search_site: search,
                            ad_server: adServer ? 'ON' : 'OFF',
                        },
                        pageNumber,
                    ),
                );
            }
        }
    }, [dispatch, startDate, endDate, activeTab, dates, compare, dstring2, pageNumber, search, applyDate, adServer]);

    useEffect(() => {
        if (startDate && endDate) {
            if (
                activeTab === 'recent' &&
                (dates.recent.startDate !== startDate ||
                    dates.recent.endDate !== endDate ||
                    (compare && (dates.recent.compare_start_date !== dstring2.sdate || dates.recent.compare_end_date !== dstring2.edate)) ||
                    (dates.recent.ad_server === 'ON' ? true : false) !== adServer)
            ) {
                setDates({
                    ...dates,
                    recent: {
                        endDate: endDate,
                        startDate: startDate,
                        compare: compare,
                        compare_start_date: dstring2.sdate,
                        pageNumber: 0,
                        compare_end_date: dstring2.edate,
                        ad_server: adServer ? 'ON' : 'OFF',
                    },
                });
                dispatch(
                    AdOptDashboardAction.fetchRecentSites({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare ? dstring2.sdate : '',
                        compare_end_date: compare ? dstring2.edate : '',
                        search_site: search,
                        ad_server: adServer ? 'ON' : 'OFF',
                    }),
                );
            }
        }
    }, [dispatch, startDate, endDate, activeTab, dates, compare, dstring2, search, adServer]);

    const handleExport = () => {
        if (startDate && endDate) {
            const interval = applyDate === 'last1Day' ? 'last1days' : applyDate === 'last7Day' ? 'last7days' : applyDate === 'last30Day' ? 'last30days' : 'customDates';
            const data = {
                start_date: `${startDate}`,
                end_date: `${endDate}`,
                table_type: `${activeTab}`,
                search_site: '',
                compare: compare,
                revenue: `${revenueType}`,
                time_interval: `${interval}`,
                compare_start_date: `${dstring2.sdate}`,
                compare_end_date: `${dstring2.edate}`,
                ad_server: adServer ? 'ON' : 'OFF',
            };
            setLoading(true);

            Apis.fetchSitesExportTable(data)
                .then(({ data }) => {
                    download(data, `${moment().format('YYYY/MM/DD')}_${activeTab}.xlsx`);
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
            <PTabs
                activeTab={activeTab}
                setActiveTab={onTabChange}
                tabs={[
                    { key: 'all', title: 'All' },
                    { key: 'favorites', title: 'Favorites' },
                    { key: 'recent', title: 'Recent' },
                ]}
            />
            <Sites activeTab={activeTab} compaison={compaison} setPageNumber={setPageNumber} pageNumber={pageNumber} revenueType={revenueType} ad_server={activeTab === 'all' ? dates?.all?.ad_server : activeTab === 'favorites' ? dates?.favourite?.ad_server : dates?.recent?.ad_server} />
        </div>
    );
};

export default SitesListOfAdOptimisation;
