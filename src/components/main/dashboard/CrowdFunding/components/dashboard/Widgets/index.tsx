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
import CrowdFundingDashboardActions from '../../../redux/actions';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    siteId?: any;
};

const WidgetCrowdFunding: React.FC<Props> = ({ startDate, endDate, revenueType, siteId }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const data = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingWidgetTableData);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingWidgetTableLoader);

    useEffect(() => {
        if (startDate && endDate) {
            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundWidgetTable({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
    }, [dispatch, startDate, endDate, revenueType, siteId]);

    const widgetExport = () => {
        if (startDate && endDate && siteId) {
            const data = {
                start_date: startDate,
                end_date: endDate,
                revenue: revenueType,
                site_id: siteId,
            };
            setLoading(true);

            Apis.fetchCrowdFunExportWidgetTableApi(data)
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
        },
        {
            dataIndex: 'total_earnings',
            title: 'Earnings',
            fixed: 'right',
            width: 200,
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <>
                        <span>${commaSeperator(parseFloat(row.total_earnings || 0).toFixed(2))}</span>
                    </>
                </div>
            ),
        },
        {
            dataIndex: 'pageview',
            title: 'Page Views',
            fixed: 'right',
            width: 200,
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <>
                        <span>{commaSeperator(row.pageview)}</span>
                    </>
                </div>
            ),
        },
        {
            dataIndex: 'fundraiser_views',
            title: 'Fundraiser Views',
            fixed: 'right',
            width: 200,
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <>
                        <span>{commaSeperator(row.fundraiser_views)}</span>
                    </>
                </div>
            ),
        },
        // {
        //   dataIndex: 'rate',
        //   title: 'Fundraiser View-ability Rate(%)',
        //   fixed: 'right',
        //   width: 200,
        //   render: (text: any, row: any) => (
        //     <div className="flex items-center justify-end gap-2">
        //       <>
        //         <span>{commaSeperator(parseFloat(row.rate || 0).toFixed(2))}%</span>
        //       </>
        //     </div>
        //   ),
        // },
    ];
    return (
        <div className="">
            <div className="w-[100%] relative flex flex-row-reverse">
                <PButton loading={loading} className="top-2" title={'Export'} onClick={widgetExport} />
            </div>

            <PTabs activeTab={''} setActiveTab={() => {}} tabs={[]} />
            <div className="mt-8">
                <PTable columns={columns} className="dashboard_table" data={data || []} loading={loader} pagination={{ isShow: true }} />
            </div>
        </div>
    );
};

export default WidgetCrowdFunding;
