import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const UnSub: React.FC = () => {
    const data = useSelector((state: RootState) => state.subsDashboard.subscriptionUnSubsGraph);
    const loading = useSelector((state: RootState) => state.subsDashboard.subscriptionUnSubsGraphLoader);
    return <AdOptBarChart data={data || []} loading={loading} suffix={undefined} prefix={undefined} />;
};

export default UnSub;
