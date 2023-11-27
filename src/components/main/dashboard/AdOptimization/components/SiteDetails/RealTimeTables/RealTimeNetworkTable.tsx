import React from 'react'
import { commaSeperator } from '../../../../../../../utils/Validation';
import PTable from '../../../../../../common/Table'

const topNetworkscol = [
    {
        title: 'Networks',
        dataIndex: 'network_name',
        key: 'networks',
        sorter: (a: any, b: any) => String(a.network_name).localeCompare(String(b.network_name)),
    },
    {
        title: 'Imps',
        dataIndex: 'total_impressions',
        key: 'imps',
        render: (text?: string) => (
            <div className="flex justify-end">
                <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
            </div>
        ),
        sorter: (a: any, b: any) => parseInt(a.total_impressions) - parseInt(b.total_impressions),
    },
    { 
        title: 'Latency', 
        dataIndex: 'latency', 
        key: 'latency' ,
        render: (text?: string) => (
            <div className="flex justify-end">
                <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
            </div>
        ),
        sorter: (a: any, b: any) => parseInt(a.latency) - parseInt(b.latency),
    },
    { 
        title: 'CPMs', 
        dataIndex: 'cpms', 
        key: 'cpms' ,
        render: (text?: string) => (
            <div className="flex justify-end">
                <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : `${text}`}</span>
            </div>
        ),
        sorter: (a: any, b: any) => parseFloat(a.cpms) - parseFloat(b.cpms),
    },
];
function RealTimeNetworkTable({ items, loading }: any) {
    return (
        <div className="drop-shadow-lg">
            <PTable columns={topNetworkscol} data={items} className="network_table" loading={loading} />
        </div>
    );
}

export default RealTimeNetworkTable
