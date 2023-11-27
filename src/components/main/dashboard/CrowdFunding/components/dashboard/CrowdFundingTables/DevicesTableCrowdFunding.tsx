import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import { commaSeperator } from '../../../../../../../utils/Validation';
import DeltaBox from '../../../../../../common/DeltaBox';
import PTable from '../../../../../../common/Table';

type Props = {
    comparison: boolean;
};

const DevicesTableCrowdFunding: React.FC<Props> = ({ comparison }) => {
    const data = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDeviceTable);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDeviceTableLoader);
    const columns = [
        {
            dataIndex: 'device',
            title: 'Devices',
            fixed: 'left',
            sorter: (a: any, b: any) => String(a.device).localeCompare(String(b.device)),
        },
        {
            dataIndex: 'pageviews',
            title: 'Page Views',
            fixed: 'right',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(String(text || 0))}</span>
                    {comparison ? <DeltaBox row={row.pageview_per} /> : null}
                </div>
            ),
            sorter: (a: any, b: any) => parseInt(a.pageviews) - parseInt(b.pageviews),
        },
        {
            dataIndex: 'fundraiser_views',
            title: 'Fundraiser Views',
            fixed: 'right',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(String(text || 0))}</span>
                    {comparison ? <DeltaBox row={row.fundraiser_views_per} /> : null}
                </div>
            ),
            sorter: (a: any, b: any) => parseInt(a.fundraiser_views) - parseInt(b.fundraiser_views),
        },
    ];
    return (
        <>
            <div className="mt-8">
                <PTable columns={columns} className="dashboard_table" data={data || []} loading={loader} pagination={{ isShow: true }} />
            </div>
        </>
    );
};

export default DevicesTableCrowdFunding;
