import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from './components/BarChart';

const CPMCharts: React.FC = () => {
    const data = useSelector((state: RootState) => state.adOptDashboard.cpmGraph);
    const loading = useSelector((state: RootState) => state.adOptDashboard.cpmGraphLoading);

    return <AdOptBarChart data={data} loading={loading} suffix="$" />;
};

export default CPMCharts;
