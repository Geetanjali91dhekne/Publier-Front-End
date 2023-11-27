import React from 'react';
import { commaSeperator } from '../../../../../../../utils/Validation';
import PTable from '../../../../../../common/Table';

const popularPagescol = [
    {
        title: 'Popular Pages',
        dataIndex: 'url',
        key: 'url',
        width: 300,
        sorter: (a: any, b: any) => String(a.url).localeCompare(String(b.url)),
    },
    {
        title: 'Imps',
        dataIndex: 'total_impressions',
        key: 'total_impressions',
        render: (text?: string) => (
            <div className="flex justify-end">
                <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
            </div>
        ),
        sorter: (a: any, b: any) => parseInt(a.total_impressions) - parseInt(b.total_impressions),
    },
    {
        title: 'PVs',
        dataIndex: 'pvs',
        key: 'pvs',
        render: (text?: string) => (
            <div className="flex justify-end">
                <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
            </div>
        ),
        sorter: (a: any, b: any) => parseInt(a.pvs) - parseInt(b.pvs),
    },
    { 
        title: 'Ads/PV', 
        dataIndex: 'ads_pv', 
        key: 'ads_pv' ,
        render: (text?: string) => (
            <div className="flex justify-end">
                <span>{text ? `${commaSeperator(String(text))}` : `${text}`}</span>
            </div>
        ),
        sorter: (a: any, b: any) => parseInt(a.ads_pv) - parseInt(b.ads_pv),    
    },
    { 
        title: 'RPMs', 
        dataIndex: 'rpm', 
        key: 'rpm' ,
        render: (text?: string) => (
            <div className="flex justify-end">
                <span>{text ? `$${commaSeperator(parseFloat(text).toFixed(2))}` : `${text}`}</span>
            </div>
        ),
        sorter: (a: any, b: any) => parseInt(a.rpm) - parseInt(b.rpm),    
    },
];
function PopularPages({ items, loading }: any) {
    return (
        <div className="drop-shadow-lg">
            <PTable columns={popularPagescol} data={items} className="size_table" loading={loading} />
        </div>
    );
}

export default PopularPages;
