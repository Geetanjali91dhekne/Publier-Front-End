import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { RoundButton } from '../../../common/Button';
import DateFilter from '../../dashboard/AdOptimization/components/DateFilter';
import CommonDropDown from '../../../common/CommonDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/RootReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Spin, Switch } from 'antd';
import SetupAdBlockRecoveryActions from './redux/actions';
import adblockRecoverySetupUtils from './utils';
import Apis from '../../../../api';
import MessageActions from '../../../message/redux/actions';
import { HEADERMENU_PATH } from '../../../../routes/RoutesURL';
import { Preset } from './redux/types';
export const API_date_format = 'YYYY/MM/DD';
const columns: any = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '5': 'grid-cols-5',
}; 

const ComparePresetDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const params = useParams();
    const [siteName, setSiteName] = useState<any>('');
    const [statusLoader, setStatusLoader] = useState(false);
    const [selectedWidIds, setSelectedWidIds] = useState(location?.state?.data);
    const [applyDate, setApplyDate] = useState('last7Day');
    const [customEndDate, setCustomEndDate] = useState<string | undefined>(undefined);
    const [customStartDate, setCustomStartDate] = useState<string | undefined>(undefined);
    const [compare, setCompare] = useState(false);
    const [dstring2, setDatestring2] = useState({
        sdate: '',
        edate: '',
    });

    const allSites = useSelector((state: RootState) => state.adOptDashboard.allSites);
    const comparedData = useSelector((state: RootState) => state.setupAdblockRecovery.comparisonPresetData);
    const comapredDataLoader = useSelector((state: RootState) => state.setupAdblockRecovery.comparisonPresetDataLoader);
    const fetchingallPresets = useSelector((state: RootState) => state.setupAdblockRecovery.allPresets);
    const allPresets = () => {
        let presets: { title: string; value: string | null }[] = [];
        fetchingallPresets?.forEach((item: Preset) => {
            presets.push({
                title: item?.nick_name,
                value: item?.widget_id,
            });
        });
        return presets;
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
        if (startDate && endDate && selectedWidIds && params.siteId) {
            dispatch(
                SetupAdBlockRecoveryActions.fetchPresetCompareDataSetupAdblock({
                    start_date: startDate,
                    end_date: endDate,
                    widget_ids: selectedWidIds,
                    site_id: params.siteId,
                }),
            );
        }
        if (params.siteId) {
            const site = allSites?.find((e) => (String(e.site_id) === String(params.siteId)))
            setSiteName(site?.site_name);
        }
    }, [selectedWidIds, startDate, endDate, dispatch, params.siteId, allSites]);


    function convertHtml(text: any) {
        let rawText = adblockRecoverySetupUtils.getEditorStateByString(text);
        let desc_string = adblockRecoverySetupUtils.convertEditorStateDataToHtml(rawText);
        return desc_string;
    }

    function handlePresetChange(id: string, index: any) {
        const oldId = comparedData[index]?.widget_id;
        const newId = id;
        const idx = selectedWidIds?.findIndex((e: any) => {
            return e === oldId;
        });
        let dumIds = [...selectedWidIds];
        dumIds[idx] = newId;
        setSelectedWidIds(dumIds);
    }

    function handlePresetStatus(value: any, widId?: string) {
        setStatusLoader(true);
        Apis.setupAdBlockUpdatePresetStatusApi({
            widget_id: widId,
            status: value === true ? 1 : 0,
        })
            .then(() => {
                dispatch(MessageActions.showMessage({ text: 'Status updated successfully!', error: false }));
            })
            .catch((err) => {
                dispatch(MessageActions.showMessage({ text: String(err), error: true }));
            })
            .finally(() => setStatusLoader(false));
    }

    const getDeviec = (t: any) => {
        let devices = '';
        if (t.desktop_preview === 1) {
            devices = 'Desktop';
        }
        if (t.tablet_preview === 1) {
            devices = devices !== '' ? `${devices}, Tablet` : 'Tablet';
        }
        if (t.mobile_preview === 1) {
            devices = devices !== '' ? `${devices}, Mobile` : 'Mobile';
        }
        if (devices === '') {
            devices = 'No Data';
        }
        return devices;
    };

    const goBack = () => {
        const URL = `${HEADERMENU_PATH.setup}${HEADERMENU_PATH.setupAdBlockRecovery}`
        navigate(URL, {
            state: {
                historySiteId: params.siteId
            }
        });
    }

    return (
        <div className="dashboard ">
            <div className="relative pb-10 flex justify-between items-center">
                <div className="flex items-center justify-between w-full gap-5 h-20">
                    <div className="flex gap-5 items-center">
                        <div className="bg-[#C2D9CD] flex justify-center items-center text-[14px] font-[500] py-2 px-3 rounded-lg cursor-pointer" onClick={goBack}>
                            Back
                        </div>
                        <div className="roboto-medium text-2xl">Compare Presets | {siteName}</div>
                    </div>
                    <DateFilter
                        applyDate={applyDate}
                        setApplyDate={setApplyDate}
                        setCustomEndDate={setCustomEndDate}
                        setCustomStartDate={setCustomStartDate}
                        setDatestring2={setDatestring2}
                        dstring2={dstring2}
                        compare={compare}
                        setCompare={setCompare}
                        showCompare={false}
                    />
                </div>
            </div>

            {!comapredDataLoader && (
                <div className="py-8 ">
                    <div className={`grid ${columns[comparedData?.length]} gap-4 `}>
                        {comparedData.map((t, index) => (
                            <div className="p-3 w-full" key={`${index}_${'nick_name'}`}>
                                <div className="my-4 mb-3 max-w-[300px] ">
                                    <CommonDropDown value={t?.widget_id} dataList={allPresets()} setValue={(e: string) => handlePresetChange(e, index)} disabledSet={selectedWidIds} />
                                </div>

                                <div className="flex items-center gap-4 mt-8 ml-1">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">Status : </div>
                                    <Switch defaultChecked={t?.status} onChange={(e) => handlePresetStatus(e, t?.widget_id)} loading={statusLoader} />
                                    <div>{t?.status ? 'Active' : 'In-Active'}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`grid ${columns[comparedData?.length]} gap-4  `}>
                        {comparedData.map((t, index) => (
                            <div key={`${index}_${'Message'}`} className="px-4 py-3 pb-2 w-full   flex flex-col justify-between">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm Poppins-medium font-bold color-000000 title">Message</p>
                                </div>
                                <div className="my-4 mb-3">
                                    <div className="Poppins text-xs color-000000" dangerouslySetInnerHTML={{ __html: convertHtml(t?.notice_text) }} />
                                </div>
                                <div className="border rounded-3xl border-green-800 flex justify-center w-fit">
                                    <RoundButton
                                        title="Report"
                                        light={true}
                                        style={{ fontSize: '14px', fontWeight: '500' }}
                                        onClick={() => navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adBlockRecovery}/${t?.site_id}`, { state: { widgetId: t?.widget_id } })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* stats comparison */}

                    <div className="bg-[#EFEFEF] pl-5 my-5 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Stats Comparison</div>

                    <div className={`grid ${columns[comparedData?.length]} gap-4`}>
                        {comparedData.map((t, index) => (
                            <div key={index}>
                                <div className=" p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">AdBlock Page Views</div>
                                    <div className="Poppins-medium font-semibold   text-2xl text-neutral-500">{t?.adblock_pv}</div>
                                </div>

                                <div className="p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">% AdBlock users</div>
                                    <div className="Poppins-medium font-semibold   text-2xl text-neutral-500">{t?.adblock_users}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* preset comparison */}
                    <div className="bg-[#EFEFEF] pl-5 mt-8 mb-5 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Presets Comparison</div>

                    {/* start immediately */}
                    <div className={`grid ${columns[comparedData?.length]} gap-4`}>
                        {comparedData.map((t, index) => (
                            <div className="px-4 py-3 pb-2 w-full   flex flex-col justify-between" key={`${index}_${'Switch'}`}>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm Poppins-medium font-bold color-000000 title">Start Immediately</p>
                                </div>
                                <div className="my-4 mb-3">
                                    <Switch checked={t?.start_immediately} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* schedule preset */}
                    <div className={`grid ${columns[comparedData?.length]} gap-4`}>
                        {comparedData.map((t, index) => (
                            <div className="px-4 py-3 pb-2 w-full   flex flex-col justify-start" key={`${index}_${'Schedule preset'}`}>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm Poppins-medium font-bold color-000000 title">Schedule Preset</p>
                                </div>
                                <div className="my-4 mb-3">
                                    {
                                        <div className="Poppins-medium font-semibold   text-sm text-neutral-500">
                                            {t?.schedule_preset?.map((item: any, i: any) => {
                                                return <div>{`${item?.start_date}-${item?.end_date}`}</div>;
                                            })}
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* county */}
                    <div className={`grid ${columns[comparedData?.length]} gap-4`}>
                        {comparedData.map((t, index) => (
                            <div className="px-4 py-3 pb-2 w-full   flex flex-col justify-between" key={`${index}_${'country'}`}>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm Poppins-medium font-bold color-000000 title">Country</p>
                                </div>
                                <div className="my-4 mb-3">{<p className="Poppins-medium font-semibold   text-sm text-neutral-500">{t?.countries?.join(' ,')}</p>}</div>
                            </div>
                        ))}
                    </div>

                    {/* browser */}
                    <div className={`grid ${columns[comparedData?.length]} gap-4`}>
                        {comparedData.map((t, index) => (
                            <div className="px-4 py-3 pb-2 w-full   flex flex-col justify-between" key={`${index}_${'Message'}`}>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm Poppins-medium font-bold color-000000 title">Browser</p>
                                </div>
                                <div className="my-4 mb-3">{<p className="Poppins-medium font-semibold   text-sm text-neutral-500">{t?.browsers?.join(' ,')}</p>}</div>
                            </div>
                        ))}
                    </div>

                    <div className={`grid ${columns[comparedData?.length]} gap-4`}>
                        {comparedData.map((t, index) => (
                            <div key={index}>
                                <div className=" p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">Devices</div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">{getDeviec(t)}</div>
                                </div>

                                {/* notice deploymnet */}
                                <div className=" p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">AdBlock Recovery Notice deployment:</div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">Location - {t?.notice_location}</div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">
                                        {timing_location_after?.map((item) => {
                                            if (item?.value === t?.show_notice_after) {
                                                return <div>{item?.title}</div>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>

                                {/* lock access */}
                                <div className=" p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">Lock Access After</div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">
                                        {timing_access?.map((item) => {
                                            if (item?.value === String(t?.lock_access)) {
                                                return <div>{item?.title}</div>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">
                                        {timing_access_after?.map((item) => {
                                            if (item?.value === String(t?.lock_access_for)) {
                                                return <div>{item?.title}</div>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>

                                {/* allow close */}
                                <div className=" p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">Allow Close</div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">{t?.allow_close ? 'Yes' : 'No'}</div>
                                </div>

                                {/* blur site content */}
                                <div className=" p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">Blur Site Content Behind Notice</div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">{t?.blur_content_percentage}</div>
                                </div>

                                {/* show visit left before user is locked */}
                                <div className=" p-4 flex flex-col gap-3 ">
                                    <div className="text-sm Poppins-medium font-bold color-000000 title">Show visits left before user is locked out (Lock Access must be enabled)</div>
                                    <div className="Poppins-medium font-semibold   text-sm text-neutral-500">{t?.show_visits_left ? 'Yes' : 'No'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {comapredDataLoader && (
                <div className="flex justify-center items-center h-52">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default ComparePresetDetails;

export const timing_access = [
    {
        title: '1 Free Visit',
        value: '1',
    },
    {
        title: '2 Free Visit',
        value: '2',
    },
    {
        title: '3 Free Visit',
        value: '3',
    },
    {
        title: '4 Free Visit',
        value: '4',
    },
    {
        title: '5 Free Visit',
        value: '5',
    },
    {
        title: '6 Free Visit',
        value: '6',
    },
    {
        title: '7 Free Visit',
        value: '7',
    },
    {
        title: '8 Free Visit',
        value: '8',
    },
    {
        title: '9 Free Visit',
        value: '9',
    },
    {
        title: '10 Free Visit',
        value: '10',
    },
];

export const timing_access_after = [
    {
        title: '1 Minute',
        value: '1',
    },
    {
        title: '2 Minutes',
        value: '2',
    },
    {
        title: '5 Minutes',
        value: '5',
    },
    {
        title: '10 Minutes',
        value: '10',
    },
    {
        title: '30 Minutes',
        value: '30',
    },
    {
        title: '1 Hour',
        value: '60',
    },
    {
        title: '2 Hours',
        value: '120',
    },
    {
        title: '12 Hours',
        value: '720',
    },
    {
        title: '24 Hours',
        value: '1440',
    },
    {
        title: '36 Hours',
        value: '2160',
    },
    {
        title: '48 Hours',
        value: '2880',
    },
    {
        title: '5 Days',
        value: '7200',
    },
    {
        title: '1 Week',
        value: '10080',
    },
    {
        title: '1 Month',
        value: '43800',
    },
];

export const timing_location_after = [
    {
        title: 'Every Page View',
        value: '0',
    },
    {
        title: 'First Page View',
        value: '1',
    },
    {
        title: 'Second Page View',
        value: '2',
    },
    {
        title: 'Third Page View',
        value: '3',
    },
    {
        title: 'Fourth Page View',
        value: '4',
    },
    {
        title: 'Fifth Page View',
        value: '5',
    },
    {
        title: 'Sixth Page View',
        value: '6',
    },
    {
        title: 'Seventh Page View',
        value: '7',
    },
    {
        title: 'Eighth Page View',
        value: '8',
    },
    {
        title: 'Ninth Page View',
        value: '9',
    },
    {
        title: 'Tenth Page View',
        value: '10',
    },
    {
        title: 'Never',
        value: 'No',
    },
];
