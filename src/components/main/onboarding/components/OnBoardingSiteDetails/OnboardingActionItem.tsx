import { Drawer, Dropdown, MenuProps } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import ThreeDots from '../../../../../assets/icons/onboarding/threeDots.png';
import SiteThirdPage from '../CreateSites/SiteThirdPage';
import { RoundButton } from '../../../../common/Button';
import Apis from '../../../../../api';
import { useDispatch } from 'react-redux';
import MessageActions from '../../../../message/redux/actions';
import PModal from '../../../../common/Modal';
import OnboardActions from '../../redux/actions';
import EditPublisherPage from '../CreateSites/EditPublisherPage';

type Props = {
    rowData?: any;
    currentTab?: any;
    filterQuery?: any;
};
const OnboardingActionItem: React.FC<Props> = ({ rowData, currentTab, filterQuery }) => {
    const dispatch = useDispatch();
    const submitRef = useRef<any>();
    const submitPublisherRef = useRef<any>();
    const [modalData, setModalData] = useState<{
        open: boolean;
        btnLoader: boolean;
        actionType: string;
    }>({
        open: false,
        btnLoader: false,
        actionType: '',
    });
    const [data, setData] = useState<{
        open?: boolean;
        actionType: string;
    }>({
        open: false,
        actionType: '',
    });

    let items: MenuProps['items'] = useMemo(() => {
        let list: any = [
            {
                key: 'Edit Site',
                label: 'Edit Site',
            },
            {
                key: 'Edit Publisher',
                label: 'Edit Publisher',
            },
        ];
        if (currentTab === 'archive') {
            list.push({ key: 'Unarchive', label: 'Unarchive' });
        } else {
            if (rowData?.status === 'AR') {
                list.push({ key: 'Unarchive', label: 'Unarchive' });
            } else {
                list.push({ key: 'Archive', label: 'Archive' });
            }
        }

        if (rowData?.status === 'Y') {
            list.push({
                key: 'Status',
                label: 'Status(Active)',
                children: [{ key: 'Inactive', label: 'Make Inactive' }],
            });
        }
        if (rowData?.status === 'N') {
            list.push({
                key: 'Status',
                label: 'Status(Inactive)',
                children: [{ key: 'Active', label: 'Make Active' }],
            });
        }

        return currentTab === 'siteDetails' ? list.filter((item: any) => item.key !== 'Archive') : list;
    }, [currentTab, rowData]);

    const onMenuClick: MenuProps['onClick'] = (e) => {
        const key = e.key;
        switch (key) {
            case 'Edit Site':
                setData({ open: true, actionType: 'Edit Site' });
                break;
            case 'Edit Publisher':
                setData({ open: true, actionType: 'Edit Publisher' });
                break;
            case 'Put on Hold':
                setModalData({ open: true, actionType: 'Put on Hold', btnLoader: false });
                break;
            case 'Inactive':
                setModalData({ open: true, actionType: 'Inactive', btnLoader: false });
                break;
            case 'Active':
                setModalData({ open: true, actionType: 'Active', btnLoader: false });
                break;
            case 'Archive':
                setModalData({ open: true, actionType: 'Archive', btnLoader: false });
                break;
            case 'Unarchive':
                setModalData({ open: true, actionType: 'Unarchive', btnLoader: false });
                break;
            default:
                setData({ open: false, actionType: '' });
                setModalData({ open: false, actionType: '', btnLoader: false });
                break;
        }
    };

    const handleStatusChange = (value: string, ID?: any) => {
        if (ID && value) {
            setModalData({ ...modalData, btnLoader: true });
            Apis.updateSiteStatusOnboardApi({
                site_id: ID,
                status: value,
            })
                .then(() => {
                    dispatch(MessageActions.showMessage({ text: `Status updated successfully!`, error: false }));
                    if (currentTab === 'site') {
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
                    }
                    if (currentTab === 'recent') {
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
                    }

                    if (currentTab === 'favorites') {
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
                    }
                    if (currentTab === 'archive') {
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
                    }
                })
                .catch((err) => {
                    dispatch(MessageActions.showMessage({ text: 'Something went wrong', error: true }));
                })
                .finally(() => setModalData({ open: false, actionType: '', btnLoader: false }));
        }
    };
    const component = useMemo(() => {
        switch (data?.actionType) {
            case 'Edit Site':
                return <SiteThirdPage ID={rowData?.site_id} submitRef={submitRef} setData={setData} currentTab={currentTab} filterQuery={filterQuery} />;
            case 'Edit Publisher':
                return <EditPublisherPage currentTab={currentTab} filterQuery={filterQuery} ID={rowData?.pub_main_id} submitRef={submitPublisherRef} setData={setData} />;
            default:
                return null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.actionType, rowData]);

    const handleSave = () => {
        if (data?.actionType === 'Edit Site') {
            submitRef?.current?.onClickCreateEditSite();
        }
        if (data?.actionType === 'Edit Publisher') {
            submitPublisherRef?.current?.onClickCreateEditPublisher();
        }
    };
    return (
        <>
            <Dropdown
                menu={{
                    items,
                    onClick: onMenuClick,
                }}
                placement="bottomLeft"
                trigger={['click']}
                overlayClassName="common_dropdown"
                //disabled={items.length === 0}
            >
                <img className="w-[28px] h-[28px]" src={ThreeDots} alt="icon"></img>
            </Dropdown>

            <Drawer open={data?.open} width={750} onClose={() => setData({ ...data, open: false })} closeIcon={null} closable={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                <div className="px-8">
                    <div className="flex items-center justify-between pt-9 sticky top-0 z-50 bg-white pb-4">
                        <div className="font-[700] font-[Roboto] text-[20px]">{data?.actionType === 'Edit Site' ? `Edit Site(${rowData?.site_name})` : 'Edit Publisher'}</div>
                        <div className="flex justify-between">
                            <div className="mr-4 border rounded-3xl border-green-800">
                                <RoundButton light={true} onClick={() => setData({ actionType: '', open: false })} title="Cancel" className="w-[136px] h-[40px] text-[14px]" />
                            </div>
                            <div>{<RoundButton onClick={handleSave} title={'Save'} className="w-[136px] h-[40px] text-[14px]" />}</div>
                        </div>
                    </div>
                    <div className="mt-4">{component}</div>
                </div>
            </Drawer>
            <PModal
                title={modalData?.actionType === 'Archive' ? 'Archive' : modalData?.actionType === 'Unarchive' ? 'Unarchive' : modalData?.actionType === 'Active' ? 'Active' : 'Inactive'}
                open={modalData?.open}
                setOpen={(e) => setModalData({ ...modalData, open: e })}
                width="400px"
                bodyStyle={{ height: '60px', overflowY: 'scroll' }}
                className="noscrollbar"
                footer={
                    <div className="flex gap-3 justify-center pb-5 items-center w-full ">
                        <div className="border rounded-3xl border-green-800">
                            <RoundButton light={true} title="Cancel" className={'w-[120px] text-[14px]'} onClick={() => setModalData({ open: false, btnLoader: false, actionType: '' })} />
                        </div>
                        <div>
                            <RoundButton
                                title="Ok"
                                className="w-[120px]"
                                onClick={() => {
                                    if (modalData?.actionType === 'Archive') {
                                        handleStatusChange('AR', rowData?.site_id);
                                    } else if (modalData?.actionType === 'Unarchive' || modalData?.actionType === 'Active') {
                                        handleStatusChange('Y', rowData?.site_id);
                                    } else {
                                        handleStatusChange('N', rowData?.site_id);
                                    }
                                }}
                                loading={modalData?.btnLoader}
                            />
                        </div>
                    </div>
                }
            >
                <div className="font-[600] font-[Roboto] ml-2">Do you wants to perform this action?</div>
            </PModal>
        </>
    );
};

export default OnboardingActionItem;
