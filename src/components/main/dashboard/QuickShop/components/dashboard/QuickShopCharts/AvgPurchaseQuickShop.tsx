import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const AvgPurchaseQuickShop: React.FC = () => {
    const data = useSelector((state: RootState) => state.quickShopDashboard.quickShopPurchaseGraph);
    const loader = useSelector((state: RootState) => state.quickShopDashboard.quickShopPurchaseGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} suffix="$" />;
};

export default AvgPurchaseQuickShop;
