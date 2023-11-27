import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const Rpm: React.FC = () => {
    const data = useSelector((state: RootState) => state.subsDashboard.subscriptionRpmGraph);
    const loading = useSelector((state: RootState) => state.subsDashboard.subscriptionRpmGraphLoader);
    return <AdOptBarChart data={data || []} loading={loading} suffix="$" />;
};

export default Rpm;
