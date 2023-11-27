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
import AdBlockDashboardActions from '../../../redux/actions';

type Props = {
    startDate: any;
    endDate: any;
    siteId: any;
    widgetId:string|null;
};

const WidgetAdBlock: React.FC<Props> = ({ startDate, endDate, siteId,widgetId }) => {
    const dispatch = useDispatch();
    const [btnloading, setLoading] = useState(false);
    const data = useSelector((state: RootState) => state.adBlockDashboard.adBlockWidgetTable);
    const loader = useSelector((state: RootState) => state.adBlockDashboard.adBlockWidgetTableLoader);
    useEffect(() => {
        dispatch(
            AdBlockDashboardActions.fetchAdBlockWidgetTable({
                start_date: startDate,
                end_date: endDate,
                site_id: siteId,
                widget_id:widgetId,
            }),
        );
    }, [dispatch, startDate, endDate, siteId,widgetId]);

    const widgetExport = () => {
        if (startDate && endDate && siteId) {
            const data = {
                start_date: startDate,
                end_date: endDate,
                table_type: 'widget1',
                site_id: siteId,
            };
            setLoading(true);

            Apis.fetchAdBlockExportWidgetTableApi(data)
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
            sorter: (a: DateTable, b: DateTable) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            dataIndex: 'abpvs',
            title: 'Adblock Page Views',
            fixed: 'right',
            width: 200,
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <>
                        <span>{text ? commaSeperator(String(text)) : text}</span>
                    </>
                </div>
            ),
            sorter: (a: any, b: any) => parseInt(a.abpvs) - parseInt(b.abpvs),
        },
        // {
        //   dataIndex: 'pageViews',
        //   title: 'Whitelisted Times',
        //   fixed: 'right',
        //   width: 200,
        //   render: (text: any, row: any) => (
        //     <div className="flex items-center justify-end gap-2">
        //       <>
        //         <span>{commaSeperator(row.pageViews)}K</span>
        //       </>
        //     </div>
        //   ),
        // },
        // {
        //   dataIndex: 'fundraiserViews',
        //   title: 'Conversion Ratio',
        //   fixed: 'right',
        //   width: 200,
        //   render: (text: any, row: any) => (
        //     <div className="flex items-center justify-end gap-2">
        //       <>
        //         <span>{commaSeperator(row.fundraiserViews)}</span>
        //       </>
        //     </div>
        //   ),
        // },
    ];
    return (
        <div className="">
            <div className="w-[100%] relative flex flex-row-reverse">
                <PButton loading={btnloading} className="top-2" title={'Export'} onClick={widgetExport} />
            </div>

            <PTabs activeTab={''} setActiveTab={() => {}} tabs={[]} />
            <div className="mt-4">
                <PTable columns={columns} className="dashboard_table" pagination={{ isShow: true }} data={data || []} loading={loader} />
            </div>
        </div>
    );
};

export default WidgetAdBlock;

// const data = [
//   {
//     key: 1,
//     date: '21 Jan',
//     earnings: '12,154',
//     pageViews: '120',
//     fundraiserViews: '23,123',
//     rate: '0.7'
//   },
//   {
//     key: 2,
//     date: '22 Jan',
//     earnings: '12,154',
//     pageViews: '120',
//     fundraiserViews: '23,123',
//     rate: '0.7'
//   },
//   {
//     key: 3,
//     date: '23 Jan',
//     earnings: '12,154',
//     pageViews: '120',
//     fundraiserViews: '23,123',
//     rate: '0.7'
//   },
//   {
//     key: 4,
//     date: '24 Jan',
//     earnings: '12,154',
//     pageViews: '120',
//     fundraiserViews: '23,123',
//     rate: '0.7'
//   },
//   {
//     key: 5,
//     date: '25 Jan',
//     earnings: '12,154',
//     pageViews: '120',
//     fundraiserViews: '23,123',
//     rate: '0.7'
//   },
// ]
