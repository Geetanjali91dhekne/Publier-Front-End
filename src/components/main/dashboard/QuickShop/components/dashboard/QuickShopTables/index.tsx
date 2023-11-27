import download from 'downloadjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Apis from '../../../../../../../api';
import { RootState } from '../../../../../../../store/RootReducer';
import { commaSeperator } from '../../../../../../../utils/Validation';
import PButton from '../../../../../../common/Button';
import DeltaBox from '../../../../../../common/DeltaBox';
import PTable from '../../../../../../common/Table';
import MessageActions from '../../../../../../message/redux/actions';
import QuickShopDashboardActions from '../../../redux/actions';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    compare?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    siteId: any;
};

const QuickShopTable: React.FC<Props> = ({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, siteId }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const data = useSelector((state: RootState) => state.quickShopDashboard.quickShopTopItemsTable);
    const loader = useSelector((state: RootState) => state.quickShopDashboard.quickShopTopItemsTableLoader);
    useEffect(() => {
        if (startDate && endDate) {
            dispatch(
                QuickShopDashboardActions.fetchQuickShopTopItemsTable({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
    }, [dispatch, startDate, endDate, revenueType, siteId]);

    const TopItemsExport = () => {
        if (startDate && endDate) {
            const data = {
                start_date: startDate,
                end_date: endDate,
                revenue: revenueType,
                table_type: 'topitems',
            };
            setLoading(true);

            Apis.fetchQuickShopExportTopItemsTableApi(data)
                .then(({ data }) => {
                    download(data, `${moment().format('YYYY/MM/DD')}_topitems.xlsx`);
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
            dataIndex: 'site_url',
            title: 'Item',
            fixed: 'left',
            sorter: (a: any, b: any) => String(a.site_url).localeCompare(String(b.site_url)),
        },
        {
            dataIndex: 'sum_revenue',
            title: 'Earnings',
            fixed: 'right',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(parseFloat(String(text)).toFixed(2))}</span>
                    {compare ? <DeltaBox row={0} /> : null}
                </div>
            ),
            sorter: (a: any, b: any) => parseInt(a.sum_revenue) - parseInt(b.sum_revenue),
        },
        {
            dataIndex: 'sum_page_view',
            title: 'Page Views',
            fixed: 'right',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(String(text || 0))}</span>
                    {compare ? <DeltaBox row={0} /> : null}
                </div>
            ),
            sorter: (a: any, b: any) => parseInt(a.sum_page_views) - parseInt(b.sum_page_views),
        },
        {
            dataIndex: 'sum_items_sold',
            title: 'Items Sold',
            fixed: 'right',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(String(text || 0))}</span>
                    {compare ? <DeltaBox row={0} /> : null}
                </div>
            ),
            sorter: (a: any, b: any) => parseInt(a.sum_items_sold) - parseInt(b.sum_items_sold),
        },
        {
            dataIndex: 'total_converstion_ratio',
            title: 'Conversion Ratio',
            fixed: 'right',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(String(text || 0))}</span>
                    {compare ? <DeltaBox row={0} /> : null}
                </div>
            ),
            sorter: (a: any, b: any) => parseFloat(a.conversion_ratio) - parseFloat(b.conversion_ratio),
        },
    ];
    return (
        <>
            <div className="w-[100%] pl-4 flex justify-between items-center">
                <div className="text-[22px] font-bold  mt-4">Top Items</div>
                <PButton loading={loading} className="top-2" title={'Export'} onClick={TopItemsExport} />
            </div>
            <div className="mt-4">
                <PTable columns={columns} className="dashboard_table" data={data || []} loading={loader} pagination={{ isShow: true }} />
            </div>
        </>
    );
};

export default QuickShopTable;
