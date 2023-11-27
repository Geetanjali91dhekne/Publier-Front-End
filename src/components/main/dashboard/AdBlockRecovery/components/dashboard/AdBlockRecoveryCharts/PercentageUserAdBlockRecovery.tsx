import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const PercentageUserAdBlockRecovery: React.FC = () => {
    const graphData = useSelector((state: RootState) => state.adBlockDashboard.adBlockPerUserGraphData);
    const loader = useSelector((state: RootState) => state.adBlockDashboard.adBlockPerUserGraphDataLoader);

    return <AdOptBarChart data={graphData || []} loading={loader} prefix="%" />;
};
export default PercentageUserAdBlockRecovery;
