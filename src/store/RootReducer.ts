import { combineReducers } from 'redux';
import { loginReducer, userReducer } from '../components/login/redux/reducer';
import adOptDashboardReducer from '../components/main/dashboard/AdOptimization/redux/reducer';
import MessageReducer from '../components/message/redux/reducer';
import subsDashboardReducer from '../components/main/dashboard/Subscriptions/redux/reducer';
import crowdFundingDashboardReducer from '../components/main/dashboard/CrowdFunding/redux/reducer';
import adBlockDashboardReducer from '../components/main/dashboard/AdBlockRecovery/redux/reducer';
import quickShopDashboardReducer from '../components/main/dashboard/QuickShop/redux/reducer';
import setupAdBlockRecoveryReducer from '../components/main/setup/SetupAdBlockRecovery/redux/reducer';
import prebidReducer from '../components/main/prebidUpload/NetwrokUpload/redux/reducer';
import onBoardingReducer from '../components/main/onboarding/redux/reducer';
import networkSettingReducer from '../components/main/prebidUpload/NetworkSettings/redux/reducer';

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    adOptDashboard: adOptDashboardReducer,
    message: MessageReducer,
    subsDashboard: subsDashboardReducer,
    crowdFundDashboard: crowdFundingDashboardReducer,
    adBlockDashboard: adBlockDashboardReducer,
    quickShopDashboard: quickShopDashboardReducer,
    setupAdblockRecovery: setupAdBlockRecoveryReducer,
    prebid: prebidReducer,
    onboarding: onBoardingReducer,
    networkSetting:networkSettingReducer,
});

export const getRootReducer = () => rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
