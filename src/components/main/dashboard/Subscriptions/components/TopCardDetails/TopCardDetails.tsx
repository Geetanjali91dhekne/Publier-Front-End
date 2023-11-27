import React, { useEffect, useMemo, useState } from 'react';
import PTable from '../../../../../common/Table';
import { commaSeperator } from '../../../../../../utils/Validation';
import { DateTable, FavoriteOrRecent } from '../../../AdOptimization/redux/types';
import { GoPrimitiveDot } from 'react-icons/go';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Select } from 'antd';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import { BiArrowBack } from 'react-icons/bi';
import ModalLogs from './ModalLogs';
import ModalName from './ModalName';
import SelectPublisherDropDown from '../dashboard/SelectPublisherDropDown';
import { useDispatch, useSelector } from 'react-redux';
import SubsDashboardAction from '../../redux/actions';
import { RootState } from '../../../../../../store/RootReducer';
import moment from 'moment';

type Props = {
    startDate: any;
    endDate: any;
};
const TopCardDetails = ({ startDate, endDate }: Props) => {
    const [selectType, setSelectType] = useState<string | undefined>('active');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [modalKeys, setModalKeys] = useState<FavoriteOrRecent | undefined>(undefined);
    const [logModalKeys, setLogModalKeys] = useState<FavoriteOrRecent | undefined>(undefined);
    const [client, setClient] = useState<string | undefined>(undefined);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const subscriberData = useSelector((state: RootState) => state.subsDashboard.subscriberTable);
    const subscriberLoading = useSelector((state: RootState) => state.subsDashboard.subscriberTableLoader);
    const subscriberList = useSelector((state: RootState) => state.subsDashboard.subscribersList);
    const subscriberListLoader = useSelector((state: RootState) => state.subsDashboard.subscribersListLoader);
    const siteId = searchParams.get('id');
    let data1 = useMemo(() => {
        setSearched(false);
        let data: any = [];
        if (selectType === 'all' && subscriberData) {
            setClient(undefined);
            return subscriberData;
        } else if (subscriberData && selectType === 'active') {
            setClient(undefined);
            subscriberData.forEach((d: any) => {
                if (d.status === 1) {
                    data.push(d);
                }
            });
        } else {
            setClient(undefined);
            if (subscriberData) {
                subscriberData.forEach((d: any) => {
                    if (d.status === 0) {
                        data.push(d);
                    }
                });
            }
        }
        return data;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectType, subscriberData]);

    const data2 = useMemo(() => {
        let searchingData: any = [];
        // if (client) {
        //     setSelectType(' ');
        //     setSearched(true);
        //     subscriberData.forEach((d: any) => {
        //         if (Number(d.id) === Number(client)) {
        //             searchingData.push(d);
        //         }
        //     })
        // }
        return searchingData?.length > 0 ? searchingData : [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client]);

    let filterData = searched ? data2 : data1;

    useEffect(() => {
        dispatch(SubsDashboardAction.fetchSubscriberList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            SubsDashboardAction.fetchSubscriptionSubscriber({
                start_date: startDate,
                end_date: endDate,
                site_id: siteId,
            }),
        );
    }, [startDate, endDate, siteId, dispatch]);
    const onClickBack = () => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.subscriptions}`);
    };

    const columns = [
        {
            dataIndex: 'site_name',
            title: 'Site',
            width: 250,
            fixed: 'left',
            render: (text: any, row: FavoriteOrRecent, index: number) => {
                return <div className="flex items-center justify-start">{text}</div>;
            },
            sorter: (a: any, b: any) => String(a.site_name).localeCompare(String(b.site_name)),
        },
        {
            dataIndex: 'name',
            title: 'Name',
            render: (text: any, row: FavoriteOrRecent) => (
                <div
                    className="flex items-center justify-start gap-2 text-green-600 underline"
                    onClick={() => {
                        setOpen(true);
                        setModalKeys(row);
                    }}
                >
                    <span>{row?.status === 0 ? <GoPrimitiveDot size={24} color="red" /> : <GoPrimitiveDot size={24} color="green" />}</span>
                    <span>{String(text || ' ')}</span>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.name).localeCompare(String(b.name)),
        },
        {
            dataIndex: 'date',
            title: 'Signed Up',
            width: 250,
            render: (text: any, row: FavoriteOrRecent) => (
                <div className="flex items-center justify-center gap-2">
                    <span>{text}</span>
                </div>
            ),
            sorter: (a: DateTable, b: DateTable) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            dataIndex: 'amount',
            title: 'Amount',
            width: 150,
            render: (text: any, row: FavoriteOrRecent) => {
                return (
                    <div className="flex items-center justify-end gap-2">
                        <span>{`$${parseFloat(commaSeperator(text)).toFixed(2)}`}</span>
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseFloat(a.amount) - parseFloat(b.amount),
        },
        {
            dataIndex: 'plan_type',
            title: 'Plan Type',
            width: 150,
            render: (text: any, row: FavoriteOrRecent) => (
                <div className="flex items-center justify-center gap-2">
                    <span>{text}</span>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.plan_type).localeCompare(String(b.plan_type)),
        },
        {
            dataIndex: '',
            title: 'Logs',
            width: 100,
            render: (text: any, row: FavoriteOrRecent) => (
                <div
                    className="flex items-center justify-center gap-2 text-green-600 underline "
                    onClick={() => {
                        setOpen2(true);
                        setLogModalKeys(row);
                    }}
                >
                    <span>{'Logs'}</span>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="relative flex justify-between items-center pb-14">
                <div className="flex items-center mt-4">
                    <div onClick={onClickBack} className="bg-[#B4D0C133] cursor-pointer h-10 flex items-center px-4 rounded-lg mr-2 mt-1">
                        <BiArrowBack className="mr-2" />
                        <span>Back</span>
                    </div>

                    <div className="w-[300px]">
                        <Select
                            loading={subscriberListLoader}
                            size="large"
                            placeholder="Search for Subscribers"
                            value={subscriberList.find((d: any) => String(d.id) === client)?.site_name}
                            optionFilterProp="children"
                            onChange={(e) => {
                                setClient(e);
                            }}
                            className="w-full"
                            showSearch
                            options={subscriberList.map((d: any) => {
                                return { value: d.id, label: d.name };
                            })}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-10">
                    <SelectPublisherDropDown selectType={selectType} setSelectType={setSelectType} title="Subscription Status" />
                </div>
            </div>

            <PTable className="dashboard_table" columns={columns} data={filterData} loading={subscriberLoading} pagination={{ isShow: true }} rowKey={(d: FavoriteOrRecent) => `${Math.random()}`} />
            <ModalLogs open2={open2} setOpen2={setOpen2} logModalData={logModalKeys} />
            <ModalName open={open} setOpen={setOpen} modalData={modalKeys} />
        </div>
    );
};

export default TopCardDetails;
