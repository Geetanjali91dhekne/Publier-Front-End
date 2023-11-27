import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralTask from './GeneralTask';
import AdOptimizationTask from './AdOptimizationTask';
import SubscriptionTask from './SubscriptionTask';
import CrowdFundingTask from './CrowdFundingTask';
import QuickShopTask from './QuickShopTask';
import AdblockRecoveryTask from './AdblockRecoveryTask';
import { Progress, Select, Spin } from 'antd';
import adOptIconActive from '../../../../../assets/icons/onboarding/SBAdopt.svg';
import CrowdFundActive from '../../../../../assets/icons/onboarding/SBcrowdFund.svg';
import SubscriptionIconActive from '../../../../../assets/icons/onboarding/SBSubscription.svg';
import QuickShopIconActive from '../../../../../assets/icons/onboarding/SBquickshop.svg';
import AdBlockRecoveryIconActive from '../../../../../assets/icons/onboarding/SBadbrecovery.svg';

import AdoptIconInactive from '../../../../../assets/icons/onboarding/adoptInActive.svg';
import SubscriptionIconInactive from '../../../../../assets/icons/onboarding/subscriptionInActive.svg';
import CrowdFundInactive from '../../../../../assets/icons/onboarding/crowdfundInActive.svg';
import QuickShopIconInactive from '../../../../../assets/icons/onboarding/quickshopInActive.svg';
import AdBlockRecoveryIconInactive from '../../../../../assets/icons/onboarding/adRecoveryInActive.svg';
import OnboardingActionItem from './OnboardingActionItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/RootReducer';
import OnboardActions from '../../redux/actions';
import { BsDot } from 'react-icons/bs';
import { HEADERMENU_PATH } from '../../../../../routes/RoutesURL';

