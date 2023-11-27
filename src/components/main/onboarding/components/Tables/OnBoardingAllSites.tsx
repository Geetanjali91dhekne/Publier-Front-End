import React, { useState } from 'react';
import Icon1Active from '../../../../../assets/icons/onboarding/icon1Active.png';
import AdoptIconInactive from '../../../../../assets/icons/onboarding/adoptInActive.svg';
import Icon2Active from '../../../../../assets/icons/onboarding/icon2Active.png';
import SubscriptionIconInactive from '../../../../../assets/icons/onboarding/subscriptionInActive.svg';
import Icon3Active from '../../../../../assets/icons/onboarding/icon3Active.png';
import QuickShopIconInactive from '../../../../../assets/icons/onboarding/quickshopInActive.svg';
import Icon4Active from '../../../../../assets/icons/onboarding/icon4Active.png';
import CrowdFundIconInactive from '../../../../../assets/icons/onboarding/crowdfundInActive.svg';
import Icon5Active from '../../../../../assets/icons/onboarding/icon5Active.png';
import AdrecoveryIconInactive from '../../../../../assets/icons/onboarding/adRecoveryInActive.svg';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../routes/RoutesURL';
import PTable from '../../../../common/Table';
import OnboardingActionItem from '../OnBoardingSiteDetails/OnboardingActionItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/RootReducer';
import { Spin, Tooltip } from 'antd';
import AddAccountManager from './AddAccountManager';
import AdOptDashboardAction from '../../../dashboard/AdOptimization/redux/actions';
import moment from 'moment';

