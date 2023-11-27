import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const PageViewsAdBlockRecovery: React.FC = () => {
    const graphData = useSelector((state: RootState) => state.adBlockDashboard.adBlockPvsGraphData);
    const loader = useSelector((state: RootState) => state.adBlockDashboard.adBlockPvsGraphLoader);
    return <AdOptBarChart data={graphData || []} loading={loader} />;
};

export default PageViewsAdBlockRecovery;
