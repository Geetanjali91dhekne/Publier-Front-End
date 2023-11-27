import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/RootReducer';
import { COLORS } from '../../../../../../utils/Colors';
import { commaSeperator } from '../../../../../../utils/Validation';
import DeltaBox from '../../../../../common/DeltaBox';
import PTable from '../../../../../common/Table';
import { SitesDemandChannel } from '../../redux/types';
import { BsFillInfoCircleFill } from 'react-icons/bs';

type Props = {
    compaison: boolean;
    setPageNumber: any;
    pageNumber: number;
    revenueType?: string;
    ad_server?: string;
};

const Networks: React.FC<Props> = ({ compaison, setPageNumber, pageNumber, revenueType, ad_server }) => {
    const sites = useSelector((state: RootState) => state.adOptDashboard.allSitesByDemandPartner);
    const siteLoading = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const data = sites;
    const loading = siteLoading;
    
    const columns = [
        {
            dataIndex: 'site_name',
            title: 'Site Name',
            width: 300,
            fixed: 'left',
            render: (text: any, row: SitesDemandChannel, index: number) => {
                return (
                    <div className="flex items-center">
                        <Avatar className="mr-1" size={'small'} style={{ color: '#fff', backgroundColor: COLORS[index > COLORS.length ? index % COLORS.length : index] }}>
                            {(text || '').charAt(0)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            dataIndex: 'total_request',
            title: 'Ad Requests',
            width: 200,
            render: (text: any, row: SitesDemandChannel) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{ad_server === 'ON'? commaSeperator(String(text || 0)):'NA'}</span>
                    {row.total_request_percentage !== undefined && compaison && ad_server ==='ON'? <DeltaBox row={row.total_request_percentage} /> : null}
                </div>
            ),
        },
        {
            dataIndex: 'total_impressions',
            title: 'Monetized Impressions',
            width: 200,
            render: (text: any, row: SitesDemandChannel) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{commaSeperator(String(text || 0))}</span>
                    {row.impressions_percentage !== undefined && compaison ? <DeltaBox row={row.impressions_percentage} /> : null}
                </div>
            ),
        },
        {
            dataIndex: 'total_revenue',
            title: (
                <div className="flex items-center">
                    Revenue ($){' '}
                    <Tooltip title="Sorted by decreasing revenue">
                        <BsFillInfoCircleFill className="ml-1 cursor-pointer" />
                    </Tooltip>
                </div>
            ),
            width: 200,
            render: (text: any, row: SitesDemandChannel) => {
                return (
                    <div className="flex items-center justify-end gap-2">
                        {revenueType === 'net' ? (
                            <>
                                <span>${commaSeperator(parseFloat(row.net_total_revenue || 0).toFixed(2))}</span>
                                {row.net_revenue_percentage !== undefined && compaison ? <DeltaBox row={row.net_revenue_percentage} /> : null}
                            </>
                        ) : (
                            <>
                                <span>${commaSeperator(parseFloat(row.gross_total_revenue || 0).toFixed(2))}</span>
                                {row.gross_revenue_percentage !== undefined && compaison ? <DeltaBox row={row.gross_revenue_percentage} /> : null}
                            </>
                        )}
                    </div>
                );
            },
        },
        {
            dataIndex: 'total_cpms',
            title: 'CPM ($)',
            width: 200,
            render: (text: any, row: SitesDemandChannel) => (
                <div className="flex items-center justify-end gap-2">
                    {revenueType === 'net' ? (
                        <>
                            <span>${commaSeperator(parseFloat(row.net_total_cpms || 0).toFixed(2))}</span>
                            {row.net_total_cpms_percentage !== undefined && compaison ? <DeltaBox row={row.net_total_cpms_percentage} /> : null}
                        </>
                    ) : (
                        <>
                            <span>${commaSeperator(parseFloat(row.gross_total_cpms || 0).toFixed(2))}</span>
                            {row.gross_total_cpms_percentage !== undefined && compaison ? <DeltaBox row={row.gross_total_cpms_percentage} /> : null}
                        </>
                    )}
                </div>
            ),
        },
        {
            dataIndex: 'total_fillrate',
            title: 'Fill Rate (%)', 
            width: 200,
            render: (text: any, row: SitesDemandChannel) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{ad_server === 'ON'?`${ commaSeperator(parseFloat(text || 0).toFixed(2))}%`:"NA"}</span>
                    {row.total_fillrate_percentage !== undefined && compaison && ad_server === 'ON' ? <DeltaBox row={row.total_fillrate_percentage} /> : null}
                </div>
            ),
        },
    ];
    return (
        <div className="py-4 w-full dashboard hideHover">
            <PTable columns={columns} className="dashboard_table" data={data} loading={loading} rowKey={(d: SitesDemandChannel) => `${d.site_id}_${d.site_id}`} isHideSort={true} pagination={{isShow:true }}/>
        </div>
    );
};

export default Networks;
