import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from './components/BarChart';

const AdRequestCharts: React.FC = () => {
    const data = useSelector((state: RootState) => state.adOptDashboard.adRequestGraph);
    const loading = useSelector((state: RootState) => state.adOptDashboard.adRequestGraphLoading);

    return <AdOptBarChart data={data} loading={loading} />;
};

export default AdRequestCharts;
