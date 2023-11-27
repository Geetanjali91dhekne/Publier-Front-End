import React, { useEffect, useMemo, useState } from 'react';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import PModal from '../../../../common/Modal';
import { RoundButton } from '../../../../common/Button';
import { Badge, Checkbox, Input, Menu, MenuProps, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/RootReducer';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {
    setFilterQuery: any;
    activeTab: any;
    filterQuery: any;
};
const FilterOnBoarding: React.FC<Props> = ({ setFilterQuery, activeTab, filterQuery }) => {
    //     console.log('setFilterQuery');
    //     console.log(setFilterQuery);
    const [showModal, setShowModal] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(['site']);
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
    const onboardSiteList = useSelector((state: RootState) => state?.onboarding?.onboardSiteList);
    const onboardSiteListLoader = useSelector((state: RootState) => state?.onboarding?.onboardSiteListLoader);

    const publisherList = useSelector((state: RootState) => state?.onboarding?.onboardPublisherList);
    const publisherListLoader = useSelector((state: RootState) => state?.onboarding?.onboardPublisherListLoader);

    const prebidVersionList = useSelector((state: RootState) => state?.onboarding?.onboardPrebidList);
    const prebidVersionListLoader = useSelector((state: RootState) => state?.onboarding?.onboardPrebidListLoader);

    const accountManagerList = useSelector((state: RootState) => state?.onboarding?.onboardAccountManagerList);
    const accountManagerListLoader = useSelector((state: RootState) => state?.onboarding?.onboardAccountManagerListLoader);

    const [localFilter, setLocalFilter] = useState<{
        site?: any;
        live_products?: any;
        publisher?: any;
        status?: any;
        version?: any;
        account_manager?: any;
    }>({
        site: [],
        live_products: [],
        publisher: [],
        status: [],
        version: [],
        account_manager: [],
    });

    const items: MenuItem[] = [
        getItem('Site', 'site'),
        getItem('Live Products', 'live_products'),
        getItem('Publisher Name', 'publisher'),
        activeTab !== 'Archive' ? getItem('Status', 'status') : null,
        getItem('Prebid Version', 'version'),
        getItem('Account Manager', 'account_manager'),
    ];

    const onClickMenuItem: MenuProps['onClick'] = (e) => {
        setSelectedKeys([e.key]);
    };

    // gives the specific data list
    const dataList = useMemo(() => {
        const key: any = selectedKeys[0];
        switch (key) {
            case 'site':
                return onboardSiteList;
            case 'live_products':
                return liveProductsList;
            case 'publisher':
                return publisherList;
            case 'version':
                return prebidVersionList;
            case 'account_manager':
                return accountManagerList;
            case 'status':
                return statusList;
            default:
                return [];
        }
    }, [selectedKeys, onboardSiteList, publisherList, prebidVersionList, accountManagerList]);

    // selecting and unselecting the checkbox in filter
    const onChangeCheckbox = (value: any, item: string | number) => {
        let key = selectedKeys[0];
        const itemList =
            key === 'site'
                ? [...localFilter?.site]
                : key === 'live_products'
                ? [...localFilter?.live_products]
                : key === 'publisher'
                ? [...localFilter?.publisher]
                : key === 'status'
                ? [...localFilter?.status]
                : key === 'version'
                ? [...localFilter?.version]
                : [...localFilter?.account_manager];

        if (itemList.indexOf(item) > -1) {
            itemList.splice(itemList.indexOf(item), 1);
        } else {
            itemList.push(item);
        }
        if (key === 'site') {
            setLocalFilter({ ...localFilter, site: itemList });
        } else if (key === 'live_products') {
            setLocalFilter({ ...localFilter, live_products: itemList });
        } else if (key === 'publisher') {
            setLocalFilter({ ...localFilter, publisher: itemList });
        } else if (key === 'status') {
            setLocalFilter({ ...localFilter, status: itemList });
        } else if (key === 'version') {
            setLocalFilter({ ...localFilter, version: itemList });
        } else {
            setLocalFilter({ ...localFilter, account_manager: itemList });
        }
    };

    // finds wether the field is selected for filtering
    const findCheck = (item: string | number): boolean | undefined => {
        let key = selectedKeys[0];
        const itemList =
            key === 'site'
                ? [...localFilter?.site]
                : key === 'live_products'
                ? [...localFilter?.live_products]
                : key === 'publisher'
                ? [...localFilter?.publisher]
                : key === 'status'
                ? [...localFilter?.status]
                : key === 'version'
                ? [...localFilter?.version]
                : [...localFilter?.account_manager];

        return itemList.includes(item);
    };

    // gets count of number of filters applied to be displayed on badges
    const getCount = useMemo(() => {
        let count = 0;
        for (let value of Object.values(localFilter)) {
            if (value.length > 0) {
                count++;
            }
        }
        return count;
    }, [localFilter]);

    const getGlobalQueryCount = useMemo(() => {
        let queryCount = 0;
        for (let value of Object.values(filterQuery)) {
            let arr: any = value;
            if (typeof arr !== typeof 'string' && arr?.length > 0) {
                queryCount++;
            }
        }
        return queryCount;
    }, [filterQuery]);

    // excutes when apply button is clicked
    const onClickSearch = () => {
        setFilterQuery({
            searchSite: '',
            siteIds: localFilter?.site,
            publisherIds: localFilter?.publisher,
            status: localFilter?.status,
            publisherVersion: localFilter?.version,
            accountManager: localFilter?.account_manager,
            liveProduct: localFilter?.live_products,
        });
        setShowModal(false);
    };

    const onClickListSearch = () => {
        let list: any = [];
        dataList?.forEach((item: any) => {
            const title = item?.title;
            if (title.toLowerCase().includes(searchInput?.toLowerCase())) {
                list.push(item);
            }
        });
        setCurrentList(list);
    };

    useEffect(() => {
        if (dataList) {
            setCurrentList(dataList);
        }
    }, [dataList]);

    useEffect(() => {
        if (searchInput) {
            onClickListSearch();
        } else {
            setCurrentList(dataList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput, dataList]);

    // when table tabs are changed it resets the filter
    useEffect(() => {
        setLocalFilter({
            site: [],
            live_products: [],
            publisher: [],
            status: [],
            version: [],
            account_manager: [],
        });
        setFilterQuery({
            ...filterQuery,
            siteIds: [],
            publisherIds: [],
            status: [],
            publisherVersion: [],
            accountManager: [],
            liveProduct: [],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    useEffect(() => {
        if (filterQuery?.searchSite) {
            setLocalFilter({
                site: [],
                live_products: [],
                publisher: [],
                status: [],
                version: [],
                account_manager: [],
            });
        }
    }, [filterQuery?.searchSite]);
    return (
        <div>
            <div className="w-[100%] relative flex flex-row-reverse pr-1 bg-red-500">
                <Badge count={getGlobalQueryCount} offset={[-5, 5]} className="absolute top-5" color="#056433">
                    <HiOutlineAdjustmentsHorizontal onClick={() => setShowModal(!showModal)} z={1001} size={32} />
                </Badge>
            </div>
            <PModal
                title={
                    <div className="flex gap-4 items-center">
                        <div>Filter</div>
                        {getCount > 0 && (
                            <div className="flex gap-4 items-center">
                                <div className="w-[80px] py-1 rounded-full bg-[#056433] font-[Roboto] font-[400] text-[white] text-[12px] flex items-center justify-center">{getCount} Selected</div>
                                <div
                                    className="text-[14px] cursor-pointer"
                                    onClick={() =>
                                        setLocalFilter({
                                            site: [],
                                            live_products: [],
                                            publisher: [],
                                            status: [],
                                            version: [],
                                            account_manager: [],
                                        })
                                    }
                                >
                                    CLEAR ALL
                                </div>
                            </div>
                        )}
                    </div>
                }
                open={showModal}
                setOpen={setShowModal}
                width="750px"
                bodyStyle={{ height: '500px', overflowY: 'scroll' }}
                className="noscrollbar"
                footer={
                    <div className="flex gap-3 justify-center pb-5 items-center w-full ">
                        <div className="border rounded-3xl border-green-800">
                            <RoundButton light={true} title="Cancel" className={'w-[120px] text-[14px]'} onClick={() => setShowModal(false)} />
                        </div>
                        <div>
                            <RoundButton title="Apply" className="w-[120px]" onClick={onClickSearch} />
                        </div>
                    </div>
                }
            >
                <div className="">
                    <div className="flex ">
                        <div className="w-1/2 ">
                            <Menu mode="inline" onClick={onClickMenuItem} selectedKeys={selectedKeys} className={`bg-transparent sidebar`} style={{ borderInlineEnd: 'none', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '600' }}>
                                {items?.map((itm, index) => {
                                    const data: any = itm;
                                    return (
                                        data && (
                                            <Menu.Item key={data?.key}>
                                                <div className="flex gap-3 items-center">
                                                    <div>{data?.label}</div>
                                                    {data?.key === 'site'
                                                        ? localFilter?.site?.length > 0 && <Badge color="#056433" count={localFilter?.site?.length}></Badge>
                                                        : data?.key === 'live_products'
                                                        ? localFilter?.live_products?.length > 0 && <Badge color="#056433" count={localFilter?.live_products?.length}></Badge>
                                                        : data?.key === 'publisher'
                                                        ? localFilter?.publisher?.length > 0 && <Badge color="#056433" count={localFilter?.publisher?.length}></Badge>
                                                        : data?.key === 'status'
                                                        ? localFilter?.status?.length > 0 && <Badge color="#056433" count={localFilter?.status?.length}></Badge>
                                                        : data?.key === 'version'
                                                        ? localFilter?.version?.length > 0 && <Badge color="#056433" count={localFilter?.version?.length}></Badge>
                                                        : localFilter?.account_manager?.length > 0 && <Badge color="#056433" count={localFilter?.account_manager?.length}></Badge>}
                                                </div>
                                            </Menu.Item>
                                        )
                                    );
                                })}
                            </Menu>
                        </div>
                        <div className="w-1/2 bg-[#eaf2ed] rounded-lg">
                            <div className="w-full searchBox p-4">
                                <Input.Search
                                    placeholder="Search for Sites / Clients"
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            onClickListSearch();
                                        }
                                    }}
                                    size="large"
                                    value={searchInput}
                                    className="h-10 border-none  w-full"
                                    onSearch={onClickListSearch}
                                    enterButton
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </div>
                            <div className="h-[390px] overflow-auto">
                                {currentList?.map((item: any, index: any) => (
                                    <div key={index} className="pl-5 pb-3 flex gap-4 items-center font-[Roboto] font-[500] text-[16px]">
                                        <Checkbox checked={findCheck(item?.value)} className="customCheckBox2" onChange={(e) => onChangeCheckbox(e.target.checked, item?.value)} />
                                        <div className="font-[Roboto]">{item?.title}</div>
                                    </div>
                                ))}
                                {(onboardSiteListLoader || publisherListLoader || prebidVersionListLoader || accountManagerListLoader) && (
                                    <div className="w-full h-[200px] flex justify-center items-center">
                                        <Spin />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </PModal>
        </div>
    );
};

export default FilterOnBoarding;
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const liveProductsList = [
    { title: 'Adoptimization', value: 1 },
    { title: 'Subscription', value: 2 },
    { title: 'CrowdFunding', value: 3 },
    { title: 'Quickshop', value: 4 },
    { title: 'AdBlock Recovery', value: 5 },
];

const statusList = [
    { title: 'Active', value: 'Y' },
    // { title: 'In-Active', value: 'N' },
    // { title: 'Delete', value: 'D' },
    { title: 'On Hold', value: 'H' },
    // { title: 'Archive', value: 'AR' },
];
