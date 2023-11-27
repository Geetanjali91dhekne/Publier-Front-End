import { Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import { RootState } from '../../../../../../store/RootReducer';
import ComparisonSwitch from '../../../../../common/ComparisonSwitch';
import DateFilter from '../../../AdOptimization/components/DateFilter';
// import NetGrossFilter from '../../../AdOptimization/components/NetGrossFilter';
import AdBlockRecoveryCharts from '../dashboard/AdBlockRecoveryCharts';
import AdBlockRecoveryTables from '../dashboard/AdBlockRecoveryTables';
import InfoGraph from '../dashboard/InfoGraph';
import AdBlockRecoveryTopCards from '../dashboard/topCardsAdBlockRecovery';
import WidgetAdBlock from '../dashboard/Widgets';
import CommonDropDown from '../../../../../common/CommonDropDown';
import SetupAdBlockRecoveryActions from '../../../../setup/SetupAdBlockRecovery/redux/actions';
import { Preset } from '../../../../setup/SetupAdBlockRecovery/redux/types';
export const API_date_format = 'YYYY/MM/DD';

const AdBlockRecoveryDetails: React.FC = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [client, setClient] = useState<string | undefined>(undefined);
    const [widgetId, setWidgetId] = useState<string | null>(null);
    const [compaison, setComparison] = useState(true);
    const [compare, setCompare] = useState(false);
    // const [revenueType, setRevenueType] = useState<string | undefined>('gross');
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
    const allPresets = useSelector((state: RootState) => state.setupAdblockRecovery.allPresets);
    const allPresetsLoader = useSelector((state: RootState) => state.setupAdblockRecovery.allPresetsLoader);
    const fetchingallPresets = useSelector((state: RootState) => state.setupAdblockRecovery.allPresets);
    const allPresetsListData = () => {
        let presets: { title: string; value: string | null }[] = [];
        presets.push({
            title: 'All',
            value: null,
        });
        fetchingallPresets?.forEach((item: Preset) => {
            presets.push({
                title: item?.nick_name,
                value: item?.widget_id,
            });
        });
        return presets;
    };

    useEffect(() => {
        if (!AllSitesloading && params.siteId) {
            setClient(params.siteId);
        }
    }, [AllSitesloading, params.siteId]);

    useEffect(() => {
        if (siteId) {
            dispatch(SetupAdBlockRecoveryActions.fetchAllPresetSetupAdblock(siteId));
        }
    }, [siteId, dispatch]);

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
        navigate(-1);
    };

    useEffect(() => {
        if (location?.state?.widgetId !== undefined) {
            setWidgetId(location?.state?.widgetId);
        } else if (location?.state?.widgetId === undefined && allPresets?.length > 0) {
            setWidgetId(null);
        } else {
            setWidgetId(null);
        }
    }, [allPresets, location?.state?.widgetId]);

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
                            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adBlockRecovery}/${e}`);
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
                                <div className="flex flex-col -mt-4">
                                    <label className="text-[10px]">Presets</label>
                                    <div className="max-w-[300px] -mt-1">
                                        <CommonDropDown value={!allPresetsLoader && widgetId} width={250} dataList={allPresetsListData()} setValue={(e: string) => setWidgetId(e)} loader={allPresetsLoader} customClass={'border-none w-[250px]'} />
                                    </div>
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
                <AdBlockRecoveryTopCards
                    startDate={startDate}
                    endDate={endDate}
                    revenueType={' '}
                    comparison={compaison}
                    compare={compare}
                    compare_start_date={compare ? dstring2.sdate : ''}
                    compare_end_date={compare ? dstring2.edate : ''}
                    siteId={siteId}
                    widgetId={widgetId}
                />
                <WidgetAdBlock startDate={startDate} endDate={endDate} siteId={siteId} widgetId={widgetId} />

                <InfoGraph startDate={startDate} endDate={endDate} siteId={siteId} widgetId={widgetId} />

                <AdBlockRecoveryTables startDate={startDate} endDate={endDate} comparison={compaison} compare={compare} compare_start_date={dstring2.sdate} compare_end_date={dstring2.edate} siteId={siteId} widgetId={widgetId} />

                <AdBlockRecoveryCharts
                    startDate={startDate}
                    endDate={endDate}
                    revenueType={' '}
                    compare={compaison}
                    compare_start_date={compaison === false ? '' : dstring2.sdate}
                    compare_end_date={compaison === false ? '' : dstring2.edate}
                    siteId={siteId}
                    widgetId={widgetId}
                />
            </div>
        </div>
    );
};

export default AdBlockRecoveryDetails;
