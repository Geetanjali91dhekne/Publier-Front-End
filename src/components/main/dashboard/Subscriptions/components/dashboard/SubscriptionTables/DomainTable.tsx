import React from 'react';
import PTable from '../../../../../../common/Table';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import DeltaBox from '../../../../../../common/DeltaBox';
import { commaSeperator } from '../../../../../../../utils/Validation';

type Props = {
    compare: boolean;
};

const DomainTable: React.FC<Props> = ({ compare }) => {
    const data = useSelector((state: RootState) => state.subsDashboard.subscriptionDomainTable);
    const loading = useSelector((state: RootState) => state.subsDashboard.subscriptionDomainTableLoader);
    const columns = [
        {
            dataIndex: 'domain_name',
            title: 'Domain',
            fixed: 'left',
            sorter: (a: any, b: any) => String(a.domain_name).localeCompare(String(b.domain_name)),
        },
        {
            dataIndex: 'total_pageview',
            title: 'Total Page Views',
            fixed: 'right',
            render: (text?: any, row?: any) => {
                return (
                    <div className="flex justify-end items-center">
                        <span>{commaSeperator(String(text))}</span>
                        {compare && <DeltaBox row={row?.total_pageview_percentage} />}
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseInt(a.total_pageview) - parseInt(b.total_pageview),
        },
        {
            dataIndex: 'sub_pageviews',
            title: 'Subscription Page Views',
            fixed: 'right',
            render: (text?: any, row?: any) => {
                return (
                    <div className="flex justify-end items-center">
                        <span>{commaSeperator(String(text))}</span>
                        {compare && <DeltaBox row={row?.sub_pageview_percentage} />}
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseInt(a.sub_pageviews) - parseInt(b.sub_pageviews),
        },
        {
            dataIndex: 'subscription_pvs_per',
            title: 'Subscription Page Views Percentage',
            fixed: 'right',
            render: (text?: any, row?: any) => {
                return (
                    <div className="flex justify-end items-center">
                        <span>{commaSeperator(parseFloat(String(text)).toFixed(4))}%</span>
                        {compare && <DeltaBox row={row?.subscription_pvs_percentage} />}
                    </div>
                );
            },
            sorter: (a: any, b: any) => parseFloat(a.subscription_pvs_per) - parseFloat(b.subscription_pvs_per),
        },
    ];
    return (
        <>
            <div className="mt-8">
                <PTable columns={columns} pagination={{ isShow: true }} className="dashboard_table" data={data || []} loading={loading} />
            </div>
        </>
    );
};

export default DomainTable;
