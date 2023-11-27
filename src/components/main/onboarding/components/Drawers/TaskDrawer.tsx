import React, { useMemo, useRef, useState } from 'react';
import TaskCard from '../OnBoardingSiteDetails/TaskCard';
import { Drawer, Select } from 'antd';
import CustomTaskImage from '../../../../../assets/icons/onboarding/customtask.png';
import BillingImage from '../../../../../assets/icons/onboarding/billing.png';
import MCMinviteImage from '../../../../../assets/icons/onboarding/invite.png';
import AdstextImage from '../../../../../assets/icons/onboarding/text.png';
import GoogleApprovalImage from '../../../../../assets/icons/onboarding/googleapproval.png';
import AdUnitImage from '../../../../../assets/icons/onboarding/ads.png';
import PartnerApprovalImage from '../../../../../assets/icons/onboarding/partner.png';
import AdTagsImage from '../../../../../assets/icons/onboarding/tags.png';
import SiteQAImage from '../../../../../assets/icons/onboarding/siteqa.png';
import LiveImage from '../../../../../assets/icons/onboarding/live.png';
import ReportsQAImage from '../../../../../assets/icons/onboarding/reportdata.png';
import VerifySellerImage from '../../../../../assets/icons/onboarding/sellerid.png';
import CreatePrebid from '../../../../../assets/icons/onboarding/createprebid.svg';
import Rules from '../../../../../assets/icons/onboarding/rules.png';
import AgreementImage from '../../../../../assets/icons/onboarding/agrement.svg';
import PricingImage from '../../../../../assets/icons/onboarding/pricing.svg';
import IntegrationImage from '../../../../../assets/icons/onboarding/integration.svg';
import HowitWorksImage from '../../../../../assets/icons/onboarding/howitworks.svg';
import WpPluginImage from '../../../../../assets/icons/onboarding/wpplugin.svg';
import CodeImage from '../../../../../assets/icons/onboarding/code.svg';
import EmailRulesImage from '../../../../../assets/icons/onboarding/emailrules.svg';
import WidgetsImage from '../../../../../assets/icons/onboarding/Widget.svg';
import VettingGuidelinesImage from '../../../../../assets/icons/onboarding/VettingGuidelines.svg';

import { RoundButton } from '../../../../common/Button';

import AdUnits from './AdUnits/AdUnits';
import Mockup from './Mockups/Mockup';
import Billing from './Billing/Billing';
import Agreement from './Agreement/Agreement';
import MCMInvite from './McmInvite/MCMInvite';
import GoogleApproval from './GoogleApproval/GoogleApproval';
import VerifySellerID from './VerifySeller/VerifySellerID';
import ReportsQA from './ReportsQA/ReportsQA';
import Live from './Live/Live';
import StagingSiteQA from './StagingQA/StagingSiteQA';
import Tags from './Tags/Tags';
import Adstxt from './Adstxt/Adstxt';
import Partner from './Partner/Partner';
import PrebidCreate from './CreatePrebid/PrebidCreate';
import Integration from './Subscription Drawers/Integration/Integration';
import AdWrappingCode from './Subscription Drawers/AdWrappingCode/AdWrappingCode';
import SetRules from './Subscription Drawers/SetRules/SetRules';
import Pricing from './Subscription Drawers/Pricing/Pricing';
import EmailRules from './Subscription Drawers/EmailRules/EmailRules';
import NoticeRules from './AdblockRecovery Drawers/NoticeRules/NoticeRules';
import SetupCodeLive from './AdblockRecovery Drawers/SetupCodeLive/SetupCodeLive';
import Widgets from './Crowdfunding Drawers/OnboardingWidgets';
import VettingGuidelines from './VettingGuidelines/VettingGuidelines';
import EditCustomTask from './CustomTask/EditCustomTask';

