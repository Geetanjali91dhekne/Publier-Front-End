import { Avatar, Pagination, Spin, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/RootReducer';
import { COLORS } from '../../../../../../utils/Colors';
import { commaSeperator } from '../../../../../../utils/Validation';
import DeltaBox from '../../../../../common/DeltaBox';
import PTable from '../../../../../common/Table';
import { FavoriteOrRecent } from '../../redux/types';
import { useDispatch } from 'react-redux';
import AdOptDashboardAction from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import { BsFillInfoCircleFill } from 'react-icons/bs';
type Props = {
    activeTab: string;
    compaison: boolean;
    setPageNumber: any;
    pageNumber: number;
    revenueType?: string;
    ad_server?: string;
};

const Sites: React.FC<Props> = ({ activeTab, compaison, setPageNumber, pageNumber, revenueType, ad_server }) => {
    const [rowid, setrowid]: any = useState({
        status: false,
        id: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allSites = useSelector((state: RootState) => state.adOptDashboard.sites);
    const allSiteLoading = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const favoritesSites = useSelector((state: RootState) => state.adOptDashboard.favouriteSite);
    const favoritesSitesLoading = useSelector((state: RootState) => state.adOptDashboard.favouriteSiteLoader);
    const recentSites = useSelector((state: RootState) => state.adOptDashboard.recentSite);
    const recentSiteLoading = useSelector((state: RootState) => state.adOptDashboard.recentLoader);
    const count = useSelector((state: RootState) => state.adOptDashboard.count);
    const data = activeTab === 'all' ? allSites : activeTab === 'favorites' ? favoritesSites : recentSites;
    const loading = activeTab === 'all' ? allSiteLoading : activeTab === 'favorites' ? favoritesSitesLoading : recentSiteLoading;

    const totalrecords = activeTab === 'all' ? count.siteCount : activeTab === 'favorites' ? count.fCount : count.rCount;

    const favunfav = useSelector((state: RootState) => state.adOptDashboard.FavouriteUnfavourite);
    const handlePageChange = (page: number) => {
        setPageNumber(page);
    };

    useEffect(() => {
        if (favunfav?.status === true) {
            setrowid({
                status: false,
                id: '',
            });
        }
    }, [dispatch, favunfav?.status]);
    
    const columns = [
        {
            dataIndex: 'site_name',
            title: 'Site Name',
            width: 300,
            fixed: 'left',
            render: (text: any, row: FavoriteOrRecent, index: number) => {
                return (
                    <div className="flex items-center">
                        {rowid.id === row.site_id && rowid.status === true ? (
                            <Spin />
                        ) : (
                            <AiFillStar
                                onClick={() => {
                                    setrowid({
                                        status: true,
                                        id: row.site_id,
                                    });
                                    dispatch(
                                        AdOptDashboardAction.fetchSitesFavUnfav(
                                            {
                                                site_id: row.site_id,
                                                favourite_flag: row.favourite > 0 ? 0 : 1,
                                                ad_server: ad_server,
                                            },
                                            activeTab,
                                        ),
                                    );
                                }}
                                size={'1.2rem'}
                                className="cursor-pointer"
                                color={row.favourite > 0 ? '#F0A236' : 'lightgray'}
                            />
                        )}

                        <Avatar className="mr-1" size={'small'} style={{ color: '#fff', backgroundColor: COLORS[index > COLORS.length ? index % COLORS.length : index] }}>
                            {(text || '').charAt(0)}
                        </Avatar>
                        <span onClick={() => navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}/${row.site_id}`)} className="montserrat-medium ext-ellipsis overflow-hidden whitespace-nowrap w-4/5">
                            {text}
                        </span>
                    </div>
                );
            },
        },
        {
            dataIndex: 'total_request',
            title: 'Ad Requests',
            width: 200,
            render: (text: any, row: FavoriteOrRecent) => (
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
            render: (text: any, row: FavoriteOrRecent) => (
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
            render: (text: any, row: FavoriteOrRecent) => {
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
            render: (text: any, row: FavoriteOrRecent) => (
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
            render: (text: any, row: FavoriteOrRecent) => (
                <div className="flex items-center justify-end gap-2">
                    <span>{ad_server === 'ON'?`${ commaSeperator(parseFloat(text || 0).toFixed(2))}%`:"NA"}</span>
                    {row.total_fillrate_percentage !== undefined && compaison && ad_server === 'ON' ? <DeltaBox row={row.total_fillrate_percentage} /> : null}
                </div>
            ),
        },
    ];
    return (
        <div className="py-4 w-full dashboard hideHover">
            <PTable columns={columns} className="dashboard_table" data={data} loading={loading} rowKey={(d: FavoriteOrRecent) => `${d.id}_${d.site_id}_${d.network_id}_${activeTab}`} isHideSort={true} />
            <div className="flex flex-row mt-4 justify-end">
                <Pagination current={pageNumber} total={totalrecords} onChange={handlePageChange} pageSizeOptions={[10]} showSizeChanger={false} />
            </div>
        </div>
    );
};

export default Sites;
