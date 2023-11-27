const OnboardingTypes = {
    // fetching and setting onboarding all site list
    FETCH_ONBOARD_SITE_LIST: 'FETCH_ONBOARD_SITE_LIST',
    SET_ONBOARD_SITE_LIST: 'SET_ONBOARD_SITE_LIST',

    // fetching and setting onboarding publisher list
    FETCH_ONBOARD_PUBLISHER_LIST: 'FETCH_ONBOARD_PUBLISHER_LIST',
    SET_ONBOARD_PUBLISHER_LIST: 'SET_ONBOARD_PUBLISHER_LIST',

    // fetching and setting onboarding prebid list
    FETCH_ONBOARD_PREBID_LIST: 'FETCH_ONBOARD_PREBID_LIST',
    SET_ONBOARD_PREBID_LIST: 'SET_ONBOARD_PREBID_LIST',

    // fetching and setting account manager list
    FETCH_ONBOARD_ACCOUNT_MANAGER_LIST: 'FETCH_ONBOARD_ACCOUNT_MANAGER_LIST',
    SET_ONBOARD_ACCOUNT_MANAGER_LIST: 'SET_ONBOARD_ACCOUNT_MANAGER_LIST',
    SET_ACCOUNT_MANAGER_LIST: 'SET_ACCOUNT_MANAGER_LIST',

    // fetching all Sites data
    FETCH_ONBOARD_ALL_SITE_DATA: 'FETCH_ONBOARD_ALL_SITE_DATA',
    SET_ONBOARD_ALL_SITE_DATA: 'SET_ONBOARD_ALL_SITE_DATA',

    // fetching Recent data
    FETCH_ONBOARD_RECENT_DATA: 'FETCH_ONBOARD_RECENT_DATA',
    SET_ONBOARD_RECENT_DATA: 'SET_ONBOARD_RECENT_DATA',

    // fetching Favorites data
    FETCH_ONBOARD_FAVORITES_DATA: 'FETCH_ONBOARD_FAVORITES_DATA',
    SET_ONBOARD_FAVORITES_DATA: 'SET_ONBOARD_FAVORITES_DATA',

    // fetching archive data
    FETCH_ONBOARD_ARCHIVES_DATA: 'FETCH_ONBOARD_ARCHIVES_DATA',
    SET_ONBOARD_ARCHIVES_DATA: 'SET_ONBOARD_ARCHIVES_DATA',

    // fetching Site data
    FETCH_ONBOARD_SITE_DETAILS: 'FETCH_ONBOARD_SITE_DETAILS',
    SET_ONBOARD_SITE_DETAILS: 'SET_ONBOARD_SITE_DETAILS',

    // fetching Publisher data
    FETCH_ONBOARD_PUBLISHER_DETAILS: 'FETCH_ONBOARD_PUBLISHER_DETAILS',
    SET_ONBOARD_PUBLISHER_DETAILS: 'SET_ONBOARD_PUBLISHER_DETAILS',

    // fetching General Site data
    FETCH_ONBOARD_GENERAL_TAB_DETAILS: 'FETCH_ONBOARD_GENERAL_TAB_DETAILS',
    SET_ONBOARD_GENERAL_TAB_DETAILS: 'SET_ONBOARD_GENERAL_TAB_DETAILS',

    // fetching General Site data
    FETCH_ONBOARD_SEND_BILLING_MAIL: 'FETCH_ONBOARD_SEND_BILLING_MAIL',
    SET_ONBOARD_SEND_BILLING_MAIL: 'SET_ONBOARD_SEND_BILLING_MAIL',
};

export default OnboardingTypes;

export interface WidgetsData {
    widgetTitle?: string;
    widgetType?: string;
    widgetText?: string;
    donationAmt1?: string;
    donationAmt2?: string;
    donationAmt3?: string;
    driveGoal?: string;
    data?: string;
    mode?: string;
    styleType?: string;
    termsAndPrivacy?: string;
    donor?: string;
    orientation?: string;
    backgroundColor?: string;
    titleColor?: string;
    fontColor?: string;
    buttonsColor?: string;
    buttonsTextColor?: string;
    linkHoverColor?: string;
    fontFamily?: string;
    textSize?: string;
    titleSize?: string;
}

export interface onboardingFilterLists {
    site_name?: string;
    site_id?: number;
    full_name?: string;
    business_name?: string;
    publisher_id?: string;
    version?: string;
    email?: string;
    website?: any;
    id?: any;
    publisher_sites?:any;
}

export interface onboardingDataTable {
    site_name?: string;
    prebid_version?: number;
    status?: string;
    publisher_name?: string;
    favourite?: string;
}

