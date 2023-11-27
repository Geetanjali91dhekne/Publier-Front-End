import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from './components/BarChart';

const MonetizedImpsCharts: React.FC = () => {
    const data = useSelector((state: RootState) => state.adOptDashboard.monetizedImpsGraph);
    const loading = useSelector((state: RootState) => state.adOptDashboard.monetizedImpsGraphLoading);

    return <AdOptBarChart data={data} loading={loading} />;
};

export default MonetizedImpsCharts;
