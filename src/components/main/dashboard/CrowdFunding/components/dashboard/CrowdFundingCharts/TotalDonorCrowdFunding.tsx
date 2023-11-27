import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const TotalDonorCrowdFunding: React.FC = () => {
    const data = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDonorGraph);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDonorGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} />;
};

export default TotalDonorCrowdFunding;
