import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import AdOptimizationSiteDashboard from './components/SiteDetails/Dashboard';
import ClientRealTimeData from './components/SiteDetails/RealTime';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/RootReducer';
import { HEADERMENU_PATH } from '../../../../routes/RoutesURL';
import PButton from '../../../common/Button';

const AdOptimizationSiteDetail: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState(true);
    const [client, setClient] = useState<string | undefined>(undefined);

    const loading = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const data = useSelector((state: RootState) => state.adOptDashboard.allSites);

    useEffect(() => {
        if (!loading && params.siteId) {
            setClient(params.siteId);
        }
    }, [loading, params.siteId]);

    return (
        <div className="mt-4">
            <div className="flex flex-row flex-wrap mx-2 justify-around items-center">
                <div className="w-3/4">
                    <Select
                        loading={loading}
                        size="large"
                        value={data.find((d) => String(d.site_id) === client)?.site_name}
                        optionFilterProp="children"
                        onChange={(e) => {
                            navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}/${e}`);
                        }}
                        className="w-full"
                        showSearch
                        options={data.map((d) => {
                            return { value: d.site_id, label: d.site_name };
                        })}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    />
                </div>
                <div className="w-48 flex flex-row justify-center">
                    <PButton title={page ? 'Show Realtime' : 'Dashboard'} disabled={Number(params.siteId) < 1000} onClick={() => setPage(!page)} />
                </div>
            </div>
            <div>{page ? <AdOptimizationSiteDashboard /> : <ClientRealTimeData />}</div>
        </div>
    );
};

export default AdOptimizationSiteDetail;
