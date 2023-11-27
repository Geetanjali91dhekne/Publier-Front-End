import moment from 'moment-timezone';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../../store/RootReducer';
import AdOptDashboardAction from '../../redux/actions';
import AdOptDashboardUtils from '../../utils';
import BiaxialAreaChart from './Charts/BiaxialAreaChart';
import BiaxialLineChart from './Charts/BiaxialLineChart';
import SimpleAreaChart from './Charts/SimpleAreaChart';
import PopularPages from './RealTimeTables/PopularPages';
import RealTimeNetworkTable from './RealTimeTables/RealTimeNetworkTable';
import RealTimeSizeTable from './RealTimeTables/RealTimeSizeTable';
import { commaSeperator } from '../../../../../../utils/Validation';
type Props = {
    hourSelected: string;
    revenueType: any;
    setUpdatedTime: any;
};

const ChartsClientRealTimeData: React.FC<Props> = ({ hourSelected, revenueType, setUpdatedTime }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const siteId = params.siteId;
    const pageViewImpData = useSelector((state: RootState) => state.adOptDashboard.pageViewImpressionRealtime);
    const pageViewImpDataLoader = useSelector((state: RootState) => state.adOptDashboard.pageViewImpressionRealtimeLoader);
    const revReqRealtimedata = useSelector((state: RootState) => state.adOptDashboard.revReqGraphBySiteRealtime);
    const revReqRealtimedataLoader = useSelector((state: RootState) => state.adOptDashboard.revReqGraphBySiteRealtimeLoader);
    const cpmRealtimeData = useSelector((state: RootState) => state.adOptDashboard.cpmGraphBySiteRealtime);
    const cpmRealtimeDataLoader = useSelector((state: RootState) => state.adOptDashboard.cpmGraphBySiteRealtimeLoader);
    const rpmRealtimeData = useSelector((state: RootState) => state.adOptDashboard.rpmGraphBySiteRealtime);
    const rpmRealtimeDataLoader = useSelector((state: RootState) => state.adOptDashboard.rpmGraphBySiteRealtimeLoader);

    const popularPagesData = useSelector((state: RootState) => state.adOptDashboard.popularPageTableRealtime);
    const popularPagesLoader = useSelector((state: RootState) => state.adOptDashboard.popularPageTableRealtimeLoader);
    const sizeTableData = useSelector((state: RootState) => state.adOptDashboard.sizeTableRealTime);
    const sizeTableLoader = useSelector((state: RootState) => state.adOptDashboard.sizeTableRealtimeLoader);
    const networkTableData = useSelector((state: RootState) => state.adOptDashboard.networkTableRealtime);
    const networkTableLoader = useSelector((state: RootState) => state.adOptDashboard.networkTableRealtimeLoader);
    let showLoad = sessionStorage.getItem('loading');

    const ApiCalls = () => {
        sessionStorage.setItem('loading', 'yes');
        setUpdatedTime(`${moment().format('h:mm.s a')}`);
        dispatch(
            AdOptDashboardAction.fetchPageViewImpressionRealTimes(
                {
                    time_interval: hourSelected,
                },
                siteId,
            ),
        );
        dispatch(
            AdOptDashboardAction.fetchRevenueRequestGraphRealtime(
                {
                    time_interval: hourSelected,
                    revenue: revenueType,
                },
                siteId,
            ),
        );
        dispatch(
            AdOptDashboardAction.fetchCpmGraphRealtime(
                {
                    time_interval: hourSelected,
                    revenue: revenueType,
                },
                siteId,
            ),
        );
        dispatch(
            AdOptDashboardAction.fetchRpmGraphRealtime(
                {
                    time_interval: hourSelected,
                    revenue: revenueType,
                },
                siteId,
            ),
        );
        dispatch(
            AdOptDashboardAction.fetchSizeTableRealtime(
                {
                    time_interval: hourSelected,
                    revenue: revenueType,
                },
                siteId,
            ),
        );
        dispatch(
            AdOptDashboardAction.fetchNetworkTableRealtime(
                {
                    time_interval: hourSelected,
                    revenue: revenueType,
                },
                siteId,
            ),
        );
        dispatch(
            AdOptDashboardAction.fetchPopularPageTableRealtime(
                {
                    time_interval: hourSelected,
                    revenue: revenueType,
                },
                siteId,
            ),
        );
    };

    useEffect(() => {
        ApiCalls();

        let interval = setInterval(() => {
            console.log(hourSelected);
            ApiCalls();
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch, hourSelected, revenueType, siteId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div>
                <BiaxialAreaChart totalPageView={pageViewImpData?.total_page_view} data={AdOptDashboardUtils.parsePageViewImpGraphData(pageViewImpData)} loading={pageViewImpDataLoader}></BiaxialAreaChart>
            </div>
            <div className="sm:grid grid-cols-2 gap-5 mt-8 xl:grid-cols-3 ">
                <div className="">
                    {' '}
                    <BiaxialLineChart
                        title1={'Revenue'}
                        title2={'Ad Request'}
                        value1={`$${commaSeperator(parseFloat(revReqRealtimedata?.total_revenue || 0).toFixed(2))}`}
                        value2={`${commaSeperator(String(revReqRealtimedata?.total_request || 0))}`}
                        data={AdOptDashboardUtils.convertDataInReal('revReq', revReqRealtimedata)}
                        loading={revReqRealtimedataLoader}
                        suffix={'$'}
                        prefix1={'$'}
                    ></BiaxialLineChart>
                </div>
                <div className="">
                    {' '}
                    <SimpleAreaChart
                        suffix={'$'}
                        prefix={'$'}
                        title="CPM"
                        compaison={false}
                        value={`$${commaSeperator(parseFloat(cpmRealtimeData?.total_cpms || 0).toFixed(2))}`}
                        data={AdOptDashboardUtils.convertDataInReal('cpm', cpmRealtimeData)}
                        loading={cpmRealtimeDataLoader}
                    />
                </div>
                <div className="">
                    {' '}
                    <SimpleAreaChart
                        suffix={'$'}
                        prefix={'$'}
                        title="RPM"
                        compaison={false}
                        value={`$${commaSeperator(parseFloat(rpmRealtimeData?.total_rpm || 0).toFixed(2))}`}
                        data={AdOptDashboardUtils.convertDataInReal('rpm', rpmRealtimeData)}
                        loading={rpmRealtimeDataLoader}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-8 mt-8">
                <div className=" ">
                    <div className="font-bold text-[24px] mb-4 ml-2">Top Sizes</div>
                    <RealTimeSizeTable items={sizeTableData} loading={showLoad === 'yes' ? false : sizeTableLoader} />
                </div>
                <div className="">
                    <div className="font-bold text-[24px] mb-4 ml-2">Top Networks</div>
                    <RealTimeNetworkTable items={networkTableData} loading={showLoad === 'yes' ? false : networkTableLoader} />
                </div>
            </div>

            <div className=" mt-8">
                <div className=" ">
                    <div className="font-bold text-[24px] mb-4 ml-2">Popular Pages</div>
                    <PopularPages items={popularPagesData} loading={showLoad === 'yes' ? false : popularPagesLoader} />
                </div>
            </div>
        </div>
    );
};

export default ChartsClientRealTimeData;
