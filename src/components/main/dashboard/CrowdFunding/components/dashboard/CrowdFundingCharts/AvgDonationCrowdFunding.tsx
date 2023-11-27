import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const AvgDonationCrowdFunding: React.FC = () => {
    const data = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingAvgDonorGrpah);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingAvgDonorGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} suffix="$" />;
};

export default AvgDonationCrowdFunding;
