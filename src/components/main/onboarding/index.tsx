import { Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OnBoardingAllSites from './components/Tables/OnBoardingAllSites';
import { RootState } from '../../../store/RootReducer';
import { FavoriteOrRecent } from '../dashboard/AdOptimization/redux/types';
import PTabs from '../../common/Tabs';
import CreateSite from './components/CreateSites';
import Recent from './components/Tables/Recent';
import Favorites from './components/Tables/Favorites';
import Archive from './components/Tables/Archive';
import FilterOnBoarding from './components/Modals/filter';
import OnboardActions from './redux/actions';
import PButton from '../../common/Button';

const OnBoarding: React.FC = () => {
    const dispatch = useDispatch();
    const [client, setClient] = useState<string | undefined>(undefined);
    const [filterQuery, setFilterQuery] = useState<{
        searchSite?: string;
        siteIds?: any;
        publisherIds?: any;
        status?: any;
        publisherVersion?: any;
        accountManager?: any;
        liveProduct?: any;
    }>({
        searchSite: '',
        siteIds: [],
        publisherIds: [],
        status: [],
        publisherVersion: [],
        accountManager: [],
        liveProduct: [],
    });

    // const [searchData, setSearchData] = useState<{
    //     allSite: {
    //         searchSite?: string;
    //         siteIds?: any;
    //         publisherIds?: any;
    //         status?: any;
    //         publisherVersion?: any;
    //         accountManager?: any;
    //         liveProduct?: any;
    //     };
    //     recent: {
    //         searchSite?: string;
    //         siteIds?: any;
    //         publisherIds?: any;
    //         status?: any;
    //         publisherVersion?: any;
    //         accountManager?: any;
    //         liveProduct?: any;
    //     };
    //     favorites: {
    //         searchSite?: string;
    //         siteIds?: any;
    //         publisherIds?: any;
    //         status?: any;
    //         publisherVersion?: any;
    //         accountManager?: any;
    //         liveProduct?: any;
    //     };
    //     archive: {
    //         searchSite?: string;
    //         siteIds?: any;
    //         publisherIds?: any;
    //         status?: any;
    //         publisherVersion?: any;
    //         accountManager?: any;
    //         liveProduct?: any;
    //     };
    // }>({
    //     allSite: {
    //         searchSite: undefined,
    //         siteIds: undefined,
    //         publisherIds: undefined,
    //         status: undefined,
    //         publisherVersion: undefined,
    //         accountManager: undefined,
    //         liveProduct: undefined,
    //     },
    //     recent: {
    //         searchSite: undefined,
    //         siteIds: undefined,
    //         publisherIds: undefined,
    //         status: undefined,
    //         publisherVersion: undefined,
    //         accountManager: undefined,
    //         liveProduct: undefined,
    //     },
    //     favorites: {
    //         searchSite: undefined,
    //         siteIds: undefined,
    //         publisherIds: undefined,
    //         status: undefined,
    //         publisherVersion: undefined,
    //         accountManager: undefined,
    //         liveProduct: undefined,
    //     },
    //     archive: {
    //         searchSite: undefined,
    //         siteIds: undefined,
    //         publisherIds: undefined,
    //         status: undefined,
    //         publisherVersion: undefined,
    //         accountManager: undefined,
    //         liveProduct: undefined,
    //     },
    // });
    const [activeTab, setActiveTab] = useState('All Sites');
    const sitesloading = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const allSites = useSelector((state: RootState) => state.adOptDashboard.allSites);

    const siteName = useMemo(() => {
        return allSites?.find((e: FavoriteOrRecent) => String(e?.site_id) === String(client))?.site_name;
    }, [client, allSites]);

    const table = useMemo(() => {
        switch (activeTab) {
            case 'All Sites':
                return <OnBoardingAllSites filterQuery={filterQuery} />;
            case 'Recent':
                return <Recent filterQuery={filterQuery} />;
            case 'Favorites':
                return <Favorites filterQuery={filterQuery} />;
            case 'Archive':
                return <Archive filterQuery={filterQuery} />;
            default:
                return null;
        }
    }, [activeTab, filterQuery]);

    // const compareArray = (arr1: any, arr2: any) => {
    //     if (arr1 === undefined && arr2 !== undefined) {
    //         return true;
    //     }
    //     if (arr1.length !== arr2.length) {
    //         return true;
    //     } else {
    //         let s1 = arr1.toString();
    //         let s2 = arr2.toString();
    //         return s1 !== s2;
    //     }
    // };

    useEffect(() => {
        if (siteName) {
            setFilterQuery({
                searchSite: siteName,
                siteIds: [],
                publisherIds: [],
                status: [],
                publisherVersion: [],
                accountManager: [],
                liveProduct: [],
            });
        } else {
            setFilterQuery({
                searchSite: '',
                siteIds: [],
                publisherIds: [],
                status: [],
                publisherVersion: [],
                accountManager: [],
                liveProduct: [],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [siteName]);

    useEffect(() => {
        // if (
        //     activeTab === 'All Sites' &&
        //     (compareArray(searchData?.allSite.status, filterQuery?.status) ||
        //         compareArray(searchData?.allSite.siteIds, filterQuery?.siteIds) ||
        //         compareArray(searchData?.allSite.publisherIds, filterQuery?.publisherIds) ||
        //         compareArray(searchData?.allSite.publisherVersion, filterQuery?.publisherVersion) ||
        //         compareArray(searchData?.allSite.accountManager, filterQuery?.accountManager) ||
        //         compareArray(searchData?.allSite.liveProduct, filterQuery?.liveProduct) ||
        //         searchData?.allSite.searchSite !== filterQuery?.searchSite)
        // )
        if (activeTab === 'All Sites') {
            dispatch(
                OnboardActions.fetchOnboardAllSiteTableData({
                    search_site: filterQuery?.searchSite,
                    site_ids: filterQuery?.siteIds,
                    publisher_ids: filterQuery?.publisherIds,
                    status: filterQuery?.status,
                    publisher_version: filterQuery?.publisherVersion,
                    account_manager: filterQuery?.accountManager,
                    live_product: filterQuery?.liveProduct,
                }),
            );

            // setSearchData({
            //     ...searchData,
            //     allSite: {
            //         searchSite: filterQuery?.searchSite,
            //         siteIds: filterQuery?.siteIds,
            //         publisherIds: filterQuery?.publisherIds,
            //         status: filterQuery?.status,
            //         publisherVersion: filterQuery?.publisherVersion,
            //         accountManager: filterQuery?.accountManager,
            //         liveProduct: filterQuery?.liveProduct,
            //     },
            // });
        }

        // if (
        //     (activeTab === 'Recent' && compareArray(searchData?.recent.status, filterQuery?.status)) ||
        //     compareArray(searchData?.recent.siteIds, filterQuery?.siteIds) ||
        //     compareArray(searchData?.recent.publisherIds, filterQuery?.publisherIds) ||
        //     compareArray(searchData?.recent.publisherVersion, filterQuery?.publisherVersion) ||
        //     compareArray(searchData?.recent.accountManager, filterQuery?.accountManager) ||
        //     compareArray(searchData?.recent.liveProduct, filterQuery?.liveProduct) ||
        //     searchData?.recent.searchSite !== filterQuery?.searchSite
        // )
        if (activeTab === 'Recent') {
            dispatch(
                OnboardActions.fetchOnboardRecentTableData({
                    search_site: filterQuery?.searchSite,
                    site_ids: filterQuery?.siteIds,
                    publisher_ids: filterQuery?.publisherIds,
                    status: filterQuery?.status,
                    publisher_version: filterQuery?.publisherVersion,
                    account_manager: filterQuery?.accountManager,
                    live_product: filterQuery?.liveProduct,
                }),
            );

            // setSearchData({
            //     ...searchData,
            //     recent: {
            //         searchSite: filterQuery?.searchSite,
            //         siteIds: filterQuery?.siteIds,
            //         publisherIds: filterQuery?.publisherIds,
            //         status: filterQuery?.status,
            //         publisherVersion: filterQuery?.publisherVersion,
            //         accountManager: filterQuery?.accountManager,
            //         liveProduct: filterQuery?.liveProduct,
            //     },
            // });
        }

        // if (
        //     activeTab === 'Favorites' &&
        //     (compareArray(searchData?.favorites.status, filterQuery?.status) ||
        //         compareArray(searchData?.favorites.siteIds, filterQuery?.siteIds) ||
        //         compareArray(searchData?.favorites.publisherIds, filterQuery?.publisherIds) ||
        //         compareArray(searchData?.favorites.publisherVersion, filterQuery?.publisherVersion) ||
        //         compareArray(searchData?.favorites.accountManager, filterQuery?.accountManager) ||
        //         compareArray(searchData?.favorites.liveProduct, filterQuery?.liveProduct) ||
        //         searchData?.favorites.searchSite !== filterQuery?.searchSite)
        // )
        if (activeTab === 'Favorites') {
            dispatch(
                OnboardActions.fetchOnboardFavoritesTableData({
                    search_site: filterQuery?.searchSite,
                    site_ids: filterQuery?.siteIds,
                    publisher_ids: filterQuery?.publisherIds,
                    status: filterQuery?.status,
                    publisher_version: filterQuery?.publisherVersion,
                    account_manager: filterQuery?.accountManager,
                    live_product: filterQuery?.liveProduct,
                }),
            );

            // setSearchData({
            //     ...searchData,
            //     favorites: {
            //         searchSite: filterQuery?.searchSite,
            //         siteIds: filterQuery?.siteIds,
            //         publisherIds: filterQuery?.publisherIds,
            //         status: filterQuery?.status,
            //         publisherVersion: filterQuery?.publisherVersion,
            //         accountManager: filterQuery?.accountManager,
            //         liveProduct: filterQuery?.liveProduct,
            //     },
            // });
        }

        // if (
        //     activeTab === 'Archive' &&
        //     (compareArray(searchData?.archive.status, filterQuery?.status) ||
        //         compareArray(searchData?.archive.siteIds, filterQuery?.siteIds) ||
        //         compareArray(searchData?.archive.publisherIds, filterQuery?.publisherIds) ||
        //         compareArray(searchData?.archive.publisherVersion, filterQuery?.publisherVersion) ||
        //         compareArray(searchData?.archive.accountManager, filterQuery?.accountManager) ||
        //         compareArray(searchData?.archive.liveProduct, filterQuery?.liveProduct) ||
        //         searchData?.archive.searchSite !== filterQuery?.searchSite)
        // )
        if (activeTab === 'Archive') {
            dispatch(
                OnboardActions.fetchOnboardArchivesTableData({
                    search_site: filterQuery?.searchSite,
                    site_ids: filterQuery?.siteIds,
                    publisher_ids: filterQuery?.publisherIds,
                    status: filterQuery?.status,
                    publisher_version: filterQuery?.publisherVersion,
                    account_manager: filterQuery?.accountManager,
                    live_product: filterQuery?.liveProduct,
                }),
            );

            // setSearchData({
            //     ...searchData,
            //     archive: {
            //         searchSite: filterQuery?.searchSite,
            //         siteIds: filterQuery?.siteIds,
            //         publisherIds: filterQuery?.publisherIds,
            //         status: filterQuery?.status,
            //         publisherVersion: filterQuery?.publisherVersion,
            //         accountManager: filterQuery?.accountManager,
            //         liveProduct: filterQuery?.liveProduct,
            //     },
            // });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, filterQuery, activeTab]);

    // fetching filter lists
    useEffect(() => {
        dispatch(OnboardActions.fetchOnboardAllSiteList());
        dispatch(OnboardActions.fetchOnboardPublisherList());
        dispatch(OnboardActions.fetchOnboardPrebidList());
        dispatch(OnboardActions.fetchOnboardAccountManagerList());
    }, [dispatch]);

    return (
        <div>
            <div className="flex justify-between mt-4">
                <div className="flex gap-2 items-center">
                    <div className="w-[400px]">
                        <Select
                            allowClear={true}
                            loading={sitesloading}
                            size="large"
                            value={filterQuery?.searchSite ? siteName : undefined}
                            optionFilterProp="children"
                            placeholder={'Search for Sites'}
                            onClear={() => setClient('')}
                            onChange={(e) => {
                                setClient(e);
                            }}
                            className="w-full"
                            showSearch
                            options={allSites.map((d) => {
                                return { value: d.site_id, label: d.site_name };
                            })}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        />
                    </div>
                    {client && (
                        <div className={'mr-4 border rounded-lg border-green-800'}>
                            <PButton onClick={() => setClient('')} light={true} title={'Clear Search'} className="w-[120px] text-[14px]" />
                        </div>
                    )}
                </div>
                <div>{<CreateSite />}</div>
            </div>

            <div>
                <div className="font-semibold mt-5 text-[22px]">Sites</div>
                <div className="mt-2">
                    <FilterOnBoarding setFilterQuery={setFilterQuery} filterQuery={filterQuery} activeTab={activeTab} />

                    <PTabs
                        activeTab={activeTab}
                        setActiveTab={(e) => setActiveTab(e)}
                        tabs={[
                            { key: 'All Sites', title: 'Sites' },
                            { key: 'Recent', title: 'Recent' },
                            { key: 'Favorites', title: 'Favorites' },
                            { key: 'Archive', title: 'Archive' },
                        ]}
                    />
                    <div className="pb-4">{table}</div>
                </div>
            </div>
        </div>
    );
};

export default OnBoarding;