export interface siteData {
    status?: string;
    amazon_hb?: string;
    amazon_pub_id?: string;
    amazon_ad_server?: string;
    no_adserver?: string;
    google_auto_ads?: string;
    taxonomy?: string;
    use_old_site_id?: string;
    old_site_id?: any;
    pub_own_s3_bucket?: string;
    aws_access_key?: string;
    aws_secret_key?: string;
    s3_bucket_name?: string;
    cloudflare_auth_email?: string;
    cloudflare_auth_key?: string;
    id5_id?: any;
    liveramp_id?: any;
    show_impressions_data?: string;
    email_reports_status?: string;
    sticky_mode_only?: string;
    site_id?: any;
    site_name?: string;
    site_url?: string;
    publisher_id?: string;
    integrated_wp_plugin?: string;
    integrated_js_code?: string;
    react_site?: string;
    publir_products?: string;
    prebid_version?: any;
    prebid_timeout?: string;
    prebid_failsafe?: string;
    prebid_disable_init_load?: string;
    prebid_debug_mode?: string;
    restricted_urls?: any;
    prebid_gdpr: string;
    seller_data?: any;
    publisher_details?: any;
    account_manager_id?: any;
    track_page_views?: any;
    track_clicks?: any;
    went_live_on?: string;
    joined_on?: string;
    //disable_init_load?: any,
    // "ads_integration_type": "advanced",
    // "network_type": 0,
    // "requested_network_type": "",
    // "gam_network_code": "22444413794",
    // "is_gam_ncode_verified": 1,
    // "gam_trafficker_id": "246894114",
    // "gam_trafficker_name": "PublirAPI",
    // "gam_advertiser_id": "5036124232",
    // "gam_advertiser_name": "Publir",
    // "gam_advertiser_type": "ADVERTISER",
    // "gam_order_status": 2,
    // "currency_id": 1,
    // "integrated_ads": "Y",
    // "integrated_subs": "Y",
    // "react_site": "N",
    // "enable_custom_subs_ip": "N",
    // "custom_subs_ip": null,
    // "cm_privacy_id": null,
    // "tradedesk_id": null,
    // "favourite_by_user_ids": "",
    // "bg_color": "#37bccd",
    // "font_color": "#ffffff",
    // "link_color": "#ffffff",
    // "link_hover_color": "#ffffff",
    // "support_email": "",
    // "email_subject": null,
    // "email_temp": "",
    // "stripe_payment": "Y",
    // "razorpay_payment": "N",
    // "paypal_payment": "N",
    // "prebid_device_access": "N",
    // "track_page_views": "N",
    // "track_clicks": "N",
    // "prebid_preview": "0",
    // "trafficked_under_publir_gam": "Y",
}

export interface publisherData {
    full_name?: string;
    email?: string;
    access_type?: any;
    show_network_level_data?: boolean;
    parent_gam_id?: string;
    gam_api_name?: string;
    gam_api_email?: string;
    gam_api_passcode?: string;
    gam_api_status?: string;
    publisherStatus?: boolean;
    mcm_email?: string;
    password?: string;
    //     id: 2,
    //    "referral_code": "PRDCDGDCF",
    //    "publisher_type": "admin",
    //    "verification_link": "",
    //    "reset_password_link": "",
    //    "profile_pic": "",
    //    "created_at": "2021-04-07 10:42:36",
    //    "verified_at": null,
    //    "lastlogin_at": "2021-06-22 17:29:26",
    //    "updated_at": "2021-04-07 14:42:36"
}

export interface ThirdPageState {
    info: {
        siteStatus?: any;
        siteId?: any;
        oldSiteId?: any;
        siteName?: string;
        siteUrl?: string;
        publisher?: string;
        showImpData?: boolean;
        accountManager?: string;
    };
    products: {
        adOptimization?: boolean;
        subscription?: boolean;
        crowdFunding?: boolean;
        quickShop?: boolean;
        adBlockRecovery?: boolean;
    };
    integration: {
        wordPressPlugin: any;
        jsCode: any;
        reactPlugin: any;
        trackPageViews?: boolean;
        trackClicks?: boolean;
    };
    prebid: {
        version?: any;
        timeOut?: string;
        failSafe?: string;
        id5Id?: string;
        liveRamp?: string;
        stickyMode?: boolean;
        debugMode?: boolean;
        disableInitMode?: boolean;
        restUrl: string;
        gdpr?: boolean;
    };
    amazonBidding: {
        amazonHb?: boolean;
        taxonomy?: boolean;
        pubId?: string;
        adServer?: string;
        googleAds?: boolean;
    };
    s3: {
        ownS3?: boolean;
        accessKey?: string;
        secretKey?: string;
        bucketName?: string;
        cloudflareEmail?: string;
        cloudflareAuth?: string;
    };
    seller: {
        sellerStatus?: boolean;
        sellerType?: string;
        sellerDomain?: string;
        sellerId?: string;
        sellerName?: string;
    };
    report: {
        email?: boolean;
    };
}

export interface SecondPageState {
    info: {
        publisherId?: any;
        publisherName?: string;
        contactEmail?: string;
        MCMEmail?: string;
        password?: string;
        accessType?: any;
        showNetworkLevel?: boolean;
        BusinessName?: string;
        sameMCMemail?: boolean;
    };
    gam: {
        gamId?: string;
        gamAPIName?: string;
        gamAPIEmail?: string;
        gamAPIPasscode?: string;
        gamAPIStatus?: boolean;
    };
    status: {
        status?: string;
    };
}

export interface AccountManager {
    id: string;
    email: string;
    full_name: string;
    publisher_id: string;
    website: number;
}

export interface OnboardingStates {
    onboardSiteList: any;
    onboardSiteListLoader: boolean;

    onboardPublisherList: any;
    onboardPublisherListLoader: boolean;

    onboardPrebidList: any;
    onboardPrebidListLoader: boolean;

    onboardAccountManagerList: any;
    onboardAccountManagerListLoader: boolean;

    onboardingAllSiteTable: any;
    onboardingAllSiteTableLoader: boolean;

    onboardingRecentTable: any;
    onboardingRecentTableLoader: boolean;

    onboardingFavoritesTable: any;
    onboardingFavoritesTableLoader: boolean;

    onboardingArchiveTable: any;
    onboardingArchiveTableLoader: boolean;

    onboardingGetSiteDetails?: siteData;
    onboardingGetSiteDetailsLoader: boolean;

    onboardingPublisherDetails: any;
    onboardingPublisherDetailsLoader: boolean;

    onboardingGeneralTabDetails: any;
    onboardingGeneralTabDetailsLoader: boolean;

    accountManagerList: AccountManager[];
}
