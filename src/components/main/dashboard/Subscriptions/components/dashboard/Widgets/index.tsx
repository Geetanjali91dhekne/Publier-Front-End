import download from 'downloadjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Apis from '../../../../../../../api';
import { RootState } from '../../../../../../../store/RootReducer';
import { commaSeperator } from '../../../../../../../utils/Validation';
import PButton from '../../../../../../common/Button';
import PTable from '../../../../../../common/Table';
import PTabs from '../../../../../../common/Tabs';
import MessageActions from '../../../../../../message/redux/actions';
import { DateTable } from '../../../../AdOptimization/redux/types';
import SubsDashboardAction from '../../../redux/actions';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    siteId?: any;
};

const WidgetSubscriptions: React.FC<Props> = ({ startDate, endDate, revenueType, siteId }) => {
    const dispatch = useDispatch();
    const [btnloading, setLoading] = useState(false);
    const widgetTable = useSelector((state: RootState) => state.subsDashboard.subscriptionWidgetTableOne);
    const widgetTableLoading = useSelector((state: RootState) => state.subsDashboard.subscriptionWidgetTableOneLoader);

    useEffect(() => {
        if (startDate && endDate && revenueType) {
            dispatch(
                SubsDashboardAction.fetchSubscriptionWidget1Table({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
    }, [dispatch, startDate, endDate, siteId, revenueType]);

    const widgetExport = () => {
        if (startDate && endDate && revenueType && siteId) {
            const data = {
                start_date: startDate,
                end_date: endDate,
                revenue: revenueType,
                table_type: 'widget1',
                site_id: siteId,
            };
            setLoading(true);

            Apis.fetchSubscriptionExportWidgetTableApi(data)
                .then(({ data }) => {
                    download(data, `${moment().format('YYYY/MM/DD')}_widget.xlsx`);
                })
                .catch((err) => {
                    dispatch(MessageActions.showMessage({ text: String('Something went wrong'), error: true }));
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const columns = [
        {
            dataIndex: 'date',
            title: 'Date',
            fixed: 'left',
            width: 150,
            render: (text?: any) => {
                return (
                    <div className="flex items-center">
                        <span>{text}</span>
                    </div>
                );
            },
            sorter: (a: DateTable, b: DateTable) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            dataIndex: 'total_impressions',
            title: 'Impressions',
            fixed: 'right',
            width: 200,
            render: (text?: any) => {
                return (
                    <div className="flex justify-end items-center">
                        <span>{commaSeperator(text)}</span>
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseInt(a.total_impressions) - parseInt(b.total_impressions),
        },
        {
            dataIndex: 'total_clicks',
            title: 'Clicks',
            fixed: 'right',
            width: 200,
            render: (text?: any) => {
                return (
                    <div className="flex justify-end items-center">
                        <span>{commaSeperator(text)}</span>
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseInt(a.total_clicks) - parseInt(b.total_clicks),
        },
        {
            dataIndex: 'subscriptions',
            title: 'New Subscriptions',
            fixed: 'right',
            width: 200,
            render: (text?: any) => {
                return (
                    <div className="flex justify-end items-center">
                        <span>{commaSeperator(text)}</span>
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseInt(a.subscriptions) - parseInt(b.subscriptions),
        },
        {
            dataIndex: 'converstions_ratio',
            title: 'Conversion Ratio',
            fixed: 'right',
            width: 200,
            render: (text?: any) => {
                return (
                    <div className="flex justify-end items-center">
                        <span>{commaSeperator(text)}</span>
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseFloat(a.converstions_ratio) - parseFloat(b.converstions_ratio),
        },
    ];
    return (
        <div className="">
            <div className="w-[100%] relative flex flex-row-reverse">
                <PButton loading={btnloading} className="top-2" title={'Export'} onClick={widgetExport} />
            </div>

            <PTabs activeTab={''} setActiveTab={() => {}} tabs={[]} />
            <div className="mt-8">
                <PTable columns={columns} className="dashboard_table" pagination={{ isShow: true }} data={widgetTable} loading={widgetTableLoading} />
            </div>
        </div>
    );
};

export default WidgetSubscriptions;
