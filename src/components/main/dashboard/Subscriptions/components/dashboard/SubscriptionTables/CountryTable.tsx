import React from 'react';
import PTable from '../../../../../../common/Table';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import DeltaBox from '../../../../../../common/DeltaBox';
import { commaSeperator } from '../../../../../../../utils/Validation';

type Props = {
    compare: boolean;
};

const CountryTable: React.FC<Props> = ({ compare }) => {
    const countryTableData = useSelector((state: RootState) => state?.subsDashboard?.countryTable);
    const countryTableLoader = useSelector((state: RootState) => state?.subsDashboard?.countryTableLoader);
    const columns = [
        {
            dataIndex: 'country',
            key: 'country',
            title: 'Country Name',
            fixed: 'left',
            sorter: (a: any, b: any) => String(a.country).localeCompare(String(b.country)),
        },
        {
            dataIndex: 'total_pageview',
            key: 'pageviews',
            title: 'Total Page Views',
            fixed: 'right',
            render: (text?: string, row?: any) => {
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
            render: (text?: string, row?: any) => {
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
                <PTable columns={columns} pagination={{ isShow: true }} className="dashboard_table" data={countryTableData || []} loading={countryTableLoader} />
            </div>
        </>
    );
};

export default CountryTable;
