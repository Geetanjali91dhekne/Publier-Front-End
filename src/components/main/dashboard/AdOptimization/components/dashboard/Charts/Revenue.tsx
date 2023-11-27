import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from './components/BarChart';

const RevenueCharts: React.FC = () => {
    const data = useSelector((state: RootState) => state.adOptDashboard.revenueGraph);
    const loading = useSelector((state: RootState) => state.adOptDashboard.revenueGraphLoading);

    return <AdOptBarChart data={data} loading={loading} suffix="$" />;
};

export default RevenueCharts;
