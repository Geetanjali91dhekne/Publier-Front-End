import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const RevenueSub: React.FC = () => {
    const data = useSelector((state: RootState) => state.subsDashboard.subscriptionRevenueGraph);
    const loading = useSelector((state: RootState) => state.subsDashboard.subscriptionRevenueGraphLoader);
    return <AdOptBarChart data={data || []} loading={loading} suffix="$" />;
};

export default RevenueSub;
