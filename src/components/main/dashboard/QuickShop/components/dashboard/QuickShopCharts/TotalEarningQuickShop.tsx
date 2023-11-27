import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const TotalEarningsQuickShop: React.FC = () => {
    const data = useSelector((state: RootState) => state.quickShopDashboard.quickShopEarningGraph);
    const loader = useSelector((state: RootState) => state.quickShopDashboard.quickShopEarningGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} suffix="$" />;
};

export default TotalEarningsQuickShop;
