import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const NewSub: React.FC = () => {
    const data = useSelector((state: RootState) => state.subsDashboard.subscriptionNewSubsGraph);
    const loading = useSelector((state: RootState) => state.subsDashboard.subscriptionNewSubsGraphLoader);
    return <AdOptBarChart data={data || []} loading={loading} suffix={undefined} prefix={undefined} />;
};

export default NewSub;