type Props = {
    filterQuery: any;
};
const OnBoardingAllSites: React.FC<Props> = ({ filterQuery }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [favUnFavSiteId, setFavUnFavSiteId] = useState('');
    const allSitesData = useSelector((state: RootState) => state.onboarding.onboardingAllSiteTable);
    const allSitesDataLoader = useSelector((state: RootState) => state.onboarding.onboardingAllSiteTableLoader);
    const favunfavLoader = useSelector((state: RootState) => state.adOptDashboard.FavouriteUnfavouriteLoader);

    const handleOnBoardingSiteDetails = (row: any) => {
        const URL = `${HEADERMENU_PATH.onboarding}/${row?.site_id}`;
        navigate(URL);
    };

    const columns = [
        {
            dataIndex: 'site_name',
            title: 'Site',
            fixed: 'left',
            width: '200px',
            render: (text: any, row: any) => (
                <div className="flex justify-between items-center gap-3">
                    <div className="w-[1.2rem]">
                        {favUnFavSiteId === row.site_id && favunfavLoader ? (
                            <Spin />
                        ) : (
                            <AiFillStar
                                onClick={() => {
                                    setFavUnFavSiteId(row.site_id);
                                    dispatch(
                                        AdOptDashboardAction.fetchSitesFavUnfav(
                                            {
                                                site_id: row.site_id,
                                                favourite_flag: row.favourite > 0 ? 0 : 1,
                                            },
                                            'onboardingSite',
                                        ),
                                    );
                                }}
                                size={'1.2rem'}
                                className="cursor-pointer"
                                color={row.favourite === 1 ? '#056433' : 'lightgray'}
                            />
                        )}
                    </div>
                    <div className="font-[700] text-[14px] grow truncate" onClick={() => handleOnBoardingSiteDetails(row)}>
                        {text}
                    </div>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.site_name).localeCompare(String(b.site_name)),
        },
        {
            dataIndex: 'publir_products',
            title: 'Live Products',
            width: '230px',
            render: (publir_products: any, row: any) => (
                <div className="flex items-center justify-center gap-3">
                    <Tooltip title="Ad Optimization" color="#056433">
                        {publir_products?.includes('1') ? (
                            <img className="w-[30px]" src={Icon1Active} alt="icons"></img>
                        ) : (
                            <div className="mx-[7.5px]">
                                <img className="w-[15px]" src={AdoptIconInactive} alt="icons" />
                            </div>
                        )}
                    </Tooltip>
                    <Tooltip title="Subscription" color="#056433">
                        {publir_products?.includes('2') ? (
                            <img className="w-[30px]" src={Icon2Active} alt="icons"></img>
                        ) : (
                            <div className="px-[7.5px]">
                                <img className="w-[15px]" src={SubscriptionIconInactive} alt="icons" />
                            </div>
                        )}
                    </Tooltip>
                    <Tooltip title="CrowdFunding" color="#056433">
                        {publir_products?.includes('3') ? <img className="w-[30px]" src={Icon3Active} alt="icons"></img> : <img className="w-[30px]" src={QuickShopIconInactive} alt="icons" />}
                    </Tooltip>
                    <Tooltip title="Quickshop" color="#056433">
                        {publir_products?.includes('4') ? <img className="w-[30px]" src={Icon4Active} alt="icons"></img> : <img className="w-[30px]" src={CrowdFundIconInactive} alt="icons" />}
                    </Tooltip>
                    <Tooltip title="AdBlock Recovery" color="#056433">
                        {publir_products?.includes('5') ? <img className="w-[30px]" src={Icon5Active} alt="icons"></img> : <img className="w-[30px]" src={AdrecoveryIconInactive} alt="icons" />}
                    </Tooltip>
                </div>
            ),
        },
        {
            dataIndex: 'date_updated',
            title: 'Last Updated',
            width: '200px',
            render: (text: any, row: any) => <div className="flex items-center justify-center text-[green]">{`${moment(text).format('YYYY-MM-DD  h:mm A')}`}</div>,
            sorter: (a: any, b: any) => moment(a.date_updated).unix() - moment(b.date_updated).unix(),
        },

        {
            dataIndex: 'publisher_name',
            title: 'Publisher Name',
            width: '190px',
            render: (text: any, row: any) => <div className="flex items-center justify-start text-[green] truncate">{row.business_name || text}</div>,
            sorter: (a: any, b: any) => String(a.business_name || a.publisher_name).localeCompare(String(b.business_name || b.publisher_name)),
        },

        {
            dataIndex: 'status',
            title: 'Status',
            width: '90px',
            render: (text: any, row: any) => (
                <div className={`flex items-center justify-start`}>
                    <div className={text === 'Y' ? 'text-[green]' : text === 'H' ? 'text-[#F0A236]' : 'text-[#858585]'}>
                        {text === 'Y' ? 'Active' : text === 'N' ? 'Inactive' : text === 'D' ? 'Delete' : text === 'H' ? 'On Hold' : text === 'AR' ? 'Archive' : ''}
                    </div>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.status).localeCompare(String(b.status)),
        },
        {
            dataIndex: 'prebid_version',
            title: 'Prebid Version',
            width: '140px',
            render: (text: any, row: any) => <div className="flex items-center justify-end text-[green]">{text}</div>,
            sorter: (a: any, b: any) => a.prebid_version > b.prebid_version,
        },
        {
            dataIndex: 'account_manager',
            title: 'Account Manager',
            width: '200px',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-between text-[green] gap-3">
                    <div className="w-[180px]">{text ? <div className="truncate">{text.full_name || text.email}</div> : <AddAccountManager siteId={row.site_id} activeType="site" filterQuery={filterQuery} />}</div>
                </div>
            ),
            sorter: (a: any, b: any) => String(a.account_manager).localeCompare(String(b.account_manager)),
        },
        {
            dataIndex: 'action',
            title: 'Action',
            fixed: 'right',
            width: '70px',
            render: (text: any, row: any) => (
                <div className="flex items-center justify-center">
                    <div className=" w-[30px]">
                        <OnboardingActionItem rowData={row} currentTab={'site'} filterQuery={filterQuery} />
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="mt-4">
            <PTable columns={columns} className="dashboard_table" data={allSitesData} loading={allSitesDataLoader} pagination={{ isShow: true }} />
        </div>
    );
};

export default OnBoardingAllSites;
