import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const FundraiserViewsCrowdFunding: React.FC = () => {
    const data = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingFundraiserGraph);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingFundraiserGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} />;
};

export default FundraiserViewsCrowdFunding;
