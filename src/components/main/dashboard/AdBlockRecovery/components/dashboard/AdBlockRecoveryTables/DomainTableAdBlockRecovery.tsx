import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import { commaSeperator } from '../../../../../../../utils/Validation';
import DeltaBox from '../../../../../../common/DeltaBox';
import PTable from '../../../../../../common/Table';

type Props = {
    comparison?: boolean;
};

const DomainTableAdBlockRecovery: React.FC<Props> = ({ comparison }) => {
    const data = useSelector((state: RootState) => state.adBlockDashboard.adBlockDomainTable);
    const loader = useSelector((state: RootState) => state.adBlockDashboard.adBlockDomainTableLoader);
    const columns = [
        {
            dataIndex: 'domain_name',
            title: 'Domain',
            fixed: 'left',
            sorter: (a: any, b: any) => String(a.domain_name).localeCompare(String(b.domain_name)),
        },
        {
            dataIndex: 'ab_pageviews',
            title: 'Adblock PVs',
            fixed: 'right',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(String(text || 0))}</span>
                    {comparison ? <DeltaBox row={row.ab_pageviews_percentage} /> : null}
                </div>
            ),
            sorter: (a: any, b: any) => parseInt(a.ab_pageviews) - parseInt(b.ab_pageviews),
        },
        // {
        //      dataIndex: 'wishlisted_times',
        //      title: 'Wishlisted Times',
        //      fixed: 'right',
        //      render: (text: any, row: any) => (
        //           <div className="flex items-center justify-end gap-2">
        //                <span>{commaSeperator(String(text || 0))}</span>
        //                {comparison ? <DeltaBox row={row.fundraiser_views_per} /> : null}
        //           </div>
        //      )
        // },
    ];
    return (
        <>
            <div className="mt-4">
                <PTable columns={columns} className="dashboard_table" data={data} loading={loader} pagination={{ isShow: true }} />
            </div>
        </>
    );
};

export default DomainTableAdBlockRecovery;
