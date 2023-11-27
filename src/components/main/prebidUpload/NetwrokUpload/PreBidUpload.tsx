import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DatePickerProps, Select, Spin, Table } from 'antd';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/RootReducer';
import PButton, { RoundButton } from '../../../common/Button';
import PrebidDashboardAction from './redux/actions';
import { PrebidFailedData } from './redux/types';
import Apis from '../../../../api';
import MessageActions from '../../../message/redux/actions';
import ComparisonSwitch from '../../../common/ComparisonSwitch';
import { RenderSelect } from '../NetworkSettings/utils/modulerComponents';
import PCard from '../../../common/Card';
import { commaSeperator } from '../../../../utils/Validation';
import PModal from '../../../common/Modal';
import CommonDropDown from '../../../common/CommonDropDown';
import PNormalInput from '../../../common/NormalInput';


type Props = {
    comparison?: boolean;
};

const PreBidUpload: React.FC<Props> = ({ comparison }) => {
    const dispatch = useDispatch();
    const [Date, setDate] = useState('');
    const [selectValue, setselectValue] = useState('');
    const loading = useSelector((state: RootState) => state.prebid.prebidNetworklistlLoading);
    const data = useSelector((state: RootState) => state.prebid.prebidNetworklist);
    const failedData = useSelector((state: RootState) => state.prebid.prebidFailedData);
    const failedDataTopCardsData = useSelector((state: RootState) => state.prebid.prebidFailedTopCardData);
    const prebidFailedDatalLoading = useSelector((state: RootState) => state.prebid.prebidFailedDatalLoading);
    const prebidFailDataFlagList = useSelector((state: RootState) => state.prebid.prebidFaildDataFlagList);
    const prebidSiteData = useSelector((state: RootState) => state.prebid.prebidDropDownSite);
    const prebidSizeData = useSelector((state: RootState) => state.prebid.prebidDropDownSize);
    const prebidSizeAndSizeLoader = useSelector((state: RootState) => state.prebid.prebidSiteAndSizeLoader);
    const fileInputRef = useRef<any>();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [stateFailedData, setStateFailedData] = useState(failedData);
    const [flagList, setFlagList] = useState<any>({});
    const [insertRowLoader, setInsertRowLoader] = useState(false);
    const [csvBtnLoader, setCsvBtnLoader] = useState(false);
    const [hideRevenue, setHideRevenue] = useState(false);
    const [validateCsv, setValidateCsv] = useState(false);
    const [ifCsvUploaded, setIfCsvUploaded] = useState(false);
    const [runApi, setRunApi] = useState(false);

    const [newRowData, setNewRowData] = useState<{
        open: boolean;
        siteAlias?: any;
        sizeAlias?: any;
        impression?: any;
        revenue?: any;
        clicks?: any;
    }>({
        open: false,
        siteAlias: '',
        sizeAlias: '',
        impression: '',
        revenue: '',
        clicks: '',
    })
    const [topCardData, setTopCardData] = useState<{
        clicks: any,
        revenue: any,
        impressions: any,
    }>({
        clicks: undefined,
        revenue: undefined,
        impressions: undefined,
    })

    const [deleteRecords, setDeleteRecords] = useState<{
        open: boolean;
        deleteInput?: any;
        validText?: boolean;
        loader?: boolean;
    }>({
        open: false,
        deleteInput: '',
        validText: false,
        loader: false
    })
    const hideRevenueRowOnclick = (e: any) => {
        if (!hideRevenue) {
            let hideFilteredRows = [...failedData];
            hideFilteredRows = hideFilteredRows?.length > 0 ? hideFilteredRows?.filter((item) => item?.revenue !== "0.00") : [];
            setStateFailedData(hideFilteredRows)
        }
        else {
            setStateFailedData(failedData)
        }
        setHideRevenue(e);
    };

    const column: any = [
        {
            title: 'Placement Name',
            dataIndex: 'type',
            width: 240,
        },
        {
            dataIndex: 'site_name',
            title: 'Site Alias',
            width: 180,
            render: (text: string, row: any) => {
                let flag = false;
                if (flagList && flagList.hasOwnProperty(row?.id)) {
                    let data = flagList[row?.id]
                    if (data.site === 0) {
                        flag = true;
                    }
                }
                return (
                    <div className='w-[180px]'>
                        <RenderSelect
                            dataList={prebidSiteData}
                            disable={row?.status === 1 ? true : false}
                            setValue={(val: any) => handleSave(row, val, 'site')}
                            customClass={flag ? `customSelector2 border border-red-400 rounded-lg overflow-auto` : `customSelector2 border rounded-lg overflow-auto`}
                            loader={prebidSizeAndSizeLoader}
                            value={text}
                        />
                    </div>
                )

            },
        },
        {
            dataIndex: 'size_name',
            title: 'Size Alias',
            render: (text: string, row: any) => {
                let flag = false;
                if (flagList && row?.id in flagList) {
                    let data = flagList[row?.id]
                    if (data.size === 0) {
                        flag = true;
                    }
                }
                return (
                    <div className='w-[150px]'>
                        {/* <CommonDropDown
                            disable={row?.status === 1 ? true : false}
                            setValue={(val: any) => handleSave(row, val, 'size')}
                            customClass={flag ? `customSelector2 border border-red-400 rounded-lg overflow-auto` : `customSelector2 border rounded-lg overflow-auto`}
                            loader={prebidSizeAndSizeLoader}
                            dataList={prebidSizeData}
                            value={text}
                        /> */}
                        <RenderSelect
                            dataList={prebidSizeData}
                            disable={row?.status === 1 ? true : false}
                            setValue={(val: any) => handleSave(row, val, 'size')}
                            customClass={flag ? `customSelector2 border border-red-400 rounded-lg overflow-auto` : `customSelector2 border rounded-lg overflow-auto`}
                            loader={prebidSizeAndSizeLoader}
                            value={text}
                        />
                    </div>
                )
            },
            width: 150,
        },
        {
            dataIndex: 'network_id',
            title: 'Network ID',
        },
        {
            dataIndex: 'impressions',
            title: 'Impressions',
        },
        {
            dataIndex: 'revenue',
            title: 'Revenue',
            render: (text: any) => {
                return (
                    <span>${commaSeperator(parseFloat(text || 0).toFixed(2))}</span>
                )
            }
        },
        {
            dataIndex: 'clicks',
            title: 'Clicks',
        },
        {
            dataIndex: 'status',
            title: 'Status',
            render: (text: string, row?: PrebidFailedData) => <span className="flex">{row?.status === 1 ? 'Uploaded' : 'Pending'}</span>,
            sorter: (a: PrebidFailedData, b: PrebidFailedData) => String(a.network_id).localeCompare(String(b.network_id)),
        },
    ];

    const tops = [
        {
            title: 'Revenue',
            percentage: 0,
            isUp: 0,
            value: topCardData?.revenue && `$${commaSeperator(String(Number(topCardData?.revenue).toFixed(2)))}`,
            loading: prebidFailedDatalLoading,
            text: undefined,
            key: 'revenue',
            gam: 'ON'
        },
        {
            title: 'Impressions',
            percentage: 0,
            isUp: 0,
            value: topCardData?.impressions && `${commaSeperator(String(topCardData?.impressions))}`,
            loading: prebidFailedDatalLoading,
            text: undefined,
            key: 'revenue',
            gam: 'ON'
        },
        {
            title: 'Clicks',
            percentage: 0,
            isUp: 0,
            value: topCardData?.clicks && `${commaSeperator(String(topCardData?.clicks))}`,
            loading: prebidFailedDatalLoading,
            text: undefined,
            key: 'revenue',
            gam: 'ON'
        },
    ]

    useEffect(() => {
        if (selectValue) {
            dispatch(PrebidDashboardAction.fetchPrebidSiteAndSize({ id: selectValue.toString() }))
        }
    }, [dispatch, selectValue])

    useEffect(() => {
        if (prebidFailDataFlagList.constructor === Object && Object.keys(prebidFailDataFlagList).length > 0 && ifCsvUploaded) {
            setFlagList(prebidFailDataFlagList)
        }
        setIfCsvUploaded(false);
    }, [prebidFailDataFlagList])


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dateString);
    };

    const onChangeSelect = (value: string) => {
        setselectValue(value);
    };

    useMemo(() => {
        data?.sort((a: any, b: any) => {
            return String(a.network_name).localeCompare(String(b.network_name));
        });
    }, [data]);

    const onClickSubmit = () => {
        let payload = [...stateFailedData];
        //payload = payload?.length > 0 ? payload?.filter((item) => item?.isEdit === true) : [];
        payload = payload?.length > 0 ? payload : [];

        payload.forEach((key) => {
            if (key?.isEdit) {
                delete key.isEdit;
            }
        });


        setUploadLoading(true);
        Apis.prebidInsertData(payload)
            .then((res: any) => {
                if (selectValue !== '' && Date !== '') {
                    const payload = {
                        id: selectValue.toString(),
                        date: Date.toString(),
                    };
                    dispatch(PrebidDashboardAction.fetchPrebidFailedData(payload));
                }
                setFlagList(res?.data?.sites_sizes_status);
                dispatch(MessageActions.showMessage({ text: String(res.data.message), error: !res.data.status }));
            })
            .catch((err) => {
                dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                setFlagList(err?.sites_sizes_status);
            })
            .finally(() => {
                setUploadLoading(false);
            });
    };


    const onUploadCsv = (e: any) => {
        if (e.target.files[0] && Date !== "") {
            setCsvBtnLoader(true)

            let csvData = new FormData();
            csvData.append('csvfile', e.target.files[0]);
            csvData.append('date', Date.toString());
            csvData.append('network_id', selectValue)

            Apis.networkUploadCsv(csvData)
                .then(() => {
                    dispatch(MessageActions.showMessage({ text: 'File uploaded successfully', error: false }));
                })
                .catch((err) => {
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                })
                .finally(() => {
                    setCsvBtnLoader(false);
                    if (selectValue !== '' && Date !== '') {
                        const payload = {
                            id: selectValue.toString(),
                            date: Date.toString(),
                        };
                        dispatch(PrebidDashboardAction.fetchPrebidFailedData(payload));
                        setIfCsvUploaded(true);
                    }
                });
        }
    }

    const handleClick = (e: any) => {
        const { target = {} } = e || {};
        target.value = "";
    }

    useEffect(() => {
        setStateFailedData(failedData);
        if (failedDataTopCardsData) {
            setTopCardData({
                clicks: failedDataTopCardsData?.clicks,
                revenue: failedDataTopCardsData?.revenue,
                impressions: failedDataTopCardsData?.impressions
            })
        }
    }, [failedData, failedDataTopCardsData]);

    useEffect(() => {
        if (selectValue !== '' && Date !== '') {
            const payload = {
                id: selectValue.toString(),
                date: Date.toString(),
            };
            dispatch(PrebidDashboardAction.fetchPrebidFailedData(payload));
        }

    }, [Date, selectValue, dispatch]);

    useEffect(() => {
        dispatch(PrebidDashboardAction.fetchPrebid());
    }, [dispatch]);

    function handleSave(row: any, value: any, type: string) {
        const newData = [...stateFailedData];
        const index = newData.findIndex((item) => item?.id === row.id);
        newData[index].isEdit = true;
        if (type === 'site') {
            newData[index].site_name = value
        }
        else {
            newData[index].size_name = value
        }
        setStateFailedData(newData);
    }

    const insertNewRow = () => {
        if (Date && selectValue && newRowData?.clicks && newRowData?.impression && newRowData?.revenue && newRowData?.siteAlias && newRowData?.sizeAlias) {
            const payload = {
                "network_id": selectValue,
                "date": Date,
                "site_alias": newRowData?.siteAlias,
                "size_alias": newRowData?.sizeAlias,
                "impressions": newRowData?.impression,
                "revenue": newRowData?.revenue,
                "clicks": newRowData?.clicks
            }
            setInsertRowLoader(true)
            Apis.insertNewRowPrebidApi(payload)
                .then(() => {
                    setInsertRowLoader(false)
                    setNewRowData({ ...newRowData, open: false })
                    dispatch(MessageActions.showMessage({ text: `Row Inserted Successfully!`, error: false }));

                    const payloadFailData = {
                        id: selectValue.toString(),
                        date: Date.toString(),
                    };
                    dispatch(PrebidDashboardAction.fetchPrebidFailedData(payloadFailData));
                })
                .catch((err) => {
                    setInsertRowLoader(false)
                    setNewRowData({ ...newRowData, open: false })
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));

                })
        }
    }

    const DeleteRecords = () => {
        setDeleteRecords({ ...deleteRecords, validText: true })
        if (deleteRecords?.deleteInput === '' || deleteRecords?.deleteInput.trim() === '' || deleteRecords?.deleteInput !== 'Delete') {
            return;
        }
        setDeleteRecords({ ...deleteRecords, validText: false })
        const deletePayload = {
            "date": Date,
            "network_id": selectValue
        }
        setDeleteRecords({ ...deleteRecords, loader: true })
        Apis?.deletePrebidUploadRecords(deletePayload)
            .then(() => {
                setDeleteRecords({ ...deleteRecords, open: false, loader: false })
                dispatch(MessageActions.showMessage({ text: `Data Deleted Successfully!`, error: false }));
                const payloadFailData = {
                    id: selectValue.toString(),
                    date: Date.toString(),
                };
                dispatch(PrebidDashboardAction.fetchPrebidFailedData(payloadFailData));
            })
            .catch((err) => {
                setDeleteRecords({ ...deleteRecords, loader: false, open: false })
                dispatch(MessageActions.showMessage({ text: String(err), error: true }));
            })

    }

    return (
        <div className=" pb-4 w-full dashboard ">
            <div className="flex justify-between">
                <p className="w-[100%] roboto-medium leading-7 text-2xl">Ad Network Upload</p>
            </div>
            <div className="flex justify-between">
                <div className="flex justify-between items-center gap-5">
                    <div className='w-[200px]' id="selectNetwork">
                        <Select
                            placeholder="Select Network"
                            loading={loading}
                            onChange={onChangeSelect}
                            size="large"
                            optionFilterProp="children"
                            className="w-full"
                            showSearch
                            options={data.map((d) => {
                                return { value: d.id, label: d.network_name };
                            })}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        />
                    </div>

                    <div className='w-[200px]'>
                        <DatePicker className='w-[100%]' onChange={onChange} />
                    </div>

                    <div className=''>
                        <PButton title={'Bulk CSV Upload'}
                            onClick={() => {
                                if (selectValue !== '' && Date !== '') {
                                    fileInputRef.current.click()
                                    setValidateCsv(false);
                                } else {
                                    setValidateCsv(true);
                                }
                            }}
                            loading={csvBtnLoader} />
                        <input type='file' accept='.csv' hidden={true} ref={fileInputRef} onChange={onUploadCsv} onClick={handleClick} />
                        <div className='absolute'>
                            {validateCsv && (selectValue === '' || Date === '') && <span className="common_error ml-1">Please Select Date and Netwrok</span>}
                        </div>
                    </div>

                    <div >
                        <PButton className="m-4" title={'Pending Data Upload'} onClick={onClickSubmit} loading={uploadLoading} />
                    </div>

                    <div className="">
                        <PButton
                            title={'Run API'}
                            onClick={() => {
                                if (selectValue !== '' && Date !== '') {
                                    if (selectValue === '74') {
                                        window.open('https://localhost/HRE/app/crons/cron_revcontent.php?date=' + Date, '');
                                    }
                                    if (selectValue === '201') {
                                        window.open('https://localhost/HRE/app/crons/cron_connatix.php?date=' + Date, '');
                                    }
                                    if (selectValue === '233') {
                                        window.open('https://localhost/HRE/app/crons/cron_topple.php', '');
                                    }
                                    if (selectValue === '137') {
                                        window.open('https://localhost/HRE/app/crons/cron_triplelift.php', '');
                                    }
                                    if (selectValue === '219') {
                                        window.open('https://localhost/HRE/app/crons/cron_triplelift_tam.php', '');
                                    }
                                    setRunApi(false);
                                } else {
                                    setRunApi(true);
                                }
                            }}
                        />
                        <div className="absolute">{runApi && (selectValue === '' || Date === '') && <span className="common_error ml-1">Please Select Date and Netwrok</span>}</div>
                    </div>
                </div>
                <div className='relative top-[-9px]'>
                    <ComparisonSwitch title="Hide zero revenue" compaison={hideRevenue} onChange={hideRevenueRowOnclick} />
                </div>
            </div>


            {/* adding top cards */}
            <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {tops.map((t, index) => (
                        t?.gam === "ON" && <PCard
                            className="px-4 py-3 pb-2 w-full cursor-pointer topCard rounded-lg flex flex-col justify-between"
                            key={`${index}_${t.title}`}
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-xs roboto-medium color-056433 title">{t.title}</p>
                            </div>
                            <div className="my-4 mb-3">
                                {!t.loading && <p className="roboto-medium font-semibold text-2xl value">{t.value || 0}</p>}
                                {t.loading && (
                                    <div className="flex justify-center items-center">
                                        <Spin />
                                    </div>
                                )}
                            </div>
                        </PCard>
                    ))}
                </div>
            </div>


            <div className="">
                <div id="table">
                    <div className='table-row-dark relative'>
                        {
                            (selectValue !== '' && Date !== '') &&
                            <div className="w-[100%] absolute -top-[80px] flex flex-row-reverse">
                                <div className='flex gap-2'>
                                    <PButton title={'Add New Row'}
                                        onClick={() => {
                                            setNewRowData({ ...newRowData, open: true });
                                        }}
                                    />
                                    <PButton title={'Delete All Rows'}
                                        onClick={() => {
                                            setDeleteRecords({ ...deleteRecords, open: true });
                                        }}
                                    />
                                </div>
                            </div>
                        }

                        <Table
                            pagination={{ position: ['bottomRight'], style: { marginRight: '15px' }, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`, showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }}
                            loading={prebidFailedDatalLoading}
                            bordered
                            dataSource={stateFailedData}
                            columns={column}
                        />
                    </div>
                </div>
            </div>

            <div>
                <PModal
                    title={'Add New Row'}
                    open={newRowData?.open}
                    setOpen={(e) => setNewRowData({ ...newRowData, open: e })}
                    width="430px"
                    bodyStyle={{ overflowY: 'scroll' }}
                    className="noscrollbar"
                    footer={
                        <div className="flex gap-3 justify-center pb-5 items-center w-full ">
                            <div className="border rounded-3xl border-green-800">
                                <RoundButton light={true} title="Cancel" className={'w-[120px] text-[14px]'} onClick={() => setNewRowData({ ...newRowData, open: false })} />
                            </div>
                            <div>
                                <RoundButton
                                    title="Ok"
                                    className="w-[120px]"
                                    onClick={() => insertNewRow()}
                                    loading={insertRowLoader}
                                />
                            </div>
                        </div>
                    }
                >
                    <div>
                        <div className='flex justify-between'>
                            <div className='w-[190px]'>
                                <CommonDropDown
                                    title={'Enter Site Alias'}
                                    dataList={prebidSiteData}
                                    setValue={(val: any) => setNewRowData({ ...newRowData, siteAlias: val })}
                                    loader={prebidSizeAndSizeLoader}
                                    value={newRowData?.siteAlias}
                                />
                            </div>

                            <div className='w-[190px]'>
                                <CommonDropDown
                                    title={'Enter Size Alias'}
                                    dataList={prebidSizeData}
                                    setValue={(val: any) => setNewRowData({ ...newRowData, sizeAlias: val })}
                                    loader={prebidSizeAndSizeLoader}
                                    value={newRowData?.sizeAlias}
                                />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[190px]'>
                                <PNormalInput
                                    title={'Network ID'}
                                    value={selectValue}
                                    name={'network_id'}
                                    disabled={true}
                                    onChange={() => { }}
                                />
                            </div>

                            <div className='w-[190px]'>
                                <PNormalInput
                                    title={'Impressions'}
                                    value={newRowData?.impression}
                                    name={'impressions'}
                                    onChange={(e) => setNewRowData({ ...newRowData, impression: e.value })}
                                />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[190px]'>
                                <PNormalInput
                                    title={'Revenue'}
                                    value={newRowData?.revenue}
                                    name={'revenue'}
                                    onChange={(e) => setNewRowData({ ...newRowData, revenue: e.value })}
                                />
                            </div>

                            <div className='w-[190px]'>
                                <PNormalInput
                                    title={'Clicks'}
                                    value={newRowData?.clicks}
                                    name={'clicks'}
                                    onChange={(e) => setNewRowData({ ...newRowData, clicks: e.value })}
                                />
                            </div>
                        </div>
                    </div>
                </PModal>
            </div>

            {/* delete records modal */}
            <div>
                <PModal
                    title={'Delete Records'}
                    open={deleteRecords?.open}
                    setOpen={(e) => setDeleteRecords({ ...deleteRecords, open: e })}
                    width="380px"
                    bodyStyle={{ overflowY: 'scroll' }}
                    className="noscrollbar"
                    footer={
                        <div className="flex gap-3 justify-center pb-5 items-center w-full ">
                            <div className="border rounded-3xl border-green-800">
                                <RoundButton light={true} title="Cancel" className={'w-[120px] text-[14px]'} onClick={() => setDeleteRecords({ ...deleteRecords, open: false })} />
                            </div>
                            <div>
                                <RoundButton
                                    title="Delete"
                                    className="w-[120px]"
                                    onClick={() => DeleteRecords()}
                                    loading={deleteRecords?.loader}
                                />
                            </div>
                        </div>
                    }
                >
                    <div>
                        <div className='font-[Montserrat] text-[14px] text-center'>Enter <span className='text-[red]'>'Delete'</span> to delete the records.</div>
                        <div className='w-full flex justify-center'>
                            <div className='w-[190px] mt-2 '>
                                <PNormalInput
                                    title={''}
                                    placeholder='Enter the text.'
                                    value={deleteRecords?.deleteInput}
                                    name={'revenue'}
                                    onChange={(e) => setDeleteRecords({ ...deleteRecords, deleteInput: e.value })}
                                />
                                {deleteRecords?.validText && deleteRecords?.deleteInput !== 'Delete' && (deleteRecords?.deleteInput === '' || deleteRecords?.deleteInput.trim() !== '') && <span className="common_error ml-1 text-center">Enter Valid Text!</span>}

                            </div>
                        </div>
                    </div>
                </PModal>
            </div>
        </div>
    );
};

export default PreBidUpload;