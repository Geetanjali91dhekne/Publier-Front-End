import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const ActiveSub: React.FC = () => {
    const data = useSelector((state: RootState) => state.subsDashboard.subscriptionActiveSubsGraph);
    const loading = useSelector((state: RootState) => state.subsDashboard.subscriptionActiveSubsGraphLoader);
    return <AdOptBarChart data={data || []} loading={loading} suffix={undefined} prefix={undefined} />;
};

export default ActiveSub;
