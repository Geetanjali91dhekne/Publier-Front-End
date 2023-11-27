import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { GrClose } from 'react-icons/gr';
import { GoPrimitiveDot } from 'react-icons/go';
import { DateTable, FavoriteOrRecent } from '../../../AdOptimization/redux/types';
import PTable from '../../../../../common/Table';
import { useDispatch, useSelector } from 'react-redux';
import SubsDashboardAction from '../../redux/actions';
import { RootState } from '../../../../../../store/RootReducer';
import moment from 'moment';

type Props = {
    open2: boolean;
    setOpen2: (f: boolean) => void;
    logModalData: FavoriteOrRecent | undefined;
};

const ModalLogs: React.FC<Props> = ({ open2, setOpen2, logModalData }) => {
    const dispatch = useDispatch();
    const logstats = useSelector((state: RootState) => state.subsDashboard.subscriptionLogTable);
    const logstatsLoader = useSelector((state: RootState) => state.subsDashboard.subscriptionLogTableLoader);
    const [data, setData] = useState<{
        id?: any;
        siteId?: any;
        name?: string;
        siteName?: string;
    }>({
        id: undefined,
        siteId: undefined,
        name: undefined,
        siteName: undefined,
    });

    useEffect(() => {
        if (logModalData) {
            setData({
                id: logModalData.id,
                siteId: logModalData.site_id,
                name: logModalData.name,
                siteName: logModalData.site_name,
            });
        }
    }, [logModalData]);

    useEffect(() => {
        if (data.id && data.siteId) {
            dispatch(
                SubsDashboardAction.fetchSubscriptionLogTable({
                    site_id: `${data.siteId}`,
                    id: `${data?.id}`,
                }),
            );
        }
    }, [data, dispatch]);

    const Logscolumns = [
        {
            dataIndex: 'date',
            title: 'Date',
            width: 200,
            fixed: 'left',
            render: (text: any, row: FavoriteOrRecent, index: number) => {
                return <div className="flex items-center ">{text}</div>;
            },
            sorter: (a: DateTable, b: DateTable) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            dataIndex: 'ip',
            title: 'Ip Address',
            width: 300,
            render: (text: any, row: FavoriteOrRecent) => (
                <div className="flex items-center justify-start gap-2">
                    <span>
                        <GoPrimitiveDot size={24} color="green" />
                    </span>
                    <span>{text}</span>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.ip).localeCompare(String(b.ip)),
        },
        {
            dataIndex: 'location',
            title: 'Location',
            width: 200,
            render: (text: any, row: FavoriteOrRecent) => (
                <div className="flex items-center  gap-2">
                    <span>{text}</span>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.location).localeCompare(String(b.location)),
        },
        {
            dataIndex: 'device',
            title: 'Device',
            width: 150,
            render: (text: any, row: FavoriteOrRecent) => {
                return (
                    <div className="flex items-center  gap-2">
                        <span>{text}</span>
                    </div>
                );
            },
            sorter: (a: any, b: any) => String(a.device).localeCompare(String(b.device)),
        },
        {
            dataIndex: 'browser-os',
            title: 'OS/Browser',
            width: 200,
            render: (text: any, row: FavoriteOrRecent) => (
                <div className="flex items-center  gap-2">
                    <span>{text}</span>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.browser).localeCompare(String(b.browser)),
        },
        {
            dataIndex: 'status',
            title: 'Status',
            width: 200,
            render: (text: any, row: FavoriteOrRecent) => (
                <div className={'flex items-center gap-2 '}>
                    <span>{text}</span>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.status).localeCompare(String(b.status)),
        },
    ];
    return (
        <div>
            <Drawer placement={'right'} width={1300} onClose={() => setOpen2(false)} open={open2} closeIcon={null} closable={false} size="large">
                <div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex justify-between items-center gap-2">
                                <GoPrimitiveDot size={24} className="text-green-700" />
                                <div>
                                    <h1 className="text-2xl font-bold">{logModalData?.name}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-5">
                            <GrClose size={20} className="font-bold cursor-pointer" onClick={() => setOpen2(false)} />
                        </div>
                    </div>
                    <div className="mt-1 ml-10">
                        <span>{logModalData?.site_name} | Logs</span>
                    </div>
                </div>

                <div className="container mt-5">
                    <PTable columns={Logscolumns} className="dashboard_table" data={logstats} loading={logstatsLoader} rowKey={(d: FavoriteOrRecent) => `${Math.random()}`} pagination={{ isShow: true }} />
                </div>
            </Drawer>
        </div>
    );
};

export default ModalLogs;
