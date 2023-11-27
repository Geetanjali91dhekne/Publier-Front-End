import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from './components/BarChart';

const FillRateCharts: React.FC = () => {
    const data = useSelector((state: RootState) => state.adOptDashboard.fillRateGraph);
    const loading = useSelector((state: RootState) => state.adOptDashboard.fillRateGraphLoading);

    return <AdOptBarChart data={data} loading={loading} prefix="%" />;
};

export default FillRateCharts;
