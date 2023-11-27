import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const TotalEarningsCrowdFunding: React.FC = () => {
    const earningGraph = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEarningGraph);
    const earningGraphLoader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEarningGraphLoader);
    return <AdOptBarChart data={earningGraph || []} loading={earningGraphLoader} suffix="$" />;
};

export default TotalEarningsCrowdFunding;
