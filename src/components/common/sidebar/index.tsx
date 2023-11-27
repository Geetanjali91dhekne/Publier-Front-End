import { Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import logo from '../../../assets/icons/publir.svg';
import PLogo from '../../../assets/publiricon.png';
import { RxDashboard } from 'react-icons/rx';
import { TbWorld } from 'react-icons/tb';
import { CgLogOff } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginActions from '../../login/redux/actions';
import { HEADERMENU_PATH } from '../../../routes/RoutesURL';
import AdoptSvgFile from '../../../assets/icons/sidebaricons/AdoptSvgFile';
import SubscriptionSvgFile from '../../../assets/icons/sidebaricons/SubscriptionSvgFile';
import CrowdFundSvgFile from '../../../assets/icons/sidebaricons/CrowdFundSvgFile';
import QuickShopSvgFile from '../../../assets/icons/sidebaricons/QuickShopSvgFile';
import AdRecoverySvgFile from '../../../assets/icons/sidebaricons/AdRecoverySvgFile';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import AdminSvgFile from '../../../assets/icons/sidebaricons/AdminSvgFile';
import SetupSvgFile from '../../../assets/icons/sidebaricons/SetupSvgFile';
import OnboardingSvgFile from '../../../assets/icons/sidebaricons/OnboardingSvgFile';

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
    collapsed: boolean;
    setCollapse: (f: boolean) => void;
};

const PSidebar: React.FC<Props> = ({ collapsed, setCollapse }) => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [selectedRootMenu, setSelectedRootMenu] = useState(['dashboard']);
    const [selectedKeys, setSelectedKeys]: any = useState<string[]>([]);

    const rootSubmenuKeys = ['dashboard', 'setup', 'networkUpload'];
    const items = [
        getItem('Dasboard', 'dashboard', <RxDashboard />, [
            getItem('Ad Optimization', 'adoptimization', <AdoptSvgFile color={selectedKeys[0] === 'adoptimization' ? '#056433' : '#a8a8a8'} />),
            getItem('Subscriptions', 'subscriptions', <SubscriptionSvgFile color={selectedKeys[0] === 'subscriptions' ? '#056433' : '#a8a8a8'} />),
            getItem('CrowdFunding', 'crowdFunding', <CrowdFundSvgFile color={selectedKeys[0] === 'crowdFunding' ? '#056433' : '#a8a8a8'} />),
            getItem('Quickshop', 'quickshop', <QuickShopSvgFile color={selectedKeys[0] === 'quickshop' ? '#056433' : '#a8a8a8'} />),
            getItem('AdBlock Recovery', 'adBlockRecovery', <AdRecoverySvgFile color={selectedKeys[0] === 'adBlockRecovery' ? '#056433' : '#a8a8a8'} />),
        ]),
        getItem('Setup', 'setup', <SetupSvgFile color={selectedRootMenu[0] === 'setup' ? '#056433' : '#a8a8a8'} />, [
            getItem('Ad Optimization', 'setupAdoptimization', <AdoptSvgFile color={selectedKeys[0] === 'setupAdoptimization' ? '#056433' : '#a8a8a8'} />),
            getItem('Subscriptions', 'setupSubscriptions', <SubscriptionSvgFile color={selectedKeys[0] === 'setupSubscriptions' ? '#056433' : '#a8a8a8'} />),
            getItem('CrowdFunding', 'setupCrowdFunding', <CrowdFundSvgFile color={selectedKeys[0] === 'setupCrowdFunding' ? '#056433' : '#a8a8a8'} />),
            getItem('Quickshop', 'setupQuickshop', <QuickShopSvgFile color={selectedKeys[0] === 'setupQuickshop' ? '#056433' : '#a8a8a8'} />),
            getItem('AdBlock Recovery', 'setupAdBlockRecovery', <AdRecoverySvgFile color={selectedKeys[0] === 'setupAdBlockRecovery' ? '#056433' : '#a8a8a8'} />),
        ]),
        getItem('Admin', 'networkUpload', <AdminSvgFile color={selectedRootMenu[0] === 'networkUpload' ? '#056433' : '#a8a8a8'} />, [
            getItem('Ad Network Upload', 'prebidUpload', <TbWorld color={selectedKeys[0] === 'prebidUpload' ? '#056433' : '#a8a8a8'} />),
            getItem('Ad Network Settings', 'networkSettings', <TbWorld color={selectedKeys[0] === 'networkSettings' ? '#056433' : '#a8a8a8'} />),
        ]),
        getItem('Onboarding', 'onboarding', <OnboardingSvgFile color={selectedKeys[0] === 'onboarding' ? '#056433' : '#a8a8a8'} />),
        getItem('Logout', 'logout', <CgLogOff />),
    ];


    const onClickMenuItem: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            dispath(LoginActions.removeUserData());
            navigate(HEADERMENU_PATH.login);
            return;
        }
        let url = '';
        setSelectedKeys([e.key]);
        if (e.keyPath.length > 1) {
            setSelectedRootMenu([e.keyPath[1]]);
            url = e.keyPath[1];
        } else {
            setSelectedRootMenu([e.keyPath[0]]);
            url = e.key;
            navigate(url);
            return;
        }
        url = url !== '' ? `${url}/${e.key}` : url;

        navigate(url);
    };

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => selectedRootMenu.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setSelectedRootMenu(keys);
        } else {
            setSelectedRootMenu(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    useEffect(() => {
        const urlOfPage = window.location.href.split('/');
        setSelectedKeys([urlOfPage[urlOfPage.length - 1]]);
    }, []);

    return (
        <div className="flex relative">
            <div className={'max-w-[300]'} id="sidebar">
                <div className="flex justify-start items-center pb-6">{collapsed ? <img src={PLogo} alt="companyLogo" className="w-5" /> : <img src={logo} alt="companyLogo" />}</div>
                <Menu
                    mode="inline"
                    onClick={onClickMenuItem}
                    onOpenChange={onOpenChange}
                    openKeys={selectedRootMenu}
                    selectedKeys={selectedKeys}
                    items={items}
                    className={`bg-transparent sidebar ${collapsed ? 'w-[40px]' : 'w-[220px]'}`}
                    style={{ borderInlineEnd: 'none' }}
                    inlineCollapsed={collapsed}
                />
            </div>
            <div onClick={() => setCollapse(!collapsed)}
                className={`bg-[#B4D0C133] h-7 w-7 rounded-full flex justify-center items-center cursor-pointer  mt-2 absolute -right-3`}
            >
                {collapsed ? <AiOutlineRight size={14} /> : <AiOutlineLeft size={14} />}
            </div>
        </div>
    );
};
export default PSidebar;

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
