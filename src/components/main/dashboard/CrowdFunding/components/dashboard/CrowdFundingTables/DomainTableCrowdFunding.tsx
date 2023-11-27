import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import { commaSeperator } from '../../../../../../../utils/Validation';
import DeltaBox from '../../../../../../common/DeltaBox';
import PTable from '../../../../../../common/Table';

type Props = {
    comparison: boolean;
};

const DomainTableCrowdFunding: React.FC<Props> = ({ comparison }) => {
    const data = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDomainTable);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDomainTableLoader);
    const columns = [
        {
            dataIndex: 'domain_name',
            title: 'Domain',
            fixed: 'left',
            sorter: (a: any, b: any) => String(a.domain_name).localeCompare(String(b.domain_name)),
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

export default DomainTableCrowdFunding;
