import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/RootReducer';
import PTable from '../../../common/Table';
import CommonDropDown from '../../../common/CommonDropDown';
import PNormalInput from '../../../common/NormalInput';
import { RoundButton } from '../../../common/Button';
import NetworkSettingAction from './redux/actions';
import Apis from '../../../../api';
import MessageActions from '../../../message/redux/actions';
import { RenderAliasData } from './utils/modulerComponents';
import FilterOnSiteSize from '../NetwrokUpload/components/Models/filter';

const NetwrokSettings = () => {
    const dispatch = useDispatch();
    const [networkId, setNetworkId] = useState('');
    const networkListLoading = useSelector((state: RootState) => state.networkSetting.networkSettingAllNetworksLoader);
    const networkList = useSelector((state: RootState) => state.networkSetting.networkSettingAllNetworks);

    const networkSitesLoading = useSelector((state: RootState) => state.networkSetting.networkSettingAllSitesLoader);
    const networkSite = useSelector((state: RootState) => state.networkSetting.networkSettingAllSites);

    const networkSizesLoading = useSelector((state: RootState) => state.networkSetting.networkSettingAllSizesLoader);
    const networkSizes = useSelector((state: RootState) => state.networkSetting.networkSettingAllSize);

    const networkSiteSizeTable = useSelector((state: RootState) => state.networkSetting.networkSettingSiteSizeTable);
    const networkSiteSizeTableLoader = useSelector((state: RootState) => state.networkSetting.networkSettingSiteSizeTableLoader);

    const [filterQuery, setFilterQuery] = useState<{
        searchSite?: string;
        siteIds?: any;
    }>({
        searchSite: '',
        siteIds: [],
    });
    const [customSiteData, setCustomSiteData] = useState<{
        site?: string;
        siteAlias?: string;
        btnLoader?: boolean;
    }>({
        site: undefined,
        siteAlias: '',
        btnLoader: false,
    });

    const [customSizeData, setCustomSizeData] = useState<{
        size: string;
        sizeAlias: string;
        btnLoader?: boolean;
    }>({
        size: '',
        sizeAlias: '',
        btnLoader: false,
    });

    const onChangeSelect = (value: string) => {
        setNetworkId(value);
    };

    const column1 = [
        {
            title: 'Site',
            dataIndex: 'site_name',
        },
        {
            title: 'Site Alias On Network',
            dataIndex: 'site_alias',
            render: (text: any, row?: any) => {
                return (
                    <div>
                        <RenderAliasData text={text} row={row} type="site" globalSiteId={customSiteData?.site} />
                    </div>
                );
            },
        },
    ];

    const column2 = [
        {
            title: 'Size',
            dataIndex: 'size_name',
        },
        {
            title: 'Size Alias On Network',
            dataIndex: 'size_alias',
            render: (text: any, row?: any) => {
                return (
                    <div>
                        <RenderAliasData text={text} row={row} type="size" globalSiteId={customSiteData?.site} />
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(NetworkSettingAction.fetchNetworkSettingNetworkList());
        dispatch(NetworkSettingAction.fetchNetworkSettingSites());
        dispatch(NetworkSettingAction.fetchNetworkSettingSizes());
    }, [dispatch]);

    useEffect(() => {
        if (networkId && customSiteData?.site) {
            dispatch(
                NetworkSettingAction.fetchNetworkSettingSiteSizeTable({
                    id: networkId,
                    site_id: customSiteData?.site,
                }),
            );
        }
    }, [dispatch, networkId, customSiteData?.site]);

    const handleOnClickAddSite = () => {
        const payload = {
            network_id: networkId,
            site_alias: customSiteData?.siteAlias,
            site_id: customSiteData?.site,
        };
        if (networkId && customSiteData?.siteAlias && customSiteData?.site) {
            setCustomSiteData({ ...customSiteData, btnLoader: true });
            Apis.networkSettingAddSites(payload)
                .then(() => {
                    setCustomSiteData({ ...customSiteData, btnLoader: false });
                    dispatch(MessageActions.showMessage({ text: `Site added successfully!`, error: false }));
                    if (networkId && customSiteData?.site) {
                        dispatch(
                            NetworkSettingAction.fetchNetworkSettingSiteSizeTable({
                                id: networkId,
                                site_id: customSiteData?.site,
                            }),
                        );
                    }
                })
                .catch((err) => {
                    setCustomSiteData({ ...customSiteData, btnLoader: false });
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                });
        }
    };

    const handleOnClickAddSize = () => {
        const payload = {
            network_id: networkId,
            size_alias: customSizeData?.sizeAlias,
            size_id: customSizeData?.size,
        };
        if (networkId && customSizeData?.sizeAlias && customSizeData?.size) {
            setCustomSizeData({ ...customSizeData, btnLoader: true });
            Apis.networkSettingAddSize(payload)
                .then(() => {
                    setCustomSizeData({ ...customSizeData, btnLoader: false });
                    dispatch(MessageActions.showMessage({ text: `Size added successfully!`, error: false }));
                    if (networkId && customSiteData?.site) {
                        dispatch(
                            NetworkSettingAction.fetchNetworkSettingSiteSizeTable({
                                id: networkId,
                                site_id: customSiteData?.site,
                            }),
                        );
                    }
                })
                .catch((err) => {
                    setCustomSizeData({ ...customSizeData, btnLoader: false });
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                });
        }
    };

    return (
        <div className="pt-2 pb-4 w-full">
            <div className="flex justify-between">
                <p className="w-[100%] roboto-medium leading-7 text-2xl">Network Upload Settings</p>
            </div>
            <div className="flex gap-5 items-end">
                <div className="flex justify-between">
                    <div className="mt-5">
                        <div className="w-[250px]" id="selectNetwork">
                            <Select
                                placeholder="Select Network"
                                loading={networkListLoading}
                                onChange={onChangeSelect}
                                size="large"
                                optionFilterProp="children"
                                className="w-full"
                                showSearch
                                options={networkList.map((d) => {
                                    return { value: d.id, label: d.network_name };
                                })}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-[250px] w-[250px]">
                    <CommonDropDown
                        value={customSiteData?.site}
                        title="Add Site"
                        dataList={networkSite}
                        placeholder="Add Site"
                        loader={networkSitesLoading}
                        setValue={(e: any) =>
                            setCustomSiteData({
                                ...customSiteData,
                                site: e,
                            })
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 mt-5 border-t">
                <div className="pr-2 border-r">
                    <div className="flex flex-wrap gap-4 py-3 items-end ">
                        {/* <div className='max-w-[250px] w-[250px]'>
                                   <CommonDropDown
                                        value={customSiteData?.site}
                                        title='Add Site'
                                        dataList={networkSite}
                                        loader={networkSitesLoading}
                                        setValue={(e: any) => setCustomSiteData({
                                             ...customSiteData,
                                             site: e
                                        })}
                                   />
                              </div> */}
                        <div className="max-w-[230px] w-[230px]">
                            <PNormalInput
                                title="Enter Site Alias"
                                name="site_alias"
                                onChange={(e: any) =>
                                    setCustomSiteData({
                                        ...customSiteData,
                                        siteAlias: e.value,
                                    })
                                }
                                value={customSiteData?.siteAlias}
                            />
                        </div>
                        <div className="max-w-[90px]">
                            <div className="rounded-3xl border border-green-800">
                                <RoundButton light={true} title="Add" className="w-full" onClick={handleOnClickAddSite} loading={customSiteData?.btnLoader} />
                            </div>
                        </div>
                    </div>
                    <PTable columns={column1} className="dashboard_table" data={networkSiteSizeTable?.sites || []} loading={networkSiteSizeTableLoader} pagination={{ isShow: true }} />
                </div>
                <div className="pl-2 border-l">
                    <div className="flex flex-wrap gap-4 py-3 items-end">
                        <div className="max-w-[250px] w-[220px]">
                            <CommonDropDown
                                title="Add Size"
                                value={customSizeData?.size}
                                dataList={networkSizes}
                                loader={networkSizesLoading}
                                setValue={(e: any) =>
                                    setCustomSizeData({
                                        ...customSizeData,
                                        size: e,
                                    })
                                }
                            />
                        </div>
                        <div className="max-w-[230px] w-[220px]">
                            <PNormalInput
                                title="Enter Size Alias"
                                name="site_alias"
                                onChange={(e: any) =>
                                    setCustomSizeData({
                                        ...customSizeData,
                                        sizeAlias: e.value,
                                    })
                                }
                                value={customSizeData?.sizeAlias}
                            />
                        </div>
                        <div className="max-w-[90px]">
                            <div className="rounded-3xl border border-green-800">
                                <RoundButton light={true} title="Add" className="w-full" onClick={handleOnClickAddSize} />
                            </div>
                        </div>
                        {/* <FilterOnSiteSize setFilterQuery={setFilterQuery} filterQuery={filterQuery} /> */}
                    </div>
                    <PTable columns={column2} className="dashboard_table" data={networkSiteSizeTable?.sizes || []} loading={networkSiteSizeTableLoader} pagination={{ isShow: true }} />
                </div>
            </div>
        </div>
    );
};

export default NetwrokSettings;
