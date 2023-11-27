import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import AccessDenined from '../components/common/AccessDenined';
import PSidebar from '../components/common/sidebar';
import Login from '../components/login';
import AdOptimizationDashboard from '../components/main/dashboard/AdOptimization';
import AdBlockRecoveryDashboard from '../components/main/dashboard/AdBlockRecovery';
import AdOptimizationSiteDetail from '../components/main/dashboard/AdOptimization/SiteDetails';
import CrowdFundingDashboard from '../components/main/dashboard/CrowdFunding';
import CrowdFundingDetails from '../components/main/dashboard/CrowdFunding/components/CrowdFundingDetails';
import QuickShopDashboard from '../components/main/dashboard/QuickShop';
import QuickShopDetails from '../components/main/dashboard/QuickShop/components/QuickShopDetails';
import SubscriptionsDashboard from '../components/main/dashboard/Subscriptions';
import SubscriptionSiteDetails from '../components/main/dashboard/Subscriptions/components/SubscriptionDetails';
import Message from '../components/message/Meesage';
import { RootState } from '../store/RootReducer';
import { HEADERMENU_PATH } from './RoutesURL';
import AdBlockRecoveryDetails from '../components/main/dashboard/AdBlockRecovery/components/AdBlockRecoveryDetails';
import PreBidUpload from '../components/main/prebidUpload/NetwrokUpload/index';
import ComparePresetDetails from '../components/main/setup/SetupAdBlockRecovery/ComparePresent';
import ExistingPresets from '../components/main/setup/SetupAdBlockRecovery';
import OnBoardingSiteDetails from '../components/main/onboarding/components/OnBoardingSiteDetails';
import OnBoarding from '../components/main/onboarding';
import NetwrokSettings from '../components/main/prebidUpload/NetworkSettings';
import DemandchannelDetails from '../components/main/dashboard/AdOptimization/components/dashboard/DemandChannelDetails';

const RootRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={HEADERMENU_PATH.login} element={<Login />} />
                {/* dashboard routes */}
                <Route element={<PrivateRouter roles={['super_admin']} />}>
                    <Route path="" />
                    <Route
                        path={`${HEADERMENU_PATH.dashboard}/*`}
                        element={
                            <Routes>
                                <Route path={HEADERMENU_PATH.adOptimization} element={<AdOptimizationDashboard />} />
                                <Route path={`${HEADERMENU_PATH.adOptimization}/:siteId`} element={<AdOptimizationSiteDetail />} />
                                <Route path={`${HEADERMENU_PATH.demandPartners}/:networkId`} element={<DemandchannelDetails />} />
                                <Route path={HEADERMENU_PATH.subscriptions} element={<SubscriptionsDashboard />} />
                                <Route path={`${HEADERMENU_PATH.subscriptions}/:siteId`} element={<SubscriptionSiteDetails />} />
                                <Route path={HEADERMENU_PATH.crowdFunding} element={<CrowdFundingDashboard />} />
                                <Route path={`${HEADERMENU_PATH.crowdFunding}/:siteId`} element={<CrowdFundingDetails />} />
                                <Route path={HEADERMENU_PATH.quickShop} element={<QuickShopDashboard />} />
                                <Route path={`${HEADERMENU_PATH.quickShop}/:siteId`} element={<QuickShopDetails />} />
                                <Route path={HEADERMENU_PATH.adBlockRecovery} element={<AdBlockRecoveryDashboard />} />
                                <Route path={`${HEADERMENU_PATH.adBlockRecovery}/:siteId`} element={<AdBlockRecoveryDetails />} />
                            </Routes>
                        }
                    />
                </Route>

                {/* setup routes */}
                <Route element={<PrivateRouter roles={['super_admin']} />}>
                    <Route path="" />
                    <Route
                        path={`${HEADERMENU_PATH.setup}/*`}
                        element={
                            <Routes>
                                <Route path={HEADERMENU_PATH.setupAdBlockRecovery} element={<ExistingPresets />} />
                                <Route path={`${HEADERMENU_PATH.setupAdBlockRecovery}/:siteId${HEADERMENU_PATH.presetsComparison}`} element={<ComparePresetDetails />} />
                            </Routes>
                        }
                    />
                </Route>

                {/* admin routes */}
                <Route element={<PrivateRouter roles={['super_admin']} />}>
                    <Route path="" />
                    <Route
                        path={`${HEADERMENU_PATH.networkUpload}/*`}
                        element={
                            <Routes>
                                <Route path={`${HEADERMENU_PATH.prebidUpload}`} element={<PreBidUpload />} />
                                <Route path={`${HEADERMENU_PATH.networkSettings}`} element={<NetwrokSettings />} />
                            </Routes>
                        }
                    />
                </Route>

                {/* onboarding routes */}
                <Route element={<PrivateRouter roles={['super_admin']} />}>
                    <Route path="" />
                    <Route path={`${HEADERMENU_PATH.onboarding}/*`} element={<OnBoarding />} />
                    <Route path={`${HEADERMENU_PATH.onboarding}/:siteId`} element={<OnBoardingSiteDetails />} />
                </Route>
            </Routes>
            <Message />
        </BrowserRouter>
    );
};

export default RootRoutes;

type Props = {
    roles?: string[];
};

const PrivateRouter: React.FC<Props> = ({ roles }) => {
    const role = useSelector((state: RootState) => state.user.user?.publisher_type);
    const [collapsed, setCollapse] = useState(false);

    return (
        <div id="container" className="flex min-h-screen">
            <PSidebar collapsed={collapsed} setCollapse={setCollapse} />
            <div id="right_container" className={'py-4 px-4'} style={collapsed ? { width: 'calc(100% - 5rem)' } : { width: 'calc(100% - 15.5rem)' }}>
                {roles ? roles.includes(role || '') ? <Outlet /> : <AccessDenined /> : <Outlet />}
            </div>
        </div>
    );
};
