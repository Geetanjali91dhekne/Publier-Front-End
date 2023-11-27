import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/RootReducer';
import PTable from '../../../../../common/Table';
import PTabs from '../../../../../common/Tabs';
import AdOptDashboardAction from '../../redux/actions';
import { commaSeperator } from '../../../../../../utils/Validation';
import { DateTable } from '../../redux/types';
import moment from 'moment';
import PButton from '../../../../../common/Button';
import Apis from '../../../../../../api';
import download from 'downloadjs';
import MessageActions from '../../../../../message/redux/actions';

type Props = {
    startDate?: string;
    endDate?: string;
    revenueType?: string;
    compare?: boolean;
    compare_start_date?: string;
    compare_end_date?: string;
    siteId?: string;
    ad_server?: string;
};

const CatogoryTableDashboard: React.FC<Props> = ({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, siteId, ad_server }) => {
    const [activeTab, setActiveTab] = useState('Date');
    const dispatch = useDispatch();

    const date = useSelector((state: RootState) => state?.adOptDashboard?.dateTable);
    const dateLoading = useSelector((state: RootState) => state?.adOptDashboard?.dateTableLoading);

    const network = useSelector((state: RootState) => state?.adOptDashboard?.networkTable);
    const networkLoading = useSelector((state: RootState) => state.adOptDashboard?.networkTableLoading);

    const size = useSelector((state: RootState) => state.adOptDashboard.sizeTable);
    const sizeLoading = useSelector((state: RootState) => state.adOptDashboard.sizeTableLoading);

    const data = activeTab === 'Date' ? date : activeTab === 'Network' ? network : size;
    const loading = activeTab === 'Date' ? dateLoading : activeTab === 'Network' ? networkLoading : sizeLoading;

    const [fileLoading, setLoading] = useState(false);
    const onTabChange = (data: string) => {
        setActiveTab(data);
    };

    useEffect(() => {
        if (startDate && endDate && siteId) {
            dispatch(
                AdOptDashboardAction.fetchDateTableBySite(
                    {
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                    siteId,
                ),
            );

            dispatch(
                AdOptDashboardAction.fetchNetworkTableBySite(
                    {
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                    siteId,
                ),
            );

            dispatch(
                AdOptDashboardAction.fetchSizeTableBySite(
                    {
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        ad_server: ad_server,
                    },
                    siteId,
                ),
            );
        }
    }, [dispatch, startDate, endDate, revenueType, compare_start_date, compare_end_date, siteId, compare, ad_server]);

    let columns: {
        dataIndex: string;
        title: string;
        fixed?: 'left' | 'right';
        width: number;
        render: (text: any, row: any) => void;
        sorter?: (a: any, b: any) => void;
    }[] = [];
    if (activeTab === 'Date') {
        columns = [
            {
                dataIndex: 'date',
                title: 'Date',
                fixed: 'left',
                width: 150,
                render: (text: string, row: DateTable) => <span>{text}</span>,
                sorter: (a: DateTable, b: DateTable) => moment(a.date).unix() - moment(b.date).unix(),
            },
            {
                dataIndex: 'sum_ad_request',
                title: 'Ad Requests',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseInt(a.sum_ad_request) - parseInt(b.sum_ad_request),
            },
            {
                dataIndex: 'sum_impressions',
                title: 'Monetized Impression',
                width: 200,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(text)}` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseInt(a.sum_impressions) - parseInt(b.sum_impressions),
            },
            {
                dataIndex: 'sum_revenue',
                title: 'Revenue ($)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_revenue) - parseFloat(b.sum_revenue),
            },
            {
                dataIndex: 'sum_cpms',
                title: 'CPM ($)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_cpms) - parseFloat(b.sum_cpms),
            },
            {
                dataIndex: 'sum_fillrate',
                title: 'Fill Rate (%)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(parseFloat(text).toFixed(2))}%` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_fillrate) - parseFloat(b.sum_fillrate),
            },
            {
                dataIndex: 'pageview',
                title: 'Page Views',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(String(text))}` : text}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseInt(a.pageview) - parseInt(b.pageview),
            },
            {
                dataIndex: 'sum_rpm',
                title: 'RPM ($)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : `$${text}`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_rpm) - parseFloat(b.sum_rpm),
            },
        ];
    }

    if (activeTab === 'Network') {
        columns = [
            {
                dataIndex: 'network_name',
                title: 'Network Name',
                fixed: 'left',
                width: 200,
                render: (text: string) => <span className="underline">{text}</span>,
                sorter: (a: DateTable, b: DateTable) => String(a.network_name).localeCompare(String(b.network_name)),
            },
            {
                dataIndex: 'sum_ad_request',
                title: 'Ad Requests',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseInt(a.sum_ad_request) - parseInt(b.sum_ad_request),
            },
            {
                dataIndex: 'sum_impressions',
                title: 'Monetized Impression',
                width: 200,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(text)}` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseInt(a.sum_impressions) - parseInt(b.sum_impressions),
            },
            {
                dataIndex: 'sum_revenue',
                title: 'Revenue ($)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_revenue) - parseFloat(b.sum_revenue),
            },
            {
                dataIndex: 'sum_cpms',
                title: 'CPM ($)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : `$${text}`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_cpms) - parseFloat(b.sum_cpms),
            },
            {
                dataIndex: 'sum_fillrate',
                title: 'Fill Rate (%)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(parseFloat(text).toFixed(2))}%` : `${text}%`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_fillrate) - parseFloat(b.sum_fillrate),
            },

        ];
    }

    if (activeTab === 'Sizes') {
        columns = [
            {
                dataIndex: 'dimensions',
                title: 'Sizes',
                fixed: 'left',
                width: 200,
                render: (text: string) => <span className="underline">{text}</span>,
                sorter: (a: DateTable, b: DateTable) => String(a.dimensions).localeCompare(String(b.dimensions)),
            },
            {
                dataIndex: 'sum_ad_request',
                title: 'Ad Requests',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseInt(a.sum_ad_request) - parseInt(b.sum_ad_request),
            },
            {
                dataIndex: 'sum_impressions',
                title: 'Monetized Impression',
                width: 200,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(text)}` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseInt(a.sum_impressions) - parseInt(b.sum_impressions),
            },
            {
                dataIndex: 'sum_revenue',
                title: 'Revenue ($)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : ''}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_revenue) - parseFloat(b.sum_revenue),
            },
            {
                dataIndex: 'sum_cpms',
                title: 'CPM ($)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : `$${text}`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_cpms) - parseFloat(b.sum_cpms),
            },
            {
                dataIndex: 'sum_fillrate',
                title: 'Fill Rate (%)',
                width: 150,
                render: (text?: string) => (
                    <div className="flex justify-end">
                        <span>{text ? `${commaSeperator(parseFloat(text).toFixed(2))}%` : `${text}%`}</span>
                    </div>
                ),
                sorter: (a: DateTable, b: DateTable) => parseFloat(a.sum_fillrate) - parseFloat(b.sum_fillrate),
            },

        ];
    }

    const handleExport = () => {
        if (startDate && endDate && siteId) {
            const data = {
                start_date: `${startDate}`,
                end_date: `${endDate}`,
                revenue: `${revenueType}`,
                table_type: activeTab === 'Date' ? 'date' : activeTab === 'Network' ? 'network' : 'size',
                ad_server: false,
            };
            setLoading(true);

            Apis.fetchExportTable(data, siteId)
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

    const filterColumns:any = columns?.filter((item:any)=>{
        if(ad_server === 'OFF'){
            if(item?.dataIndex === 'sum_ad_request' || item?.dataIndex ==='sum_fillrate'){
                return null;
            }
            return item;
        }
        return item;
    })
    return (
        <div className="mt-8">
            <div className="w-[100%] relative flex flex-row-reverse">
                <PButton loading={fileLoading} className="top-12" title={'Export'} onClick={handleExport} />
            </div>

            <PTabs
                activeTab={activeTab}
                setActiveTab={onTabChange}
                tabs={[
                    { key: 'Date', title: 'Date' },
                    { key: 'Network', title: 'Network' },
                    { key: 'Sizes', title: 'Sizes' },
                ]}
            />
            <div className="mt-8">
                <PTable columns={filterColumns} className="dashboard_table" data={data} loading={loading} />
            </div>
        </div>
    );
};

export default CatogoryTableDashboard;
