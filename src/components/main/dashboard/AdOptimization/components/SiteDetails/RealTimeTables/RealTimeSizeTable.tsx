import React from 'react'
import { commaSeperator } from '../../../../../../../utils/Validation';
import PTable from '../../../../../../common/Table'
 const topSizesCol = [
    { 
        title: 'Sizes', 
        dataIndex: 'dimensions', 
        key: 'sizes', 
        sorter: (a: any, b: any) => String(a.dimensions).localeCompare(String(b.dimensions)),
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
function RealTimeSizeTable({ items, loading }: any) {

    return (
        <div className="drop-shadow-lg">
            <PTable columns={topSizesCol} data={items} className="size_table" loading={loading} />
        </div>
    );
}

export default RealTimeSizeTable
