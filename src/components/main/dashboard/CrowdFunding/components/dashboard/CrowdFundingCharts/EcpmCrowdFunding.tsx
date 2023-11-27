import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const EcpmCrowdFunding: React.FC = () => {
    const data = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEcpmGraph);
    const loader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEcpmGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} suffix="$" />;
};

export default EcpmCrowdFunding;
