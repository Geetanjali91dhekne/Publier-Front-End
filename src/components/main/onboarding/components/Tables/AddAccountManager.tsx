import { Drawer, Radio, RadioChangeEvent, Spin } from 'antd';
import React, { useState } from 'react';
import { RoundButton } from '../../../../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/RootReducer';
import Apis from '../../../../../api';
import MessageActions from '../../../../message/redux/actions';
import OnboardActions from '../../redux/actions';

type Props = {
    siteId: string;
    activeType: string;
    filterQuery?: any;
};

const AddAccountManager: React.FC<Props> = ({ siteId, activeType, filterQuery }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | undefined>(undefined);
    const [isValidate, setValidate] = useState(false);
    const [apiLoading, setLoading] = useState(false);

    const accountList = useSelector((state: RootState) => state.onboarding.accountManagerList);
    const loading = useSelector((state: RootState) => state.onboarding.onboardAccountManagerListLoader);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    const onClose = () => {
        setValue(undefined);
        setOpen(false);
        setValidate(false);
        setLoading(false);
    };

    const onClickSave = () => {
        setValidate(true);
        if (!value || value === '') {
            return;
        }
        setValidate(false);
        setLoading(true);
        Apis.saveAccountManager({
            site_id: siteId,
            account_manager_id: value,
        })
            .then(() => {
                dispatch(MessageActions.showMessage({ text: 'Account Manager added successfully!', error: false }));
                onClose();
                if (activeType === 'site') {
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
                if (activeType === 'recent') {
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

                if (activeType === 'favorites') {
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
                if (activeType === 'archive') {
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
                dispatch(MessageActions.showMessage({ text: String(err), error: true }));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="w-fit text-[#056433] bg-[#dceee2] text-[13px] rounded-lg px-3 py-[5px] cursor-pointer" onClick={() => setOpen(true)}>
                + Add Account Manager
            </div>
            <Drawer open={open} width={750} onClose={onClose} closeIcon={null} closable={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                <div>
                    <div className="py-8 mx-8 flex justify-between items-center">
                        <div className="font-[Roboto] font-[700] text-[20px]">Select Account Manager</div>
                        <div className="flex gap-5 items-center">
                            <div className="border rounded-3xl border-green-800">
                                <RoundButton light={true} title="Cancel" className={'w-[100px] text-[14px]'} onClick={onClose} />
                            </div>
                            <div>
                                <RoundButton loading={apiLoading} title="Save" className="w-[100px]" onClick={onClickSave} />
                            </div>
                        </div>
                    </div>
                    {isValidate && (!value || value === '') && <span className="common_error mx-4">Please select account manager</span>}
                    {!loading && (
                        <div>
                            {accountList?.map((item: any, index: number) => (
                                <div className="mt-4 mx-4 p-4 h-[90px] flex flex-col items-start bg-[#F6F9F7]" key={`account_manager_${index}_${item.publisher_id}`}>
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Radio value={item.publisher_id}>
                                            <p className="font-normal roboto text-[16px]">{item?.full_name || item?.email}</p>
                                        </Radio>
                                        <p className="ml-6 mt-2 font-normal roboto text-[16px] text-[#056433]">{`${item?.website} Sites`}</p>
                                    </Radio.Group>
                                </div>
                            ))}
                        </div>
                    )}
                    {loading && (
                        <div className="flex justify-center items-center pt-4">
                            <Spin />
                        </div>
                    )}
                </div>
            </Drawer>
        </>
    );
};

export default AddAccountManager;