const Images: any = {
    Mockup: CustomTaskImage,
    Billing: BillingImage,
    Agreement: AgreementImage,
    'MCM Invite': MCMinviteImage,
    'Ads.txt': AdstextImage,
    'Google Approval': GoogleApprovalImage,
    'Ad Units': AdUnitImage,
    Partner: PartnerApprovalImage,
    'Create Prebid.js': CreatePrebid,
    'Ad Tags': AdTagsImage,
    'Staging Site QA': SiteQAImage,
    Live: LiveImage,
    'Reports Data QA': ReportsQAImage,
    'Verify Seller ID': VerifySellerImage,
    'Set Rules': Rules,
    Pricing: PricingImage,
    Integration: IntegrationImage,
    'How it Works': HowitWorksImage,
    'Install WP Plugin': WpPluginImage,
    'Ad Wrapping Code': CodeImage,
    'Email Rules': EmailRulesImage,
    'Set Up Notice Rules': Rules,
    'JS Code/Set Live': CodeImage,
    Widgets: WidgetsImage,
    'Vetting Guidelines': VettingGuidelinesImage,
};
type Props = {
    status: boolean;
    title: string;
    customDrawer?: boolean;
    customTaskData?: any;
};
const TaskDrawer: React.FC<Props> = ({ status, title, customDrawer, customTaskData }) => {
    const siteDetailRef = useRef<any>();
    const [open, setOpen] = useState(false);
    const [customOpen, setCustomOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<string>(title);

    const TaskContent = useMemo(() => {
        switch (currentTask) {
            case 'Mockup':
                return <Mockup siteDetailRef={siteDetailRef} setOpen={setOpen} open={open} />;
            case 'Billing':
                return <Billing siteDetailRef={siteDetailRef} setOpen={setOpen} open={open} />;
            case 'Agreement':
                return <Agreement siteDetailRef={siteDetailRef} setOpen={setOpen} />;
            case 'Vetting Guidelines':
                return <VettingGuidelines siteDetailRef={siteDetailRef} setOpen={setOpen} />;
            case 'MCM Invite':
                return <MCMInvite siteDetailRef={siteDetailRef} setOpen={setOpen} open={false}/>;
            case 'Ads.txt':
                return <Adstxt />;
            case 'Google Approval':
                return <GoogleApproval />;
            case 'Ad Units':
                return <AdUnits />;
            case 'Partner':
                return <Partner />;
            case 'Create Prebid.js':
                return <PrebidCreate siteDetailRef={siteDetailRef} setOpen={setOpen} open={false}/>;
            case 'Ad Tags':
                return <Tags siteDetailRef={siteDetailRef} setOpen={setOpen} open={false}/>;
            case 'Staging Site QA':
                return <StagingSiteQA />;
            case 'Live':
                return <Live />;
            case 'Reports Data QA':
                return <ReportsQA />;
            case 'Verify Seller ID':
                return <VerifySellerID />;
            case 'Integration':
                return <Integration />;
            case 'Ad Wrapping Code':
                return <AdWrappingCode />;
            case 'Set Rules':
                return <SetRules />;
            case 'Pricing':
                return <Pricing />;
            case 'Email Rules':
                return <EmailRules />;
            case 'Set Up Notice Rules':
                return <NoticeRules />;
            case 'JS Code/Set Live':
                return <SetupCodeLive />;
            case 'Widgets':
                return <Widgets />;
            default:
                return null;
        }
    }, [currentTask, open]);

    const handleChange = (e: any) => {
        setCurrentTask(e);
    };
    const onClickSave = () => {
        switch (currentTask) {
            case 'Mockup':
                siteDetailRef?.current?.onClickCreateMockup();
                break;
            case 'Billing':
                siteDetailRef?.current?.onClickCreateBilling();
                break;
            case 'Agreement':
                siteDetailRef?.current?.onClickCreateAgreement();
                break;
            case 'Vetting Guidelines':
                siteDetailRef?.current?.createEditVettingGuidlines();
                break;
            case 'MCM Invite':
                break;
            case 'Ads.txt':
                break;
            case 'Google Approval':
                break;
            case 'Ad Units':
                break;
            case 'Partner':
                break;
            case 'Create Prebid.js':
                break;
            case 'Ad Tags':
                break;
            case 'Staging Site QA':
                break;
            case 'Live':
                break;
            case 'Reports Data QA':
                break;
            case 'Verify Seller ID':
                break;
            case 'Integration':
                break;
            case 'Ad Wrapping Code':
                break;
            case 'Set Rules':
                break;
            case 'Pricing':
                break;
            case 'Email Rules':
                break;
            case 'Set Up Notice Rules':
                break;
            case 'JS Code/Set Live':
                break;
            case 'Widgets':
                break;
            default:
                return null;
        }
    };

    return (
        <>
            <div
                onClick={() => {
                    if (title) {
                        setCurrentTask(title);
                    }
                    if (customDrawer && customTaskData) {
                        setCustomOpen(true);
                    } else {
                        setOpen(true);
                    }
                }}
            >
                <TaskCard image={Images?.[`${title}`] || null} status={status} title={title} />
            </div>
            {customDrawer && customTaskData ? (
                <EditCustomTask customTaskData={customTaskData} setCustomOpen={setCustomOpen} customOpen={customOpen} />
            ) : (
                <Drawer open={open} width={750} onClose={() => setOpen(false)} closeIcon={null} closable={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                    <div>
                        <div className="py-8 mx-8 flex justify-between items-center">
                            <div className="w-[300px]">
                                <Select value={currentTask} size="large" onChange={handleChange} optionFilterProp="children" className={`customSelector min-w-[250px] border rounded-lg overflow-auto font-[montserrat] `} options={optionsList} />
                            </div>
                            <div className="flex gap-5 items-center">
                                <div className="border rounded-3xl border-green-800">
                                    <RoundButton light={true} title="Cancel" className={'w-[100px] text-[14px]'} onClick={() => setOpen(false)} />
                                </div>
                                <div>
                                    <RoundButton title="Save" className="w-[100px]" onClick={onClickSave} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">{TaskContent}</div>
                    </div>
                </Drawer>
            )}
        </>
    );
};

export default TaskDrawer;

const optionsList = [
    {
        label: 'General',
        options: [
            { label: 'Mockup', value: 'Mockup' },
            { label: 'Billing', value: 'Billing' },
            { label: 'Agreement', value: 'Agreement' },
        ],
    },
    {
        label: 'Ad Optimization',
        options: [
            { label: 'MCM Invite', value: 'MCM Invite' },
            { label: 'Ads.txt', value: 'Ads.txt' },
            { label: 'Create Prebid.js', value: 'Create Prebid.js' },
            { label: 'Google Approval', value: 'Google Approval' },
            { label: 'Ad Units', value: 'Ad Units' },
            { label: 'Partner', value: 'Partner' },
            { label: 'Ad Tags', value: 'Ad Tags' },
            { label: 'Staging Site QA', value: 'Staging Site QA' },
            { label: 'Live', value: 'Live' },
            { label: 'Reports Data QA', value: 'Reports Data QA' },
            { label: 'Verify Seller ID', value: 'Verify Seller ID' },
        ],
    },
    {
        label: 'Subscription',
        options: [
            { label: 'Pricing', value: 'Pricing' },
            { label: 'Set Rules', value: 'Set Rules' },
            { label: 'Integration', value: 'Integration' },
            { label: 'Email Rules', value: 'Email Rules' },
            { label: 'Ad Wrapping Code', value: 'Ad Wrapping Code' },
        ],
    },
    {
        label: 'Crowdfunding',
        options: [{ label: 'Widgets', value: 'Widgets' }],
    },
    {
        label: 'Adblock Recovery',
        options: [
            { label: 'Set Up Notice Rules', value: 'Set Up Notice Rules' },
            { label: 'JS Code/Set Live', value: 'JS Code/Set Live' },
        ],
    },
];
