import { Checkbox, Radio, Spin } from 'antd';
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PNormalInput from '../../../../common/NormalInput';
import CommonDropDown from '../../../../common/CommonDropDown';
import TextArea from 'antd/es/input/TextArea';
import { ThirdPageState } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/RootReducer';
import OnboardActions from '../../redux/actions';
import Apis from '../../../../../api';
import MessageActions from '../../../../message/redux/actions';
import { useNavigate } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../routes/RoutesURL';
import { isEmail } from '../../../../../utils/Validation';

type Props = {
    ID?: any;
    submitRef?: any;
    setData?: any;
    currentTab?: any;
    filterQuery?: any;
    publisherPrev?: any;
};

const SiteThirdPage: React.FC<Props> = ({ ID, submitRef, setData, currentTab, filterQuery, publisherPrev }) => {
    const refScroll = useRef<any>([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isValidate, setValidate] = useState(false);
    const publisherList = useSelector((state: RootState) => state?.onboarding?.onboardPublisherList);
    const accountManagerList = useSelector((state: RootState) => state?.onboarding?.onboardAccountManagerList);
    const prebidList = useSelector((state: RootState) => state?.onboarding?.onboardPrebidList);
    const siteData = useSelector((state: RootState) => state?.onboarding?.onboardingGetSiteDetails);
    const navigate = useNavigate();
    const [thirdPageData, setThirdPageData] = useState<ThirdPageState>({
        info: {
            siteStatus: 'N',
            siteId: '',
            oldSiteId: '',
            siteName: '',
            siteUrl: '',
            publisher: publisherPrev || '',
            showImpData: false,
            accountManager: '',
        },
        products: {
            adOptimization: false,
            subscription: false,
            crowdFunding: false,
            quickShop: false,
            adBlockRecovery: false,
        },
        integration: {
            wordPressPlugin: 'N',
            jsCode: 'N',
            reactPlugin: 'N',
            trackPageViews: false,
            trackClicks: false,
        },
        prebid: {
            version: '',
            timeOut: '',
            failSafe: '',
            id5Id: '',
            liveRamp: '',
            stickyMode: false,
            debugMode: false,
            disableInitMode: false,
            restUrl: '',
            gdpr: false,
        },
        amazonBidding: {
            amazonHb: false,
            taxonomy: false,
            pubId: '',
            adServer: '',
            googleAds: false,
        },
        s3: {
            ownS3: false,
            accessKey: '',
            secretKey: '',
            bucketName: '',
            cloudflareEmail: '',
            cloudflareAuth: '',
        },
        seller: {
            sellerStatus: false,
            sellerType: 'PUBLISHER',
            sellerDomain: '',
            sellerId: '',
            sellerName: '',
        },
        report: {
            email: false,
        },
    });

    useEffect(() => {
        if (ID) {
            dispatch(OnboardActions.fetchOnboardGetSiteDetails(ID));
        }
    }, [dispatch, ID]);

    useEffect(() => {
        if (ID && siteData) {
            setThirdPageData({
                info: {
                    siteStatus: siteData?.status || 'N',
                    siteId: siteData?.site_id,
                    oldSiteId: siteData?.old_site_id,
                    siteName: siteData?.site_name,
                    siteUrl: siteData?.site_url,
                    publisher: siteData?.publisher_id,
                    showImpData: siteData?.show_impressions_data === 'N' ? false : true,
                    accountManager: siteData?.account_manager_id,
                },
                products: {
                    adOptimization: siteData?.publir_products?.includes('1') ? true : false,
                    subscription: siteData?.publir_products?.includes('2') ? true : false,
                    crowdFunding: siteData?.publir_products?.includes('3') ? true : false,
                    quickShop: siteData?.publir_products?.includes('4') ? true : false,
                    adBlockRecovery: siteData?.publir_products?.includes('5') ? true : false,
                },
                integration: {
                    wordPressPlugin: siteData?.integrated_wp_plugin,
                    jsCode: siteData?.integrated_js_code,
                    reactPlugin: siteData?.react_site,
                    trackPageViews: siteData?.track_page_views === 'N' ? false : true,
                    trackClicks: siteData?.track_clicks === 'N' ? false : true,
                },
                prebid: {
                    version: String(siteData?.prebid_version),
                    timeOut: siteData?.prebid_timeout,
                    failSafe: siteData?.prebid_failsafe,
                    id5Id: siteData?.id5_id,
                    liveRamp: siteData?.liveramp_id,
                    stickyMode: siteData?.sticky_mode_only === 'N' ? false : true,
                    debugMode: siteData?.prebid_debug_mode === 'N' ? false : true,
                    disableInitMode: siteData?.prebid_disable_init_load === 'N' ? false : true,
                    restUrl: siteData?.restricted_urls,
                    gdpr: siteData?.prebid_gdpr === 'N' ? false : true,
                },
                amazonBidding: {
                    amazonHb: siteData?.amazon_hb === 'N' ? false : true,
                    taxonomy: siteData?.taxonomy === 'N' ? false : true,
                    pubId: siteData?.amazon_pub_id,
                    adServer: siteData?.amazon_ad_server,
                    googleAds: siteData?.google_auto_ads === 'N' ? false : true,
                },
                s3: {
                    ownS3: siteData?.pub_own_s3_bucket === 'N' ? false : true,
                    accessKey: siteData?.aws_access_key,
                    secretKey: siteData?.aws_secret_key,
                    bucketName: siteData?.s3_bucket_name,
                    cloudflareEmail: siteData?.cloudflare_auth_email,
                    cloudflareAuth: siteData?.cloudflare_auth_key,
                },
                seller: {
                    sellerStatus: siteData?.seller_data?.seller_json_status === 'N' ? false : true,
                    sellerType: siteData?.seller_data?.seller_type,
                    sellerDomain: siteData?.seller_data?.seller_domain,
                    sellerName: siteData?.seller_data?.seller_name,
                    sellerId: siteData?.seller_data?.seller_id,
                },
                report: {
                    email: siteData?.email_reports_status === 'N' ? false : true,
                },
            });
        } else {
            setThirdPageData({
                info: {
                    siteStatus: 'N',
                    siteId: '',
                    oldSiteId: '',
                    siteName: '',
                    siteUrl: '',
                    publisher: publisherPrev || '',
                    showImpData: false,
                    accountManager: '',
                },
                products: {
                    adOptimization: false,
                    subscription: false,
                    crowdFunding: false,
                    quickShop: false,
                    adBlockRecovery: false,
                },
                integration: {
                    wordPressPlugin: false,
                    jsCode: false,
                    reactPlugin: false,
                    trackPageViews: false,
                    trackClicks: false,
                },
                prebid: {
                    version: '',
                    timeOut: '',
                    failSafe: '',
                    id5Id: '',
                    liveRamp: '',
                    stickyMode: false,
                    debugMode: false,
                    disableInitMode: false,
                    restUrl: '',
                    gdpr: false,
                },
                amazonBidding: {
                    amazonHb: false,
                    taxonomy: false,
                    pubId: '',
                    adServer: '',
                    googleAds: false,
                },
                s3: {
                    ownS3: false,
                    accessKey: '',
                    secretKey: '',
                    bucketName: '',
                    cloudflareEmail: '',
                    cloudflareAuth: '',
                },
                seller: {
                    sellerStatus: false,
                    sellerType: 'PUBLISHER',
                    sellerDomain: '',
                    sellerId: '',
                    sellerName: '',
                },
                report: {
                    email: false,
                },
            });
        }
    }, [ID, siteData, publisherPrev]);

    const getProductString = () => {
        let arr = [];
        if (thirdPageData?.products?.adOptimization) {
            arr.push(1);
        }
        if (thirdPageData?.products?.subscription) {
            arr.push(2);
        }
        if (thirdPageData?.products?.crowdFunding) {
            arr.push(3);
        }
        if (thirdPageData?.products?.quickShop) {
            arr.push(4);
        }
        if (thirdPageData?.products?.adBlockRecovery) {
            arr.push(5);
        }

        if (arr?.length === 0) {
            return '';
        } else {
            return arr.join(',');
        }
    };

    useImperativeHandle(submitRef, () => ({
        onClickCreateEditSite() {
            setValidate(true);
            if (
                !thirdPageData?.info?.siteName ||
                thirdPageData?.info?.siteName.trim() === '' ||
                !thirdPageData?.info?.siteUrl ||
                thirdPageData?.info?.siteUrl.trim() === '' ||
                !thirdPageData?.info?.publisher ||
                !thirdPageData?.prebid?.version ||
                !thirdPageData?.prebid?.timeOut ||
                thirdPageData?.prebid?.timeOut.trim() === '' ||
                !thirdPageData?.prebid?.failSafe ||
                thirdPageData?.prebid?.failSafe.trim() === '' ||
                //  !thirdPageData?.amazonBidding?.pubId ||
                //  thirdPageData?.amazonBidding?.pubId.trim() === '' ||
                //  !thirdPageData?.amazonBidding?.adServer ||
                //  thirdPageData?.amazonBidding?.adServer.trim() === '' ||
                // !thirdPageData?.seller?.sellerId ||
                // thirdPageData?.seller?.sellerId.trim() === '' ||
                !thirdPageData?.seller?.sellerName ||
                thirdPageData?.seller?.sellerName.trim() === '' ||
                !thirdPageData?.seller?.sellerDomain ||
                thirdPageData?.seller?.sellerDomain.trim() === '' ||
                !thirdPageData?.seller?.sellerType ||
                (thirdPageData?.s3.cloudflareEmail && !isEmail(thirdPageData?.s3.cloudflareEmail.trim()))
            ) {
                return;
            }
            setValidate(false);
            const payload = {
                status: thirdPageData?.info?.siteStatus,
                old_site_id: thirdPageData?.info?.oldSiteId,
                site_name: thirdPageData?.info?.siteName,
                site_url: thirdPageData?.info?.siteUrl,
                publisher_id: thirdPageData?.info?.publisher,
                show_impressions_data: thirdPageData?.info?.showImpData ? 'Y' : 'N',
                account_manager_id: thirdPageData?.info?.accountManager,
                publir_products: getProductString(),
                integrated_wp_plugin: thirdPageData?.integration?.wordPressPlugin,
                integrated_js_code: thirdPageData?.integration?.jsCode,
                react_site: thirdPageData?.integration?.reactPlugin,
                track_page_views: thirdPageData?.integration?.trackPageViews ? 'Y' : 'N',
                track_clicks: thirdPageData?.integration?.trackClicks ? 'Y' : 'N',
                prebid_version: thirdPageData?.prebid?.version,
                prebid_timeout: thirdPageData?.prebid?.timeOut,
                prebid_failsafe: thirdPageData?.prebid?.failSafe,
                id5_id: thirdPageData?.prebid?.id5Id ? thirdPageData?.prebid?.id5Id : '',
                liveramp_id: thirdPageData?.prebid?.liveRamp ? thirdPageData?.prebid?.liveRamp : '',
                sticky_mode_only: thirdPageData?.prebid?.stickyMode ? 'Y' : 'N',
                prebid_debug_mode: thirdPageData?.prebid?.debugMode ? 'Y' : 'N',
                prebid_gdpr: thirdPageData?.prebid?.gdpr ? 'Y' : 'N',
                gam_api_status: 'Y',
                disable_init_load: thirdPageData?.prebid?.disableInitMode ? 'Y' : 'N',
                restricted_urls: thirdPageData?.prebid?.restUrl,
                amazon_pub_id: thirdPageData?.amazonBidding?.pubId,
                amazon_ad_server: thirdPageData?.amazonBidding?.adServer,
                amazon_hb: thirdPageData?.amazonBidding?.amazonHb ? 'Y' : 'N',
                taxonomy: thirdPageData?.amazonBidding?.taxonomy ? 'Y' : 'N',
                google_auto_ads: thirdPageData?.amazonBidding?.googleAds ? 'Y' : 'N',
                pub_own_s3_bucket: thirdPageData?.s3?.ownS3 ? 'Y' : 'N',
                aws_access_key: thirdPageData?.s3?.accessKey,
                aws_secret_key: thirdPageData?.s3?.secretKey,
                s3_bucket_name: thirdPageData?.s3?.bucketName,
                cloudflare_auth_email: thirdPageData?.s3?.cloudflareEmail,
                cloudflare_auth_key: thirdPageData?.s3?.cloudflareAuth,
                seller_id: thirdPageData?.seller?.sellerId,
                seller_name: thirdPageData?.seller?.sellerName,
                seller_domain: thirdPageData?.seller?.sellerDomain,
                seller_type: thirdPageData?.seller?.sellerType,
                seller_json_status: thirdPageData?.seller?.sellerType ? 'Y' : 'N',
                email_reports_status: thirdPageData?.report?.email ? 'Y' : 'N',
            };
            if (ID && siteData) {
                setLoading(true);
                Apis.editSiteOnboardApi(payload, thirdPageData?.info?.siteId)
                    .then(() => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: `Site updated successfully!`, error: false }));
                        setData({ actionType: '', open: false });
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
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            } else {
                setLoading(true);
                Apis.createNewSiteOnboardApi(payload)
                    .then(({ data }) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: `Site Created successfully!`, error: false }));
                        const URL = `${HEADERMENU_PATH.onboarding}/${data.data.site_id}`;
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
                        navigate(URL);
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            }
        },
    }));

    const getIntegrationData = useMemo(() => {
        if (thirdPageData?.integration?.wordPressPlugin === 'Y') {
            return 'WP';
        } else if (thirdPageData?.integration?.jsCode === 'Y') {
            return 'JS';
        } else if (thirdPageData?.integration?.reactPlugin === 'Y') {
            return 'RE';
        }
        return '';
    }, [thirdPageData?.integration]);

    const handleScroll = (value: any) => {
        refScroll.current[value].scrollIntoView();
    };

    return (
        <div className="relative">
            <div className={ID && !siteData ? 'opacity-50' : ''}>
                <div className="mb-5">
                    <CommonDropDown
                        dataList={[
                            { title: 'Site Information', value: 1 },
                            { title: 'Products', value: 2 },
                            { title: 'Integration', value: 3 },
                            { title: 'Prebid Options', value: 4 },
                            { title: 'Activate Amazon Ads', value: 5 },
                            { title: 'Other Settings', value: 6 },
                            { title: 'S3 Bucket Option', value: 7 },
                            { title: 'Manage Sellers JSON', value: 8 },
                            { title: 'Report', value: 9 },
                        ]}
                        setValue={handleScroll}
                        defaultValue={1}
                    />
                </div>
                {/* info */}
                <div ref={(ele) => (refScroll.current[1] = ele)} className="w-full">
                    <div className="bg-[#F6F9F7]  px-5 pt-2 pb-5">
                        <p className="mt-5 pl-1 font-[700] font-[Roboto] text-[14px]">Site Information</p>
                        <div className="flex flex-wrap w-full">
                            <div className="mt-4">
                                <Radio.Group
                                    className="flex gap-5 flex-wrap w-full"
                                    value={thirdPageData?.info?.siteStatus}
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            info: {
                                                ...thirdPageData?.info,
                                                siteStatus: e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <div className="  flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                        <Radio value={'Y'}>
                                            <p className="font-normal roboto text-[16px]">Active</p>
                                        </Radio>
                                    </div>

                                    <div className=" flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                        <Radio value={'N'}>
                                            <p className="font-normal roboto text-[16px]">Inactive</p>
                                        </Radio>
                                    </div>

                                    {currentTab === 'archive' && (
                                        <div className=" flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                            <Radio value={'AR'}>
                                                <p className="font-normal roboto text-[16px]">Archive</p>
                                            </Radio>
                                        </div>
                                    )}
                                </Radio.Group>
                            </div>
                        </div>

                        <div className="mt-5 w-1/2">
                            <PNormalInput
                                title="Site ID"
                                name="nick_name"
                                placeholder="Auto Filled"
                                value={thirdPageData?.info?.siteId}
                                disabled
                                onChange={(e) => {
                                    setThirdPageData({
                                        ...thirdPageData,
                                        info: {
                                            ...thirdPageData?.info,
                                            siteId: e.value,
                                        },
                                    });
                                }}
                            />
                        </div>

                        <div className="mt-5 w-1/2">
                            <PNormalInput
                                title="Old Site ID"
                                name="nick_name"
                                placeholder="Auto Filled"
                                value={thirdPageData?.info?.oldSiteId}
                                disabled
                                onChange={(e) => {
                                    setThirdPageData({
                                        ...thirdPageData,
                                        info: {
                                            ...thirdPageData?.info,
                                            oldSiteId: e.value,
                                        },
                                    });
                                }}
                            />
                        </div>

                        <div className="mt-5 w-1/2">
                            <PNormalInput
                                title={
                                    <div>
                                        Site Name <span className="common_error font-[800]">*</span>
                                    </div>
                                }
                                name="nick_name"
                                placeholder="Enter Site Name"
                                value={thirdPageData?.info?.siteName}
                                onChange={(e: any) => {
                                    setThirdPageData({
                                        ...thirdPageData,
                                        info: {
                                            ...thirdPageData?.info,
                                            siteName: e.value,
                                        },
                                    });
                                }}
                            />
                            {isValidate && (!thirdPageData?.info?.siteName || thirdPageData?.info?.siteName.trim() === '') && <span className="common_error ml-1">Please Enter Site Name</span>}
                        </div>

                        <div className="mt-5 w-1/2">
                            <PNormalInput
                                title={
                                    <div>
                                        Site URL <span className="common_error font-[800]">*</span>
                                    </div>
                                }
                                name="nick_name"
                                placeholder="Enter URL"
                                value={thirdPageData?.info?.siteUrl}
                                onChange={(e: any) => {
                                    setThirdPageData({
                                        ...thirdPageData,
                                        info: {
                                            ...thirdPageData?.info,
                                            siteUrl: e.value,
                                        },
                                    });
                                }}
                            />
                            {isValidate && (!thirdPageData?.info?.siteUrl || thirdPageData?.info?.siteUrl.trim() === '') && <span className="common_error ml-1">Please Enter Site Url</span>}
                        </div>

                        <div className="flex w-full mt-8">
                            <div className="w-1/2 ">
                                <CommonDropDown
                                    title="Select Account Manager"
                                    filterType="Publisher"
                                    value={thirdPageData?.info?.accountManager}
                                    dataList={accountManagerList}
                                    setValue={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            info: {
                                                ...thirdPageData?.info,
                                                accountManager: e,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between mt-5">
                            <div className="w-1/2 ">
                                <CommonDropDown
                                    title={
                                        <div>
                                            Publisher <span className="common_error font-[800]">*</span>
                                        </div>
                                    }
                                    value={thirdPageData?.info?.publisher}
                                    dataList={publisherList}
                                    setValue={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            info: {
                                                ...thirdPageData?.info,
                                                publisher: e,
                                            },
                                        });
                                    }}
                                    disable={publisherPrev && !ID ? true : false}
                                />
                                {isValidate && !thirdPageData?.info?.publisher && <span className="common_error ml-1">Please Select Publisher</span>}
                            </div>

                            <div className=" mt-4 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.info?.showImpData}
                                    className="customCheckBox2"
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            info: {
                                                ...thirdPageData?.info,
                                                showImpData: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Show Impressions Data on Dashboard</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* products */}
                <div ref={(ele) => (refScroll.current[2] = ele)} className=" mt-5">
                    <div className="bg-[#F6F9F7] px-5 pt-2 pb-5">
                        <p className="mt-5 font-[700] font-[Roboto] text-[14px]">Products</p>

                        <div className="flex flex-wrap w-full">
                            <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.products?.adOptimization}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            products: {
                                                ...thirdPageData?.products,
                                                adOptimization: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Ad Optimization</div>
                            </div>

                            <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.products?.subscription}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            products: {
                                                ...thirdPageData?.products,
                                                subscription: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Subscriptions</div>
                            </div>

                            <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.products?.crowdFunding}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            products: {
                                                ...thirdPageData?.products,
                                                crowdFunding: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Crowdfunding</div>
                            </div>

                            <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.products?.quickShop}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            products: {
                                                ...thirdPageData?.products,
                                                quickShop: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Quick Shop</div>
                            </div>

                            <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.products?.adBlockRecovery}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            products: {
                                                ...thirdPageData?.products,
                                                adBlockRecovery: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">AdBlock Recovery</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* integration */}
                <div ref={(ele) => (refScroll.current[3] = ele)} className=" mt-5">
                    <div className="bg-[#F6F9F7] px-5 pt-2 pb-5">
                        <p className="mt-5 font-[700] font-[Roboto] text-[14px]">Integration</p>
                        <div>
                            <div className="mt-4">
                                <Radio.Group
                                    className="flex gap-5 flex-wrap w-full"
                                    value={getIntegrationData}
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            integration: {
                                                ...thirdPageData?.integration,
                                                wordPressPlugin: e.target.value === 'WP' ? 'Y' : 'N',
                                                jsCode: e.target.value === 'JS' ? 'Y' : 'N',
                                                reactPlugin: e.target.value === 'RE' ? 'Y' : 'N',
                                            },
                                        });
                                    }}
                                >
                                    <div className="  flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                        <Radio value={'WP'}>
                                            <p className="font-normal roboto text-[16px]">Integrate Wordpress Plugin</p>
                                        </Radio>
                                    </div>

                                    <div className=" flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                        <Radio value={'JS'}>
                                            <p className="font-normal roboto text-[16px]">Integrate JS Code</p>
                                        </Radio>
                                    </div>

                                    <div className=" flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                        <Radio value={'RE'}>
                                            <p className="font-normal roboto text-[16px]">Integrate React Plugin</p>
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </div>
                        </div>
                        {thirdPageData?.integration?.reactPlugin === 'Y' && (
                            <div className="flex flex-wrap w-full">
                                <div className="w-1/2 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                    <Checkbox
                                        checked={thirdPageData?.integration?.trackPageViews}
                                        className="customCheckBox2"
                                        onChange={(e) => {
                                            setThirdPageData({
                                                ...thirdPageData,
                                                integration: {
                                                    ...thirdPageData?.integration,
                                                    trackPageViews: e.target.checked,
                                                },
                                            });
                                        }}
                                    />
                                    <div className="ml-2">Track Pageviews</div>
                                </div>

                                <div className="w-1/2 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                    <Checkbox
                                        checked={thirdPageData?.integration?.trackClicks}
                                        className="customCheckBox2"
                                        onChange={(e) => {
                                            setThirdPageData({
                                                ...thirdPageData,
                                                integration: {
                                                    ...thirdPageData?.integration,
                                                    trackClicks: e.target.checked,
                                                },
                                            });
                                        }}
                                    />
                                    <div className="ml-2">Track Clicks</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* prebid options */}
                <div ref={(ele) => (refScroll.current[4] = ele)} className="w-full mt-5">
                    <div className="bg-[#F6F9F7]  px-5 pt-2 pb-5">
                        <p className="my-5 pl-1 font-[700] font-[Roboto] text-[14px]">Prebid Options</p>
                        <div className="flex w-full mt-4">
                            <div className="w-1/2">
                                <CommonDropDown
                                    title={
                                        <div>
                                            Prebid Version <span className="common_error font-[800]">*</span>
                                        </div>
                                    }
                                    filterType="Publisher"
                                    value={thirdPageData?.prebid?.version}
                                    dataList={prebidList}
                                    setValue={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            prebid: {
                                                ...thirdPageData?.prebid,
                                                version: e,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && !thirdPageData?.prebid?.version && <span className="common_error ml-1">Please Select Version</span>}
                            </div>
                        </div>

                        <div className="flex w-full flex-wrap ">
                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title={
                                        <div>
                                            Time Out (Milliseconds) <span className="common_error font-[800]">*</span>
                                        </div>
                                    }
                                    name="nick_name"
                                    placeholder=""
                                    value={thirdPageData?.prebid?.timeOut}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            prebid: {
                                                ...thirdPageData?.prebid,
                                                timeOut: e.value,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && (!thirdPageData?.prebid?.timeOut || thirdPageData?.prebid?.timeOut.trim() === '') && <span className="common_error ml-1">Please Enter Timeout</span>}
                            </div>

                            <div className="mt-5 pl-2 w-1/2">
                                <PNormalInput
                                    title={
                                        <div>
                                            Fail Safe (Milliseconds) <span className="common_error font-[800]">*</span>
                                        </div>
                                    }
                                    name="nick_name"
                                    placeholder=""
                                    value={thirdPageData?.prebid?.failSafe}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            prebid: {
                                                ...thirdPageData?.prebid,
                                                failSafe: e.value,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && (!thirdPageData?.prebid?.failSafe || thirdPageData?.prebid?.failSafe.trim() === '') && <span className="common_error ml-1">Please Enter Fail safe</span>}
                            </div>

                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title="ID5 ID"
                                    name="nick_name"
                                    placeholder=""
                                    value={thirdPageData?.prebid?.id5Id}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            prebid: {
                                                ...thirdPageData?.prebid,
                                                id5Id: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>

                            <div className="mt-5 pl-2 w-1/2">
                                <PNormalInput
                                    title="LiveRamp ID"
                                    name="nick_name"
                                    placeholder=""
                                    value={thirdPageData?.prebid?.liveRamp}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            prebid: {
                                                ...thirdPageData?.prebid,
                                                liveRamp: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="flex w-full items-center">
                                <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                    <Checkbox
                                        checked={thirdPageData?.prebid?.stickyMode}
                                        className="customCheckBox2"
                                        onChange={(e) => {
                                            setThirdPageData({
                                                ...thirdPageData,
                                                prebid: {
                                                    ...thirdPageData?.prebid,
                                                    stickyMode: e.target.checked,
                                                },
                                            });
                                        }}
                                    />
                                    <div className="ml-2">Sticky Mode Only</div>
                                </div>

                                <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                    <Checkbox
                                        checked={thirdPageData?.prebid?.debugMode}
                                        className="customCheckBox2"
                                        onChange={(e) => {
                                            setThirdPageData({
                                                ...thirdPageData,
                                                prebid: {
                                                    ...thirdPageData?.prebid,
                                                    debugMode: e.target.checked,
                                                },
                                            });
                                        }}
                                    />
                                    <div className="ml-2">Debug Mode</div>
                                </div>

                                <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                    <Checkbox
                                        checked={thirdPageData?.prebid?.gdpr}
                                        className="customCheckBox2"
                                        onChange={(e) => {
                                            setThirdPageData({
                                                ...thirdPageData,
                                                prebid: {
                                                    ...thirdPageData?.prebid,
                                                    gdpr: e.target.checked,
                                                },
                                            });
                                        }}
                                    />
                                    <div className="ml-2">GDPR</div>
                                </div>
                            </div>

                            <div className="flex gap-24 items-center">
                                <div className="mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                                    <Checkbox
                                        checked={thirdPageData?.prebid?.disableInitMode}
                                        className="customCheckBox2"
                                        onChange={(e) => {
                                            setThirdPageData({
                                                ...thirdPageData,
                                                prebid: {
                                                    ...thirdPageData?.prebid,
                                                    disableInitMode: e.target.checked,
                                                },
                                            });
                                        }}
                                    />
                                    <div className="ml-2">Disable Init Load</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className="ml-1 font-[Roboto]">{'Restricted URLs'}</label>
                            <div className="mt-1">
                                <TextArea
                                    placeholder="Enter the URL's"
                                    autoSize={{ minRows: 5 }}
                                    value={thirdPageData?.prebid?.restUrl}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            prebid: {
                                                ...thirdPageData?.prebid,
                                                restUrl: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* amazon header bidding */}
                <div ref={(ele) => (refScroll.current[5] = ele)} className="w-full mt-4">
                    <div className="bg-[#F6F9F7]  px-5 pt-2 pb-5">
                        <p className="my-5 font-[700] font-[Roboto] text-[14px]">Activate Amazon Ads</p>
                        <div className="mt-1 flex flex-wrap w-full">
                            <div className="w-1/3 mt-1 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.amazonBidding?.amazonHb}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            amazonBidding: {
                                                ...thirdPageData?.amazonBidding,
                                                amazonHb: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Amazon HB</div>
                            </div>
                        </div>

                        <div className="flex w-full flex-wrap ">
                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title={<div>PubID</div>}
                                    name="PubID"
                                    placeholder="Enter ID"
                                    value={thirdPageData?.amazonBidding?.pubId}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            amazonBidding: {
                                                ...thirdPageData?.amazonBidding,
                                                pubId: e.value,
                                            },
                                        });
                                    }}
                                />
                                {/* {isValidate && (!thirdPageData?.amazonBidding?.pubId || thirdPageData?.amazonBidding?.pubId.trim() === '') && <span className="common_error ml-1">Please Enter ID</span>} */}
                            </div>

                            <div className="mt-5 pl-2 w-1/2">
                                <PNormalInput
                                    title={<div>AdServer</div>}
                                    name="adserver"
                                    placeholder="Enter Ad Server"
                                    value={thirdPageData?.amazonBidding?.adServer}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            amazonBidding: {
                                                ...thirdPageData?.amazonBidding,
                                                adServer: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* other settings */}
                <div ref={(ele) => (refScroll.current[6] = ele)} className="w-full mt-5">
                    <div className="bg-[#F6F9F7]  px-5 pt-2 pb-5">
                        <p className="my-5 font-[700] font-[Roboto] text-[14px]">Other Settings</p>
                        <div className="mt-1 flex flex-wrap w-full">
                            <div className="w-1/3 mt-1 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.amazonBidding?.googleAds}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            amazonBidding: {
                                                ...thirdPageData?.amazonBidding,
                                                googleAds: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Google Auto Ads</div>
                            </div>

                            <div className="w-1/3 mt-1 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={thirdPageData?.amazonBidding?.taxonomy}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            amazonBidding: {
                                                ...thirdPageData?.amazonBidding,
                                                taxonomy: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2">Taxonomy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* s3 bucket options */}
                <div ref={(ele) => (refScroll.current[7] = ele)} className="w-full mt-5">
                    <div className="bg-[#F6F9F7]  px-5 pt-2 pb-5">
                        <p className="my-5 font-[700] font-[Roboto] text-[14px]">S3 Bucket Option</p>

                        <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                            <Checkbox
                                checked={thirdPageData?.s3?.ownS3}
                                className="customCheckBox2"
                                onChange={(e) => {
                                    setThirdPageData({
                                        ...thirdPageData,
                                        s3: {
                                            ...thirdPageData?.s3,
                                            ownS3: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <div className="ml-2">Own S3 bucket?</div>
                        </div>

                        <div className="flex w-full flex-wrap ">
                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title="AWS Access Key"
                                    name="nick_name"
                                    placeholder="Enter Access Key"
                                    value={thirdPageData?.s3?.accessKey}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            s3: {
                                                ...thirdPageData?.s3,
                                                accessKey: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>

                            <div className="mt-5 pl-2 w-1/2">
                                <PNormalInput
                                    title="AWS Secret Key"
                                    name="nick_name"
                                    placeholder="Enter Secret Key"
                                    value={thirdPageData?.s3?.secretKey}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            s3: {
                                                ...thirdPageData?.s3,
                                                secretKey: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>

                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title="S3 Bucket Name"
                                    name="nick_name"
                                    placeholder="Enter Bucket Name"
                                    value={thirdPageData?.s3?.bucketName}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            s3: {
                                                ...thirdPageData?.s3,
                                                bucketName: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>

                            <div className="mt-5 pr-2 w-1/2"></div>

                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title="Cloudflare's Auth Email"
                                    name="nick_name"
                                    placeholder=""
                                    value={thirdPageData?.s3?.cloudflareEmail}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            s3: {
                                                ...thirdPageData?.s3,
                                                cloudflareEmail: e.value,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && thirdPageData?.s3?.cloudflareEmail && !isEmail(thirdPageData?.s3?.cloudflareEmail) && <span className="common_error ml-1">Please Enter valid email</span>}
                            </div>

                            <div className="mt-5 pl-2 w-1/2">
                                <PNormalInput
                                    title="Cloudflare's Auth Key"
                                    name="nick_name"
                                    placeholder=""
                                    value={thirdPageData?.s3?.cloudflareAuth}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            s3: {
                                                ...thirdPageData?.s3,
                                                cloudflareAuth: e.value,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* seller json */}
                <div ref={(ele) => (refScroll.current[8] = ele)} className="w-full mt-5">
                    <div className="bg-[#F6F9F7]  px-5 pt-2 pb-5">
                        <p className="my-5 font-[700] font-[Roboto] text-[14px]">Manage Sellers JSON</p>

                        <div className="w-1/3 mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                            <Checkbox
                                checked={thirdPageData?.seller?.sellerStatus}
                                className="customCheckBox2"
                                onChange={(e) => {
                                    setThirdPageData({
                                        ...thirdPageData,
                                        seller: {
                                            ...thirdPageData?.seller,
                                            sellerStatus: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <div className="ml-2">Seller JSON Status</div>
                        </div>

                        <div className="flex w-full flex-wrap ">
                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title={<div>Seller ID</div>}
                                    name="Seller ID"
                                    placeholder=""
                                    value={thirdPageData?.seller?.sellerId}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            seller: {
                                                ...thirdPageData?.seller,
                                                sellerId: e.value,
                                            },
                                        });
                                    }}
                                    disabled={true}
                                />
                            </div>

                            <div className="mt-5 pl-2 w-1/2">
                                <PNormalInput
                                    title={
                                        <div>
                                            Seller Name <span className="common_error font-[800]">*</span>
                                        </div>
                                    }
                                    name="Seller Name"
                                    placeholder=""
                                    value={thirdPageData?.seller?.sellerName}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            seller: {
                                                ...thirdPageData?.seller,
                                                sellerName: e.value,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && (!thirdPageData?.seller?.sellerName || thirdPageData?.seller?.sellerName.trim() === '') && <span className="common_error ml-1">Please Enter Seller Name</span>}
                            </div>

                            <div className="mt-5 pr-2 w-1/2">
                                <PNormalInput
                                    title={
                                        <div>
                                            Seller Domain <span className="common_error font-[800]">*</span>
                                        </div>
                                    }
                                    name="Seller Domain"
                                    placeholder=""
                                    value={thirdPageData?.seller?.sellerDomain}
                                    onChange={(e: any) => {
                                        setThirdPageData({
                                            ...thirdPageData,
                                            seller: {
                                                ...thirdPageData?.seller,
                                                sellerDomain: e.value,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && (!thirdPageData?.seller?.sellerDomain || thirdPageData?.seller?.sellerDomain.trim() === '') && <span className="common_error ml-1">Please Enter Seller Domain</span>}
                            </div>

                            <div className="flex w-full mt-8">
                                <div className="w-1/2 ">
                                    <CommonDropDown
                                        title="Seller Type"
                                        filterType="Publisher"
                                        value={thirdPageData?.seller.sellerType}
                                        dataList={[
                                            { title: 'Publisher', value: 'PUBLISHER' },
                                            { title: 'Intermediary', value: 'INTERMEDIARY' },
                                            { title: 'Publisher+Intermediary', value: 'PUBLISHER+INTERMEDIARY' },
                                        ]}
                                        setValue={(e: any) => {
                                            setThirdPageData({
                                                ...thirdPageData,
                                                seller: {
                                                    ...thirdPageData?.seller,
                                                    sellerType: e,
                                                },
                                            });
                                        }}
                                    />
                                    {isValidate && !thirdPageData?.seller?.sellerType && <span className="common_error ml-1">Please Select Seller Type</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* report */}
                <div ref={(ele) => (refScroll.current[9] = ele)} className=" h-[114px] mt-5">
                    <div className="bg-[#F6F9F7] px-5 pt-2 pb-5">
                        <p className="my-5 font-[700] font-[Roboto] text-[14px]">Report</p>
                        <div className="mt-5 flex items-center font-[Roboto] font-[500] text-[16px]">
                            <Checkbox
                                checked={thirdPageData?.report?.email}
                                className="customCheckBox2"
                                onChange={(e) => {
                                    setThirdPageData({
                                        ...thirdPageData,
                                        report: {
                                            ...thirdPageData?.report,
                                            email: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <div className="ml-2">Send via Email</div>
                        </div>
                    </div>
                </div>
            </div>
            {((ID && !siteData) || loading) && (
                <div className="absolute w-full top-0">
                    <div className="flex h-[70vh] justify-center items-center ">
                        <Spin />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SiteThirdPage;
