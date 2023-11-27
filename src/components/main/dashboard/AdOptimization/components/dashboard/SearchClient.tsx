import { Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import { RootState } from '../../../../../../store/RootReducer';

type Props = {
    width?: any;
    height?: any;
    dashBoardType?: any;
};
const SearchClient: React.FC<Props> = ({ width = '1/2', height = 'auto', dashBoardType }) => {
    const navigate = useNavigate();

    const loadingAll = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const dataAll = useSelector((state: RootState) => state.adOptDashboard.allSites);
    const dataNew = useSelector((state: RootState) => state.adBlockDashboard.adblockSiteList);
    const loadingNew = useSelector((state: RootState) => state.adBlockDashboard.adBlockSiteListLoader);

    const data = dashBoardType === 'adoptimization' || dashBoardType === 'subscription' || dashBoardType === 'adBlockRecovery' ? dataAll : dataNew;
    const loading = dashBoardType === 'adoptimization' || dashBoardType === 'subscription' || dashBoardType === 'adBlockRecovery' ? loadingAll : loadingNew;

    const onChange = (value: string) => {
        if (dashBoardType === 'adoptimization') {
            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}/${value}`);
        } else if (dashBoardType === 'subscription') {
            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.subscriptions}/${value}`);
        } else if (dashBoardType === 'crowdFunding') {
            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.crowdFunding}/${value}`);
        } else if (dashBoardType === 'quickShop') {
            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.quickShop}/${value}`);
        } else if (dashBoardType === 'adBlockRecovery') {
            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adBlockRecovery}/${value}`);
        }
    };

    return (
        <div className={`w-${width} mt-4`} style={{ width: width }} id="clientSearch">
            <Select
                placeholder="Search for Sites / Clients"
                loading={loading}
                size="large"
                optionFilterProp="children"
                onChange={onChange}
                className="w-full"
                showSearch
                options={data.map((d) => {
                    return { value: d.site_id, label: d.site_name };
                })}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
        </div>
    );
};

export default SearchClient;