const OnBoardingSiteDetails: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const siteData = useSelector((state: RootState) => state?.onboarding?.onboardingGetSiteDetails);
    const GeneralTabDataLoader = useSelector((state: RootState) => state.onboarding.onboardingGeneralTabDetailsLoader);
    const dispatch = useDispatch();

    const [active, setActive] = useState<{
        adOpt: boolean;
        subscription: boolean;
        crowdFund: boolean;
        quickShop: boolean;
        adblockRecovery: boolean;
    }>({
        adOpt: true,
        subscription: true,
        crowdFund: false,
        quickShop: false,
        adblockRecovery: false,
    });

    const id = params.siteId;

    useEffect(() => {
        if (id) {
            dispatch(OnboardActions.fetchOnboardGetSiteDetails(id));
        }
    }, [dispatch, id]);

    return (
        <div className="mx-5  relative">
            <div className={GeneralTabDataLoader ? 'opacity-50' : ''}>
                {/* header */}
                <div>
                    <div className="flex gap-3 items-center">
                        <div className="bg-[#C2D9CD] w-[60px] flex justify-center items-center text-[14px] font-[500] py-2 px-3 rounded-lg cursor-pointer" onClick={() => navigate(-1)}>
                            Back
                        </div>
                        <div className="font-[700] text-[16px]">{`${siteData?.publisher_details?.full_name || ''}(${siteData?.publisher_details?.publisher_sites.length || ''} Sites)`}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="pt-5">
                            <div className="flex items-center gap-2 mb-2">
                                <div>
                                    {siteData?.publisher_details?.publisher_sites?.length === 1 ? (
                                        <div className="font-[Roboto] font-[500] text-[16px]">{siteData.publisher_details.publisher_sites[0].site_name}</div>
                                    ) : (
                                        <Select
                                            value={siteData?.publisher_details?.publisher_sites?.find((d: { site_id: any }) => String(d.site_id) === id)?.site_name}
                                            options={siteData?.publisher_details?.publisher_sites?.map((d: { site_id: any; site_name: any }) => {
                                                return { value: d.site_id, label: d.site_name };
                                            })}
                                            onChange={(e) => {
                                                navigate(`${HEADERMENU_PATH.onboarding}/${e}`);
                                            }}
                                            className="ant-custom-select w-[200px]"
                                        />
                                    )}
                                </div>
                                <OnboardingActionItem rowData={{ site_id: id, publisher_id: 'PR1623255287513', status: siteData?.status }} currentTab={'siteDetails'} />
                            </div>
                            <div className="text-[#056433] text-[14px] font-[Roboto] font-[400] mt-1">{`${siteData?.publisher_details?.business_name || siteData?.publisher_details?.full_name || ''} . ${siteData?.site_url || ''} . ${siteData?.publisher_details?.email || ''
                                }`}</div>
                            <div className="flex items-center">
                                <span className="font-[700] text-[12px] text-[#A0A0A0] font-[Roboto]">
                                    Joined on: <span className="font-[400]">{siteData?.joined_on || ''} </span>
                                </span>
                                <span className="font-[700] text-[12px] text-[#A0A0A0] font-[Roboto]">
                                    {' '}
                                    <BsDot />{' '}
                                </span>
                                <span className="font-[700] text-[12px] text-[#A0A0A0] font-[Roboto]">
                                    Went Live on: <span className="font-[400]">{siteData?.went_live_on || ''}</span>
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-[700] text-[12px] text-[#A0A0A0] font-[Roboto]">
                                    Current Status:{' '}
                                    <span className="font-[400]">
                                        {siteData?.publisher_details?.status === 'Y' && <span>Active</span>}
                                        {siteData?.publisher_details?.status === 'N' && <span>Inactive</span>}
                                        {siteData?.publisher_details?.status === 'D' && <span>Delete</span>}
                                        {siteData?.publisher_details?.status === 'H' && <span>On Hold</span>}
                                        {siteData?.publisher_details?.status === 'AR' && <span>Archive</span>}
                                    </span>
                                </span>
                                <span className="font-[700] text-[12px] text-[#A0A0A0] font-[Roboto]">
                                    {' '}
                                    <BsDot />{' '}
                                </span>
                                <span className="font-[700] text-[12px] text-[#A0A0A0] font-[Roboto]">
                                    Seller ID: <span className="font-[400]">{siteData?.seller_data?.seller_id || ''} </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-8 p-8 bg-[#F9F9F9] items-center">
                            {/* <div className="flex flex-col items-center font-[Roboto] font-[500] text-[12px]">
                                <Progress
                                    type="circle"
                                    strokeColor={'#056433'}
                                    percent={(3 / 4) * 100}
                                    width={50}
                                    format={() => (
                                        <div className="flex items-center justify-center">
                                            <div className={'rounded-full w-[44px] h-[44px] flex items-center justify-center bg-[#C2D9CD]'}>
                                                <img width={'50%'} src={adOptIconActive} alt="icon"></img>
                                            </div>
                                        </div>
                                    )}
                                />
                                <div className="mt-3">General</div>
                                <div>3/4</div>
                            </div> */}

                            <div className="flex flex-col items-center font-[Roboto] font-[500] text-[12px]">
                                {active?.adOpt ? (
                                    <Progress
                                        type="circle"
                                        strokeColor={'#056433'}
                                        percent={(8 / 11) * 100}
                                        width={50}
                                        format={() => (
                                            <div className="flex items-center justify-center">
                                                <div className={'rounded-full w-[44px] h-[44px] flex items-center justify-center bg-[#C2D9CD]'}>
                                                    <img width={'50%'} src={adOptIconActive} alt="icon"></img>
                                                </div>
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <div className={'rounded-full w-[50px] h-[50px] flex items-center justify-center bg-[#F9F9F9]'}>
                                            <img width={'50%'} src={AdoptIconInactive} alt="icon"></img>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">Ad Optimization</div>
                                <div>{active?.adOpt ? '8/11' : '-NA-'}</div>
                            </div>

                            <div className="flex flex-col items-center font-[Roboto] font-[500] text-[12px]">
                                {active?.subscription ? (
                                    <Progress
                                        type="circle"
                                        strokeColor={'#056433'}
                                        percent={(3 / 5) * 100}
                                        width={50}
                                        format={() => (
                                            <div className="flex items-center justify-center">
                                                <div className={'rounded-full w-[44px] h-[44px] flex items-center justify-center bg-[#C2D9CD]'}>
                                                    <img width={'50%'} src={SubscriptionIconActive} alt="icon"></img>
                                                </div>
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <div className={'rounded-full w-[50px] h-[50px] flex items-center justify-center bg-[#F9F9F9]'}>
                                            <img width={'50%'} src={SubscriptionIconInactive} alt="icon"></img>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">Subscription</div>
                                <div>{active?.subscription ? '3/5' : '-NA-'}</div>
                            </div>

                            <div className="flex flex-col items-center font-[Roboto] font-[500] text-[12px]">
                                {active?.crowdFund ? (
                                    <Progress
                                        type="circle"
                                        strokeColor={'#056433'}
                                        percent={0}
                                        width={50}
                                        format={() => (
                                            <div className="flex items-center justify-center">
                                                <div className={'rounded-full w-[44px] h-[44px] flex items-center justify-center bg-[#C2D9CD]'}>
                                                    <img width={'50%'} src={CrowdFundActive} alt="icon"></img>
                                                </div>
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <div className={'rounded-full w-[50px] h-[50px] flex items-center justify-center bg-[#F9F9F9]'}>
                                            <img width={'100%'} src={CrowdFundInactive} alt="icon"></img>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">Crowd Funding</div>
                                <div>{active?.crowdFund ? '0/3' : '-NA-'}</div>
                            </div>

                            <div className="flex flex-col items-center font-[Roboto] font-[500] text-[12px]">
                                {active?.quickShop ? (
                                    <Progress
                                        type="circle"
                                        strokeColor={'#056433'}
                                        percent={0}
                                        width={50}
                                        format={() => (
                                            <div className="flex items-center justify-center">
                                                <div className={'rounded-full w-[44px] h-[44px] flex items-center justify-center bg-[#C2D9CD]'}>
                                                    <img width={'50%'} src={QuickShopIconActive} alt="icon"></img>
                                                </div>
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <div className={'rounded-full w-[50px] h-[50px] flex items-center justify-center bg-[#F9F9F9]'}>
                                            <img width={'100%'} src={QuickShopIconInactive} alt="icon"></img>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">QuickShop</div>
                                <div>{active?.quickShop ? '0/3' : '-NA-'}</div>
                            </div>

                            <div className="flex flex-col items-center font-[Roboto] font-[500] text-[12px]">
                                {active?.adblockRecovery ? (
                                    <Progress
                                        type="circle"
                                        strokeColor={'#056433'}
                                        percent={0}
                                        width={50}
                                        format={() => (
                                            <div className="flex items-center justify-center">
                                                <div className={'rounded-full w-[44px] h-[44px] flex items-center justify-center bg-[#C2D9CD]'}>
                                                    <img width={'50%'} src={AdBlockRecoveryIconActive} alt="icon"></img>
                                                </div>
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <div className={'rounded-full w-[50px] h-[50px] flex items-center justify-center bg-[#F9F9F9]'}>
                                            <img width={'100%'} src={AdBlockRecoveryIconInactive} alt="icon"></img>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">Ad Recovery</div>
                                <div>{active?.adblockRecovery ? '0/2' : '-NA-'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks */}
                <div className="border-t border-[lightgray] mt-8">
                    {/* General Tasks */}
                    <GeneralTask siteData={siteData} />

                    {/* Ad Optimization Tasks */}
                    <AdOptimizationTask active={active} setActive={setActive} />

                    {/* Subscription Tasks */}
                    <SubscriptionTask active={active} setActive={setActive} />

                    {/* CrowdFunding Tasks */}
                    <CrowdFundingTask active={active} setActive={setActive} />

                    {/* QuickShop Tasks  */}
                    <QuickShopTask active={active} setActive={setActive} />

                    {/* AdBlock Recovery Tasks */}
                    <AdblockRecoveryTask active={active} setActive={setActive} />
                </div>
            </div>
            {GeneralTabDataLoader && (
                <div className="absolute top-0 w-full flex justify-center items-center h-[100vh]">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default OnBoardingSiteDetails;
