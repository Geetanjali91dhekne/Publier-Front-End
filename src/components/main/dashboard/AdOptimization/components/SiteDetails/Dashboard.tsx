import React, { useState, useEffect, useMemo } from 'react';
import NetGrossFilter from '../NetGrossFilter';
import DateFilter from '../DateFilter';
import { AiFillStar } from 'react-icons/ai';
import ComparisonSwitch from '../../../../../common/ComparisonSwitch';
import { BiArrowBack } from 'react-icons/bi';
import LineAreaChart from './Charts/LineAreaChart';
import { commaSeperator } from '../../../../../../utils/Validation';
import FillUnFilledDashLineChart from './Charts/FillUnFilledDashLineChart';
import CatogoryTableDashboard from './CatogoryTableDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/RootReducer';
import AdOptDashboardAction from '../../redux/actions';
import moment from 'moment';
import { Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import RevImpPieChart from './Charts/RevImpPieChart';

export const API_date_format = 'YYYY/MM/DD';

const AdOptimizationSiteDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [rowid, setrowid]: any = useState({
        status: false,
        id: '',
        current: false,
    });

    const siteId = params.siteId;

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

    const cpmGraphBySite = useSelector((state: RootState) => state.adOptDashboard.CpmGraphBySite);
    const cpmGraphBySiteLoader = useSelector((state: RootState) => state.adOptDashboard.CpmGraphBySiteLoader);

    const revenueGraphBySite = useSelector((state: RootState) => state.adOptDashboard.RevenueGraphBySite);
    const revenueGraphBySiteLoader = useSelector((state: RootState) => state.adOptDashboard.RevenueGraphBySiteLoader);

    const requestGraphBySite = useSelector((state: RootState) => state.adOptDashboard.RequestGraphBySite);
    const requestGraphBySiteLoader = useSelector((state: RootState) => state.adOptDashboard.RequestGraphBySiteLoader);

    const sites = useSelector((state: RootState) => state.adOptDashboard.allSites);

    const demandChannelStat = useSelector((state: RootState) => state.adOptDashboard.demandChannelStat);
    const demandChannelStatLoading = useSelector((state: RootState) => state.adOptDashboard.demandChannelStatLoading);
    const sizeStat = useSelector((state: RootState) => state.adOptDashboard.sizeStat);
    const sizeStatLoading = useSelector((state: RootState) => state.adOptDashboard.sizeStatLoading);
    const impsGraphsBySite = useSelector((state: RootState) => state.adOptDashboard.ImpsGraphBySite);
    const impsGraphsBySiteLoader = useSelector((state: RootState) => state.adOptDashboard.ImpsGraphBySiteLoader);

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
        if (startDate && endDate && siteId) {
            dispatch(
                AdOptDashboardAction.fetchFillUnfillAndUnrenderedGraph(
                    {
                        end_date: endDate,
                        start_date: startDate,
                    },
                    siteId,
                ),
            );
        }
    }, [dispatch, startDate, endDate, siteId]);

    useEffect(() => {
        if (endDate && startDate && siteId) {
            dispatch(
                AdOptDashboardAction.fetchDemandChannelStatBySite(
                    {
                        end_date: endDate,
                        revenue: revenueType,
                        start_date: startDate,
                        compare: compare,
                        compare_start_date: compare === false ? '' : dstring2.sdate,
                        compare_end_date: compare === false ? '' : dstring2.edate,
                    },
                    siteId,
                ),
            );
            dispatch(
                AdOptDashboardAction.fetchSizeBySite(
                    {
                        end_date: endDate,
                        revenue: revenueType,
                        start_date: startDate,
                        compare: compare,
                        compare_start_date: compare === false ? '' : dstring2.sdate,
                        compare_end_date: compare === false ? '' : dstring2.edate,
                    },
                    siteId,
                ),
            );
            dispatch(
                AdOptDashboardAction.fetchCpmGraphBySite(
                    {
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare === false ? '' : dstring2.sdate,
                        compare_end_date: compare === false ? '' : dstring2.edate,
                    },
                    siteId,
                ),
            );
            dispatch(
                AdOptDashboardAction.fetchRevenueGraphBySite(
                    {
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare === false ? '' : dstring2.sdate,
                        compare_end_date: compare === false ? '' : dstring2.edate,
                    },
                    siteId,
                ),
            );
            dispatch(
                AdOptDashboardAction.fetchRequestGraphBySite(
                    {
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare === false ? '' : dstring2.sdate,
                        compare_end_date: compare === false ? '' : dstring2.edate,
                    },
                    siteId,
                ),
            );
            dispatch(
                AdOptDashboardAction.fetchImpaGraphBySite(
                    {
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare === false ? '' : dstring2.sdate,
                        compare_end_date: compare === false ? '' : dstring2.edate,
                    },
                    siteId,
                ),
            );
        }
    }, [dispatch, startDate, endDate, siteId, compare, revenueType, dstring2]);

    const onClickBack = () => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}`);
    };

    const siteName = sites.find((d) => String(d.site_id) === siteId)?.site_name;
    const SITE_DETAILS = sites.find((d) => String(d.site_id) === siteId);

    const favunfav = useSelector((state: RootState) => state.adOptDashboard.FavouriteUnfavourite);

    useEffect(() => {
        if (favunfav?.status === true) {
            setrowid({
                status: false,
                currrent: true,
            });
        }
    }, [dispatch, favunfav?.status]);

    return (
        <>
            <div className="bg-gray-100 mt-4 py-8  px-4">
                <div className='bg-white rounded-xl drop-shadow-md pb-5'>
                    <div className="relative bg-white pl-4 py-4 pr-4 rounded-xl">
                        <div className="flex flex-row justify-between items-center gap-3">
                            <div className="flex flex-row items-center gap-3">
                                <div onClick={onClickBack} className="bg-[#B4D0C133] cursor-pointer h-10 flex items-center px-4 rounded-lg mr-2 mt-1">
                                    <BiArrowBack className="mr-2" />
                                    <span>Back</span>
                                </div>
                                <div>
                                    {/* <div className="w-12 h-12 bg-[#B4D0C133] rounded-full flex justify-center items-center">{siteName?.charAt(0)}</div> */}
                                    {siteName && (
                                        <div className="cursor-pointer rounded-full flex justify-center items-center">
                                            {rowid.status === true ? (
                                                <Spin />
                                            ) : (
                                                <AiFillStar
                                                    onClick={() => {
                                                        setrowid({
                                                            status: true,
                                                        });
                                                        dispatch(
                                                            AdOptDashboardAction.fetchSitesFavUnfav(
                                                                {
                                                                    site_id: SITE_DETAILS?.site_id,
                                                                    favourite_flag: SITE_DETAILS?.favourite !== undefined ? (SITE_DETAILS?.favourite > 0 ? 0 : 1) : 0,
                                                                },
                                                                'DashBoard',
                                                            ),
                                                        );
                                                    }}
                                                    size={'1.5rem'}
                                                    // className="mr-1"
                                                    color={SITE_DETAILS?.favourite !== undefined ? (SITE_DETAILS.favourite > 0 ? '#F0A236' : 'lightgray') : 'lightgray'}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="text-lg font-bold">{siteName}</div>
                                <div className="mb-4">
                                    <ComparisonSwitch compaison={compaison} onChange={(e: any) => setComparison(e)} title={'Show Comparison'} />
                                    {/* <ComparisonSwitch compaison={adServer} onChange={(e: any) => serAdServer(e)} title={'Ad Server'} /> */}
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


                <div>
                    <div className="grid grid-cols-2 gap-5 mt-8">
                        <LineAreaChart
                            suffix={'$'}
                            prefix={'$'}
                            title="Revenue"
                            compaison={compaison}
                            value={`$${commaSeperator(parseFloat(String(revenueGraphBySite?.total || 0)).toFixed(2))}`}
                            data={revenueGraphBySite?.graph}
                            loading={revenueGraphBySiteLoader || false}
                        />
                        <LineAreaChart
                            suffix={' '}
                            title="Impression"
                            compaison={compaison}
                            value={`${commaSeperator(String(impsGraphsBySite?.total || 0))}`}
                            data={impsGraphsBySite?.graph || []}
                            loading={impsGraphsBySiteLoader || false}
                        />

                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-8">
                        <LineAreaChart
                            suffix={'$'}
                            prefix={'$'}
                            title="CPM"
                            compaison={compaison}
                            value={`$${commaSeperator(parseFloat(String(cpmGraphBySite?.total || 0)).toFixed(2))}`}
                            data={cpmGraphBySite?.graph || []}
                            loading={cpmGraphBySiteLoader || false}
                        />
                        {
                            SITE_DETAILS?.gam === "1" && <LineAreaChart
                                title="Requests"
                                compaison={compaison}
                                value={commaSeperator(String(requestGraphBySite?.total || 0))}
                                data={requestGraphBySite?.graph || []}
                                loading={requestGraphBySiteLoader || false}
                            />
                        }
                    </div>
                    {
                        SITE_DETAILS?.gam === "1" && <div className="my-8">
                            <FillUnFilledDashLineChart />
                        </div>
                    }
                    <CatogoryTableDashboard
                        siteId={siteId}
                        compare={compare}
                        compare_end_date={compare === false ? '' : dstring2.edate}
                        compare_start_date={compare === false ? '' : dstring2.sdate}
                        endDate={endDate}
                        revenueType={revenueType}
                        startDate={startDate}
                        ad_server={SITE_DETAILS?.gam === "1" ? 'ON' : 'OFF'}
                    />
                </div>
            </div>
            <div className="bg-white px-8 pt-4">
                <div className="pb-4">
                    <div className="flex flex-row justify-between">
                        <div>
                            <div className="font-bold text-[32px] inter">Share of Impressions/Revenue</div>
                            <div className="montserrat text-sm">{`${moment(startDate).format('ll')}  ${endDate !== '' ? `to ${moment(endDate).format('ll')}` : ''}`}</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="max-w-[600px] w-[49%] ">
                        <RevImpPieChart
                            compaison={compaison}
                            loading={demandChannelStatLoading}
                            list={demandChannelStat}
                            title={'Demand Partners Stats'}
                            label1={'Impressions'}
                            label2={'Revenue'}
                        />
                    </div>
                    <div className="max-w-[600px] w-[65%] ">
                        <RevImpPieChart
                            compaison={compaison}
                            loading={sizeStatLoading}
                            list={sizeStat}
                            title={'Size Stats'}
                            label1={'Impressions'}
                            label2={'Revenue'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdOptimizationSiteDashboard;
